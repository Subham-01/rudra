import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { SiteSettings } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const { topic, keyword, words, fixMode, customPrompt, content, provider: reqProvider } = await request.json();
    if (!topic && !customPrompt) return NextResponse.json({ error: 'Topic or Prompt is required' }, { status: 400 });

    await connectToDatabase();
    
    // Fetch all AI settings
    const settings = await SiteSettings.find({ key: { $in: ['ai_provider', 'groq_api_key', 'openai_api_key', 'gemini_api_key', 'openrouter_api_key', 'grok_api_key'] } });
    const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>);
    
    const provider = reqProvider || settingsMap.ai_provider || 'groq';
    let apiKey = '';
    let endpoint = '';
    let modelName = '';
    
    switch(provider) {
      case 'openai':
        apiKey = settingsMap.openai_api_key;
        endpoint = 'https://api.openai.com/v1/chat/completions';
        modelName = 'gpt-4o-mini';
        break;
      case 'gemini':
        apiKey = settingsMap.gemini_api_key;
        endpoint = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
        modelName = 'gemini-1.5-flash';
        break;
      case 'openrouter':
        apiKey = settingsMap.openrouter_api_key;
        endpoint = 'https://openrouter.ai/api/v1/chat/completions';
        modelName = 'meta-llama/llama-3.1-8b-instruct';
        break;
      case 'grok':
        apiKey = settingsMap.grok_api_key;
        endpoint = 'https://api.x.ai/v1/chat/completions';
        modelName = 'grok-2-latest';
        break;
      case 'groq':
      default:
        apiKey = settingsMap.groq_api_key;
        endpoint = 'https://api.groq.com/openai/v1/chat/completions';
        modelName = 'llama-3.1-8b-instant';
        break;
    }

    if (!apiKey) {
      return NextResponse.json({ error: `API Key for provider '${provider}' not found in settings.` }, { status: 400 });
    }

    let systemPrompt = '';

    if (customPrompt && content) {
      systemPrompt = `You are an expert SEO copywriter and HTML formatter. 
The user has provided an existing HTML blog post and wants you to modify it based on their specific instruction.

USER INSTRUCTION:
"${customPrompt}"

CURRENT CONTENT:
${content}

REQUIREMENTS:
1. Apply the user's instructions to the content perfectly.
2. Maintain standard HTML tags (<h2>, <p>, <ul>, etc.) and do NOT use markdown.
3. Output MUST be ONLY valid JSON matching this exact structure:
{
  "content": "The rewritten HTML content goes here"
}
`;
    } else if (fixMode) {
      systemPrompt = `You are an expert SEO copywriter and AI optimizer. 
The user has an existing blog post about "${topic}" that needs to be rewritten to pass a strict SEO checklist.
Focus Keyword: ${keyword || 'None provided'}
Target Word Count: ${words || 1200} words

CURRENT CONTENT:
${content}

REQUIREMENTS FOR REWRITE:
1. Fix the content so it hits 100% readiness. Keep existing facts.
2. Ensure there are at least three H2 sections.
3. Ensure there is a bulleted or numbered list.
4. Ensure there is a comparison table (HTML <table>).
5. Ensure there is an FAQ section at the end.
6. Make sure the content length meets the requested target word count by expanding details naturally.
7. Output MUST be ONLY valid JSON matching this exact structure:
{
  "content": "The rewritten HTML content goes here"
}
`;
    } else {
      systemPrompt = `You are an expert SEO copywriter and AI optimizer. 
Write a comprehensive, engaging blog post about the following topic: "${topic}".
Focus Keyword requested: ${keyword || 'None provided'}
Target Word Count: ${words || 1200} words

REQUIREMENTS:
1. Format the content in beautiful HTML (NOT Markdown). Use <h2>, <h3>, <p>, <ul>, <li>, <table>, and <strong> tags.
2. INTERLINKING: Include automatic secure internal links to related pages (e.g., <a href='/rooms'>luxury rooms</a>).
3. EXTRALINKING: Include at least one secure external link to a high-authority source (e.g., Wikipedia).
4. MUST include a FAQ section at the end.
5. MUST include a comparison table.
6. Provide a short comma-separated list of 3-5 tags.
7. Suggest a category (e.g., Hospitality, Dining, Events).
8. Generate a URL slug, an SEO Title (40-60 characters), and an SEO Meta Description (120-160 characters). If no Focus Keyword was requested, choose the best one.

You MUST output your response as a raw JSON object with NO markdown formatting around the JSON block. It must perfectly match this structure:
{
  "title": "A catchy SEO friendly title",
  "slug": "seo-friendly-url-slug",
  "focusKeyword": "best hotel",
  "seoTitle": "A 40-60 character SEO title",
  "seoDescription": "A 120-160 character meta description...",
  "content": "The HTML content goes here",
  "tags": "hotel, luxury, travel",
  "category": "Travel"
}
`;
    }

    let response;
    
    if (provider === 'gemini') {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8000,
            responseMimeType: "application/json"
          }
        })
      });
    } else {
      const fetchBody: any = {
        model: modelName,
        messages: [{ role: 'user', content: systemPrompt }],
        temperature: 0.7,
        max_tokens: 8000,
        response_format: { type: "json_object" }
      };

      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          ...(provider === 'openrouter' ? { 'HTTP-Referer': 'http://localhost:3000', 'X-Title': 'Rudra Admin' } : {})
        },
        body: JSON.stringify(fetchBody)
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error(`${provider} API Error:`, errText);
      return NextResponse.json({ error: `${provider} API Error: ` + errText }, { status: 500 });
    }

    const data = await response.json();
    let resultContent = '';
    
    if (provider === 'gemini') {
      resultContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    } else {
      resultContent = data.choices[0].message.content;
    }
    
    // Strip markdown formatting if AI wrapped the JSON in backticks
    if (resultContent.startsWith('```')) {
      resultContent = resultContent.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/, '').trim();
    }
    
    const parsed = JSON.parse(resultContent);

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error('Generation Error:', error);
    return NextResponse.json({ error: 'Internal server error during AI generation' }, { status: 500 });
  }
}
