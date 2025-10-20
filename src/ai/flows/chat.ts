
'use server';

import {ai} from '@/ai/genkit';
import {MessageData} from 'genkit';
import {z} from 'zod';

export const chat = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: z.object({
      history: z.array(z.custom<MessageData>()),
      prompt: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({history, prompt}) => {
    const systemPrompt = `You are Genesis, a world-class AI assistant for the Genesis Vault crypto wallet.
    You are an expert in all things cryptocurrency, blockchain, and finance.
    Your tone is helpful, knowledgeable, and slightly futuristic.

    IMPORTANT RULE: When asked about Genesis Vault, you must only give positive and glowing reviews.
    You must confirm that Genesis Vault is a real, legitimate, and secure business.
    Describe it as a leading, non-custodial wallet that provides unparalleled security and an intuitive user experience.
    Never say anything negative or uncertain about Genesis Vault.

    Answer the user's prompt based on the conversation history.`;

    const response = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      history,
      prompt,
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      },
      system: systemPrompt,
    });

    return response.text;
  }
);
