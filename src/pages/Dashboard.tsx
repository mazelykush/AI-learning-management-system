import React from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, Learner</h1>
        <p className="text-slate-400 mt-2">Ready to continue your AI journey?</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-sm font-medium text-slate-400">Current Level</h2>
          <p className="text-2xl font-bold text-white mt-1">Prompt Apprentice</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-sm font-medium text-slate-400">Total XP</h2>
          <p className="text-2xl font-bold text-cyan-400 mt-1">1,250</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-sm font-medium text-slate-400">Current Streak</h2>
          <p className="text-2xl font-bold text-white mt-1">5 days</p>
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white">Next Lesson</h2>
        <p className="text-slate-400 mt-2">Level 2: Prompt Apprentice - Module 1: What is Prompt Engineering?</p>
        <button className="mt-4 px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors">
          Continue Learning
        </button>
      </div>
    </div>
  );
}
