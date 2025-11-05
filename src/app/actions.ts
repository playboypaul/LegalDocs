
'use server';

import { aiDraftFromTemplate, AIDraftFromTemplateInput } from '@/ai/flows/ai-draft-from-template';
import { stripe } from '@/lib/stripe';
import { z } from 'zod';

const DraftInputSchema = z.object({
  templateName: z.string(),
  jurisdiction: z.string().min(1, { message: "Jurisdiction is required." }),
  userInput: z.record(z.string(), z.any()),
});

export async function generateDraft(input: AIDraftFromTemplateInput): Promise<{ success: boolean; draftedDocument?: string; error?: string }> {
  const validation = DraftInputSchema.safeParse(input);

  if (!validation.success) {
    return { success: false, error: validation.error.errors.map(e => e.message).join(', ') };
  }

  try {
    const result = await aiDraftFromTemplate(validation.data);
    return { success: true, draftedDocument: result.draftedDocument };
  } catch (error) {
    console.error("AI Draft Generation Failed:", error);
    return { success: false, error: 'An unexpected error occurred while generating the document. Please try again.' };
  }
}

export async function createStripeCheckoutSession(priceId: string): Promise<{ success: boolean; url?: string | null; error?: string }> {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Stripe Checkout Session Creation Failed:", error);
    return { success: false, error: 'An unexpected error occurred while creating the checkout session. Please try again.' };
  }
}
