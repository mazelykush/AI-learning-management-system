import { useState } from 'react';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runPrompt = async (prompt: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error('AI request failed');
      const data = await response.json();
      setLoading(false);
      return data.text;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { runPrompt, loading, error };
}
