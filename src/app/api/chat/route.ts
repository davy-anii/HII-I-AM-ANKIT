import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// 1. Multi-Key Setup
let currentKeyIndex = 0;

// 2. Performance & Security Stores (In-memory, transient per instance)
const responseCache = new Map<string, { reply: string, expires: number }>();
const requestCounts = new Map<string, { count: number, resetAt: number }>();

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour caching
const RATE_LIMIT_MS = 1000 * 60; // 1 minute
const MAX_REQUESTS_PER_MIN = 10;

// The System Instruction strict prompt requested by the user
const systemPrompt = `You are Kairo, the AI assistant for Ankit's personal portfolio website.
Only answer questions based on the following:
- My projects: FOODYcare (food delivery, React Native), HACKLINTAKE (mobile app for hackathons), SHAKTI (women's safety website).
- My skills: HTML5, CSS3, JavaScript, TypeScript, C, C++, Java, Node.js, Express, React, Next.js.
- My tech stack: Firebase, MongoDB, PostgreSQL, React Native, Supabase.
- My experience: App & IoT Associate at RCCTechz, Tech Team Member at RCCIIT ACM Student Chapter.

If the user sends a greeting (like "hi", "hello", "hey"), greet them warmly and ask how you can help them explore Ankit's portfolio!

CRITICAL DIRECTIVE:
If the user provides both an email address and a message to send to Ankit, YOU MUST EXTRACT THEM AND APPEND THIS EXACT SYSTEM TAG at the very end of your response:
[SEND_EMAIL: the_actual_email_here | the_actual_message_here]

Example format:
User: "send email to him, my email is john@gmail.com, message is hello"
Your response: "I will send that right away! [SEND_EMAIL: john@gmail.com | hello]"

DO NOT wrap the variables in angle brackets <>. Use the exact formatting from the example.

IMPORTANT RULE:
If a question is entirely unrelated to the portfolio, projects, skills, or experience (e.g. recipes, non-related coding, math, general knowledge), you must politely refuse by saying EXACTLY: "I can only answer questions about this portfolio."

Keep answers short, clear, and professional.`;

export async function POST(req: NextRequest) {
  try {
    const rawKeys = process.env.GEMINI_API_KEYS || '';
    const apiKeys = rawKeys.split(',').map(k => k.trim().replace(/^"|"$/g, '')).filter(Boolean);

    if (apiKeys.length === 0) {
      return NextResponse.json({ reply: 'System offline. Please configure GEMINI_API_KEYS locally.' }, { status: 500 });
    }

    // Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    const now = Date.now();
    const userLimit = requestCounts.get(ip);
    
    if (userLimit && now < userLimit.resetAt) {
      if (userLimit.count >= MAX_REQUESTS_PER_MIN) {
        return NextResponse.json({ reply: 'You are sending too many requests. Please wait a minute and try again.' }, { status: 429 });
      }
      userLimit.count++;
    } else {
      requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_MS });
    }

    // Periodic map cleanup for limits
    if (requestCounts.size > 500) {
        const firstKey = requestCounts.keys().next().value;
        if(firstKey) requestCounts.delete(firstKey);
    }

    const body = await req.json();
    const { messages } = body; 

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid payload expected messages array.' }, { status: 400 });
    }

    // Caching check (Using the latest user message as the cache key)
    const latestUserMessage = messages[messages.length - 1].content.trim().toLowerCase();
    const cacheHit = responseCache.get(latestUserMessage);
    if (cacheHit && now < cacheHit.expires) {
      console.log(`[Chatbot] Cache hit for: "${latestUserMessage}"`);
      return NextResponse.json({ reply: cacheHit.reply });
    }

    const contents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Multi-Key Failover Loop
    let aiText = "I was unable to process that.";
    let success = false;
    let attempts = 0;
    const maxAttempts = apiKeys.length;

    while (attempts < maxAttempts && !success) {
      const activeKey = apiKeys[currentKeyIndex];
      const ai = new GoogleGenAI({ apiKey: activeKey });
      
      console.log(`[Chatbot] Attempt ${attempts + 1}/${maxAttempts} - Using API Key at Index: ${currentKeyIndex}`);

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash', 
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2, // Stay highly deterministic
            maxOutputTokens: 256, // Limit response length for performance
          }
        });

        if (response.text) {
          aiText = response.text;
          success = true;
          
          // Cache successful response
          responseCache.set(latestUserMessage, { reply: aiText, expires: now + CACHE_TTL_MS });
          
          // Clean up old cache entries periodically
          if (responseCache.size > 500) {
            const firstKey = responseCache.keys().next().value;
            if(firstKey) responseCache.delete(firstKey);
          }
        } else {
           throw new Error("Empty response from AI");
        }
      } catch (error: any) {
        console.error(`[Chatbot] Error with API Key at Index ${currentKeyIndex}:`, error.message);
        
        // Rotate to the next key regardless of whether it's quota or another failure
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        attempts++;
      }
    }

    // If all keys fail
    if (!success) {
      console.error("[Chatbot] All API keys have failed or exhausted quota.");
      return NextResponse.json({ reply: 'I am currently receiving too many requests. Please try again later.' }, { status: 503 });
    }
    
    return NextResponse.json({ reply: aiText });

  } catch (error: any) {
    console.error("[Chatbot] Critical API Error:", error);
    return NextResponse.json({ reply: 'An internal error occurred while communicating with the AI systems.' }, { status: 500 });
  }
}
