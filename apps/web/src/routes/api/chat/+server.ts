import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';

import { GOOGLE_API } from '$env/static/private';

const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_API,
});

export async function POST({ request }: { request: Request }) {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: google('gemini-2.5-flash'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}