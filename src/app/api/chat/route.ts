import { NextResponse } from 'next/server';
import { getAIResponse } from '@/lib/ai';
import connectToDatabase from '@/lib/db';
import { SiteSettings } from '@/lib/models';
import fs from 'fs';
import path from 'path';
import { searchKnowledgeBase } from '@/lib/chat/searchKnowledge';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Fetch settings
    const settingsDocs = await SiteSettings.find({
      key: { $in: ['chat_enabled', 'chat_system_prompt', 'chat_temperature', 'chat_max_tokens'] }
    });
    
    const settings = settingsDocs.reduce((acc: any, doc) => {
      acc[doc.key] = doc.value;
      return acc;
    }, {});

    const isEnabled = settings['chat_enabled'] !== 'false';
    if (!isEnabled) {
      return NextResponse.json({ error: 'Chat is currently disabled' }, { status: 403 });
    }

    const basePrompt = settings['chat_system_prompt'] || 'You are a helpful assistant for Hotel Rudra Regency.';
    const temperature = parseFloat(settings['chat_temperature']) || 0.7;
    const maxTokens = parseInt(settings['chat_max_tokens']) || 500;

    // Get last user message
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    const query = lastUserMessage?.content || '';

    // Hybrid Search: FAQ -> Hotel.json -> AI
    const searchResult = searchKnowledgeBase(query);

    if (searchResult.foundLocally && searchResult.answer) {
      // Return local answer as a mocked SSE stream
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const chunk = JSON.stringify({ choices: [{ delta: { content: searchResult.answer } }] });
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Fallback to AI
    const hotelKnowledge = searchResult.hotelData ? `\n\nHOTEL KNOWLEDGE BASE:\n${searchResult.hotelData}` : '';
    const fallbackInstruction = `\n\nCRITICAL INSTRUCTION: If you cannot find a relevant answer to the user's question, do NOT make up an answer. Instead, reply exactly with: "Please reach out to our representative at [+91 8651600015](tel:+918651600015) for more information."\nFORMATTING INSTRUCTION: Always format phone numbers as Markdown links (e.g. [+91 8651600015](tel:+918651600015)) and emails as Markdown links (e.g. [info@rudraregency.com](mailto:info@rudraregency.com)) so they appear highlighted.`;
    const systemPrompt = `${basePrompt}${hotelKnowledge}${fallbackInstruction}`;

    // Get the stream from the provider
    const stream = await getAIResponse(messages, systemPrompt, temperature, maxTokens);

    // Return the stream directly as SSE
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
