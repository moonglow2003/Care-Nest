import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages } = await req.json();

    console.log("Chat API: Request received. Messages count:", messages.length);

    // Optionally fetch user context (vitals, meds) to provide as context
    const vitals = await prisma.vital.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    const contextMessage = `
    You are Care Bot, a compassionate, professional, and knowledgeable healthcare assistant for the Care Nest application.
    You help users understand their personal health data, provide general wellness tips, and offer supportive guidance.
    
    IMPORTANT RULES:
    1. Always advise users to consult a real doctor for serious medical conditions. You are an AI assistant, not a replacement for a doctor.
    2. Be empathetic and professional.
    3. Keep answers relatively concise and easy to understand.
    
    User Context:
    - Name: ${session.user.name}
    - Latest Blood Pressure: ${vitals?.bloodPressure || "Unknown"}
    - Latest Heart Rate: ${vitals?.heartRate ? `${vitals.heartRate} bpm` : "Unknown"}
    - Latest Weight: ${vitals?.weight ? `${vitals.weight} lbs` : "Unknown"}
    `;

    console.log("Chat API: Starting stream with Groq...");

    const result = streamText({
      model: groq('llama-3.1-8b-instant'), // Using latest active Groq model
      system: contextMessage,
      messages,
      onError({ error }) {
        console.error("Stream Error inside AI SDK:", error);
      },
      onFinish(event) {
        console.log("Chat API: Stream finished successfully. Tokens used:", event.usage?.totalTokens);
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(errorMessage, { status: 500 });
  }
}
