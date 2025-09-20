'use server';

/**
 * @fileOverview AI-powered legal document drafting flow.
 *
 * - aiDraftFromTemplate - A function that drafts a legal document based on a template and user input.
 * - AIDraftFromTemplateInput - The input type for the aiDraftFromTemplate function.
 * - AIDraftFromTemplateOutput - The return type for the aiDraftFromTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDraftFromTemplateInputSchema = z.object({
  templateName: z.string().describe('The name of the legal template to use.'),
  userInput: z
    .record(z.string())
    .describe(
      'A map of input fields and their values, specific to the selected template.'
    ),
  jurisdiction: z
    .string()
    .describe('The jurisdiction (e.g., state or country) governing the contract.'),
});
export type AIDraftFromTemplateInput = z.infer<typeof AIDraftFromTemplateInputSchema>;

const AIDraftFromTemplateOutputSchema = z.object({
  draftedDocument: z.string().describe('The drafted legal document.'),
});
export type AIDraftFromTemplateOutput = z.infer<typeof AIDraftFromTemplateOutputSchema>;

export async function aiDraftFromTemplate(
  input: AIDraftFromTemplateInput
): Promise<AIDraftFromTemplateOutput> {
  return aiDraftFromTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDraftFromTemplatePrompt',
  input: {schema: AIDraftFromTemplateInputSchema},
  output: {schema: AIDraftFromTemplateOutputSchema},
  prompt: `You are an AI legal assistant. Your task is to draft a legal document based on a given template and user input. The document should be legally sound, incorporate all necessary details from the user input, and be specific to the given jurisdiction.

  Template Name: {{{templateName}}}

  User Input: {{{userInput}}}

  Jurisdiction: {{{jurisdiction}}}

  Drafted Document:`,
});

const aiDraftFromTemplateFlow = ai.defineFlow(
  {
    name: 'aiDraftFromTemplateFlow',
    inputSchema: AIDraftFromTemplateInputSchema,
    outputSchema: AIDraftFromTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
