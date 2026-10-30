import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Academy() {
  const [levels, setLevels] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/paths')
      .then(res => res.json())
      .then(data => setLevels(data));
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Learning Academy</h1>
        <p className="text-slate-400 mt-2">Explore our structured learning paths.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((level) => (
          <div key={level.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-white">{level.title}</h2>
            <p className="text-slate-400 mt-2">{level.description}</p>
            <Link to={`/academy/level/${level.id}`} className="inline-block mt-4 px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors">
              Start Learning
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
