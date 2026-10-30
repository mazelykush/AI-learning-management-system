import { useState } from 'react';
import { useAI } from '../hooks/useAI';

export default function Playground() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const { runPrompt, loading } = useAI();

  const handleRun = async () => {
    const res = await runPrompt(prompt);
    if (res) setResponse(res);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Prompt Playground</h1>
        <p className="text-slate-400 mt-2">Experiment with AI models and refine your prompts.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-white">Prompt Input</h2>
          <textarea 
            className="w-full h-40 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white" 
            placeholder="Enter your prompt here..." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            className="px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? 'Running...' : 'Run Prompt'}
          </button>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold text-white">AI Response</h2>
          <div className="w-full h-40 bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-300 overflow-y-auto whitespace-pre-wrap">
            {response || 'AI response will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
