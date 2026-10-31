export interface AIProvider {
  generate(prompt: string, opts?: { temperature?: number; model?: string }): Promise<string>;
}

class GeminiProvider implements AIProvider {
  async generate(prompt: string, opts?: { temperature?: number; model?: string }) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return `[Offline fallback] Echo: ${prompt.slice(0, 200)}`;
    }
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: key });
    const res = await ai.models.generateContent({
      model: opts?.model ?? 'gemini-2.0-flash',
      contents: prompt,
      config: opts?.temperature != null ? { temperature: opts.temperature } : undefined,
    });
    return res.text ?? '';
  }
}

export const aiProvider: AIProvider = new GeminiProvider();
export async function generateText(prompt: string, opts?: { temperature?: number; model?: string }) {
  return aiProvider.generate(prompt, opts);
}
