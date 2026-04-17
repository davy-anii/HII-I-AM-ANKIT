import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

// Ensure we don't crash at boot time if the env variable is missing,
// instead we throw cleanly at runtime when requested.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

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

If a question is entirely unrelated to the portfolio, projects, skills, or experience (e.g. recipes, non-related coding, math), you must politely refuse by saying EXACTLY: "I can only answer questions about this portfolio."

Keep answers short, clear, and professional.`;

export async function POST(req: NextRequest) {
  try {
    if (!ai) {
      return NextResponse.json({ reply: 'System offline. Please configure GEMINI_API_KEY locally.' }, { status: 500 });
    }

    const body = await req.json();
    const { messages } = body; 

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid payload expected messages array.' }, { status: 400 });
    }

    const contents = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2, // Stay highly deterministic
      }
    });

    let aiText = response.text || "I was unable to process that.";
    
    return NextResponse.json({ reply: aiText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Check for "model not found" error to provide clean feedback
    if (error.message?.includes('not found') || error.status === 404) {
         return NextResponse.json({ reply: 'Model "gemini-2.5-flash" is currently offline or unlinked to this key. I am temporarily disconnected.' }, { status: 500 });
    }

    return NextResponse.json({ reply: 'An internal error occurred while communicating with the AI systems.' }, { status: 500 });
  }
}
