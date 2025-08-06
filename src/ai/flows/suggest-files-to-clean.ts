'use server';

/**
 * @fileOverview AI Smart Cleaner flow to analyze files and suggest files for cleaning.
 *
 * - suggestFilesToClean - A function that handles the file analysis and suggestion process.
 * - SuggestFilesToCleanInput - The input type for the suggestFilesToClean function.
 * - SuggestFilesToCleanOutput - The return type for the suggestFilesToClean function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFilesToCleanInputSchema = z.object({
  filePaths: z
    .array(z.string())
    .describe('An array of file paths to analyze.'),
  osType: z.enum(['Windows', 'Linux', 'macOS']).describe('The operating system type.'),
});
export type SuggestFilesToCleanInput = z.infer<typeof SuggestFilesToCleanInputSchema>;

const SuggestFilesToCleanOutputSchema = z.object({
  suggestedFiles: z
    .array(z.string())
    .describe('An array of file paths suggested for cleaning.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the file cleaning suggestions.'),
});
export type SuggestFilesToCleanOutput = z.infer<typeof SuggestFilesToCleanOutputSchema>;

export async function suggestFilesToClean(input: SuggestFilesToCleanInput): Promise<SuggestFilesToCleanOutput> {
  return suggestFilesToCleanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFilesToCleanPrompt',
  input: {schema: SuggestFilesToCleanInputSchema},
  output: {schema: SuggestFilesToCleanOutputSchema},
  prompt: `You are an AI assistant that analyzes files based on access time, size, and duplication to suggest files for cleaning.

You will receive a list of file paths and the operating system type.

Your goal is to identify unnecessary files that can be removed to free up storage space.

Consider the following factors when analyzing files:

- Access time: Identify files that have not been accessed in a long time.
- Size: Identify large files that are taking up a lot of storage space.
- Duplication: Identify duplicate files that can be removed.

Based on your analysis, provide a list of file paths that you suggest for cleaning and the reasoning behind your suggestions.

File Paths:
{{#each filePaths}}- {{{this}}}
{{/each}}

Operating System: {{{osType}}}
`,
});

const suggestFilesToCleanFlow = ai.defineFlow(
  {
    name: 'suggestFilesToCleanFlow',
    inputSchema: SuggestFilesToCleanInputSchema,
    outputSchema: SuggestFilesToCleanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
