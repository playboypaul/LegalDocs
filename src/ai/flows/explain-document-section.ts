'use server';

/**
 * @fileOverview A flow to explain a section of a legal document in plain language.
 *
 * - explainDocumentSection - A function that takes a section of a legal document and returns an explanation in plain language.
 * - ExplainDocumentSectionInput - The input type for the explainDocumentSection function.
 * - ExplainDocumentSectionOutput - The return type for the explainDocumentSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainDocumentSectionInputSchema = z.object({
  documentSection: z
    .string()
    .describe('The section of the legal document to explain.'),
  jurisdiction: z.string().describe('The jurisdiction the document pertains to.')
});

export type ExplainDocumentSectionInput = z.infer<
  typeof ExplainDocumentSectionInputSchema
>;

const ExplainDocumentSectionOutputSchema = z.object({
  plainLanguageExplanation: z
    .string()
    .describe('The plain language explanation of the document section.'),
});

export type ExplainDocumentSectionOutput = z.infer<
  typeof ExplainDocumentSectionOutputSchema
>;

export async function explainDocumentSection(
  input: ExplainDocumentSectionInput
): Promise<ExplainDocumentSectionOutput> {
  return explainDocumentSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainDocumentSectionPrompt',
  input: {schema: ExplainDocumentSectionInputSchema},
  output: {schema: ExplainDocumentSectionOutputSchema},
  prompt: `You are an AI assistant specialized in explaining legal documents in plain language.

  Given a section of a legal document, your task is to provide a clear, concise, and easy-to-understand explanation of the section.
  The document applies to the jurisdiction: {{{jurisdiction}}}.

  Document Section:
  {{documentSection}}

  Plain Language Explanation:`,
});

const explainDocumentSectionFlow = ai.defineFlow(
  {
    name: 'explainDocumentSectionFlow',
    inputSchema: ExplainDocumentSectionInputSchema,
    outputSchema: ExplainDocumentSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
