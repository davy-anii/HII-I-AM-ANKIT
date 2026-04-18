import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import {
  executeWithGeminiKeyRotation,
  GeminiKeysExhaustedError,
  hasGeminiApiKeys,
} from '@/lib/geminiKeyManager';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

type Intent = 'greeting' | 'thanks' | 'goodbye' | 'query';

const INTENT_RESPONSES: Record<Exclude<Intent, 'query'>, string> = {
  greeting: "Hey! I'm Cairo 👋 How can I help you today?",
  thanks: "You're welcome! Let me know if you need anything else 😊",
  goodbye: 'Goodbye! Have a great day 🚀',
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectIntent(text: string): Intent {
  const normalized = normalizeText(text);
  if (!normalized) return 'query';

  // Only treat as small-talk intent when the whole message is a casual phrase.
  // This avoids false positives like: "when did hi goon last time?".
  const greetingPatterns = [
    /^(hi|hello|hey)$/,
    /^(hi|hello|hey) (there|bro|buddy|sir)$/,
    /^good (morning|afternoon|evening)$/,
  ];

  const thanksPatterns = [
    /^thanks$/,
    /^thank you$/,
    /^thanks (a lot|so much)$/,
    /^thank you (so much|very much)$/,
  ];

  const goodbyePatterns = [
    /^bye$/,
    /^goodbye$/,
    /^see you$/,
    /^see ya$/,
    /^cya$/,
    /^good night$/,
  ];

  if (thanksPatterns.some((pattern) => pattern.test(normalized))) return 'thanks';
  if (goodbyePatterns.some((pattern) => pattern.test(normalized))) return 'goodbye';
  if (greetingPatterns.some((pattern) => pattern.test(normalized))) return 'greeting';
  return 'query';
}

function extractEmailCommand(text: string): { email: string; message: string } | null {
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (!emailMatch) return null;

  const hasSendIntent = /(send|mail|email|sms|message|msg|text)\b/i.test(text);
  if (!hasSendIntent) return null;

  let message = '';

  const quotedMessage = text.match(/["“]([^"”]+)["”]/);
  if (quotedMessage?.[1]) {
    message = quotedMessage[1].trim();
  }

  if (!message) {
    const explicitMessage = text.match(/(?:message|msg|text)\s*(?:is|:|-)?\s*(.+)$/i);
    if (explicitMessage?.[1]) {
      message = explicitMessage[1].trim();
    }
  }

  if (!message) {
    const afterEmail = text.split(emailMatch[0])[1] || '';
    message = afterEmail
      .replace(/^[\s,.:;\-]+/, '')
      .replace(/^(and\s+)?(message|msg|text)\s*(is|:|-)?\s*/i, '')
      .trim();
  }

  message = message.replace(/^["'`]+|["'`]+$/g, '').trim();
  if (!message || message.length < 2) return null;

  const safeEmail = emailMatch[0].trim().replace(/[<>\]\[]/g, '');
  const safeMessage = message.slice(0, 1000).replace(/[\]|]/g, '').replace(/\|/g, '/').trim();

  if (!safeEmail || !safeMessage) return null;
  return { email: safeEmail, message: safeMessage };
}

// 2. Performance & Security Stores (In-memory, transient per instance)
const responseCache = new Map<string, { reply: string, expires: number }>();
const requestCounts = new Map<string, { count: number, resetAt: number }>();

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour caching
const RATE_LIMIT_MS = 1000 * 60; // 1 minute
const MAX_REQUESTS_PER_MIN = 10;
const CHAT_PROMPT_VERSION = 'v2';

const PORTFOLIO_CONTEXT = `
Profile:
- Name: Ankit Karmakar
- Location: Kolkata, India
- Role: Full-stack app developer and systems thinker
- Focus: AI integration, IoT solutions, scalable apps

Education & Achievements:
- BCA student at RCCIIT
- 4x Hackathon Winner
- Wins include DoubleSlash 4.0 and NextGen Hacks

Experience:
- App & IoT Associate at RCCTechz (present)
  - Builds scalable mobile applications
  - Works on IoT solutions bridging hardware and software
  - Collaborates on shipping production features
- Tech Team Member at RCCIIT ACM Student Chapter (present)
  - Builds technical projects/tools
  - Supports workshops, events, and hackathons

Projects:
- FOODYcare: Food delivery app integrated with NGOs to reduce food waste
  - Stack: React Native, Node.js, Express, MongoDB
- HACKINTAKE: Scalable hackathon mobile app with role-based access and secure auth
  - Stack: React Native, Expo, Firebase, Zustand
- SHAKTI: Women's safety website with alerts, location tracking, emergency resources
  - Stack: Next.js, Node.js, Tailwind CSS, MongoDB

Skills and Tech Stack:
- Languages: HTML5, CSS3, JavaScript, TypeScript, C++, Java, Python
- Web/App: React, Next.js, React Native, Node.js, Express.js, Tailwind CSS
- Tools/DB: Firebase, Supabase, PostgreSQL, MongoDB, Git/GitHub, Docker
`;

// System instruction for reliable, portfolio-aware responses.
const systemPrompt = `You are Kairo, the AI assistant for Ankit Karmakar's portfolio website.

Use this context as ground truth:
${PORTFOLIO_CONTEXT}

Response policy:
1) Primary goal: answer questions about Ankit's profile, projects, skills, experience, achievements, and stack.
2) If the user asks software/tech questions (for example OOP/OOPS, DSA, web, app dev, backend, databases, AI, IoT), answer helpfully and, when possible, relate it to Ankit's stack and project work.
3) If the user asks "what is his understanding" of a topic, infer from the portfolio context and answer as an informed summary, not as a refusal.
4) Only refuse when the query is clearly unrelated to both portfolio and technology. In that case reply politely: "I can help with Ankit's portfolio and software-related questions."
5) Keep responses concise, clear, and professional. No empty answers.

Email command directive:
If the user provides both an email address and a message to send to Ankit, append this exact tag at the end of your response:
[SEND_EMAIL: the_actual_email_here | the_actual_message_here]
Do not use angle brackets.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body; 

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid payload expected messages array.' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1] as ChatMessage;
    const latestUserMessage = (latestMessage?.content || '').trim();

    if (!latestUserMessage) {
      return NextResponse.json({ reply: 'Please type a message so I can help you.' }, { status: 200 });
    }

    // Deterministic email-command extraction so contact sending does not rely only on LLM behavior.
    const emailCommand = extractEmailCommand(latestUserMessage);
    if (emailCommand) {
      return NextResponse.json({
        reply: `I am sending your message to Ankit now. [SEND_EMAIL: ${emailCommand.email} | ${emailCommand.message}]`
      }, { status: 200 });
    }

    // Fast-path intent detection for casual chat to keep latency low.
    const intent = detectIntent(latestUserMessage);
    if (intent !== 'query') {
      return NextResponse.json({ reply: INTENT_RESPONSES[intent] }, { status: 200 });
    }

    // Rate Limiting (only for LLM-backed queries)
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
      if (firstKey) requestCounts.delete(firstKey);
    }

    if (!hasGeminiApiKeys()) {
      return NextResponse.json({ reply: 'System offline. Please configure GEMINI_API_KEYS locally.' }, { status: 500 });
    }

    // Caching check (Using the latest user message as the cache key)
    const cacheKey = `${CHAT_PROMPT_VERSION}:${latestUserMessage.toLowerCase()}`;
    const cacheHit = responseCache.get(cacheKey);
    if (cacheHit && now < cacheHit.expires) {
      console.log(`[Chatbot] Cache hit for: "${cacheKey}"`);
      return NextResponse.json({ reply: cacheHit.reply });
    }

    const contents = (messages as ChatMessage[]).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: String(msg.content || '') }]
    }));

    let aiText = "I was unable to process that.";

    try {
      const response = await executeWithGeminiKeyRotation(async (apiKey, meta) => {
        const ai = new GoogleGenAI({ apiKey });
        console.log(`[Chatbot] Gemini attempt ${meta.attempt}/${meta.maxRetries} with key index ${meta.keyIndex}`);

        return ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2, // Stay highly deterministic
            maxOutputTokens: 256, // Limit response length for performance
          }
        });
      }, { userSeed: ip });

      aiText = response.text?.trim() || 'I can help with Ankit\'s portfolio, projects, skills, or experience.';
    } catch (error: any) {
      if (error instanceof GeminiKeysExhaustedError) {
        console.error('[Chatbot] All API keys exhausted after rotation attempts.');
        return NextResponse.json({ reply: 'All API keys exhausted. Try later.' }, { status: 503 });
      }

      console.error('[Chatbot] Gemini request failed:', error?.message || error);
      return NextResponse.json({ reply: 'An internal error occurred while communicating with the AI systems.' }, { status: 500 });
    }

    // Cache successful response
    responseCache.set(cacheKey, { reply: aiText, expires: now + CACHE_TTL_MS });

    // Clean up old cache entries periodically
    if (responseCache.size > 500) {
      const firstKey = responseCache.keys().next().value;
      if (firstKey) responseCache.delete(firstKey);
    }
    
    return NextResponse.json({ reply: aiText });

  } catch (error: any) {
    console.error("[Chatbot] Critical API Error:", error);
    return NextResponse.json({ reply: 'An internal error occurred while communicating with the AI systems.' }, { status: 500 });
  }
}
