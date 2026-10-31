import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  { q: 'What is a prompt?', opts: ['A command to an AI', 'A database query', 'A CSS rule'] },
  { q: 'Which model type generates text?', opts: ['LLM', 'CNN', 'SVM'] },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();
  const done = step >= questions.length;
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Onboarding Assessment</h1>
      {done ? (
        <div>
          <p>Recommended path based on your answers.</p>
          <button onClick={() => navigate('/dashboard')} className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded">Go to Dashboard</button>
        </div>
      ) : (
        <div>
          <p className="mb-2">{questions[step].q}</p>
          {questions[step].opts.map((o, i) => (
            <button key={i} onClick={() => { setAnswers([...answers, i]); setStep(step + 1); }} className="block w-full text-left p-2 border rounded mb-2">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
