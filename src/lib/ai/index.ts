import { generateResponse as gemini } from './gemini';
import { generateResponse as groq } from './groq';
import { generateResponse as openrouter } from './openrouter';
import { generateResponse as openai } from './openai';

const providers: Record<string, Function> = {
  gemini,
  groq,
  openrouter,
  openai,
};

export async function getAIResponse(messages: any[], systemPrompt: string, temperature: number = 0.7, maxTokens: number = 500): Promise<ReadableStream> {
  const primaryProvider = process.env.AI_PROVIDER?.toLowerCase() || 'gemini';
  const fallbackProvider = process.env.FALLBACK_PROVIDER?.toLowerCase() || 'openrouter';

  try {
    const providerFn = providers[primaryProvider];
    if (!providerFn) throw new Error(`Provider ${primaryProvider} not supported`);
    
    return await providerFn(messages, systemPrompt, temperature, maxTokens);
  } catch (error) {
    console.error(`Primary AI Provider (${primaryProvider}) failed:`, error);
    
    // Fallback logic
    console.log(`Switching to fallback provider: ${fallbackProvider}`);
    const fallbackFn = providers[fallbackProvider];
    
    if (!fallbackFn) throw new Error(`Fallback Provider ${fallbackProvider} not supported`);
    
    return await fallbackFn(messages, systemPrompt, temperature, maxTokens);
  }
}
