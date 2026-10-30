import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-8">
        <a href="/" className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0">
          PromptVerse AI
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</a>
          <a href="/academy" className="hover:text-cyan-400 transition-colors">Academy</a>
          <a href="/playground" className="hover:text-cyan-400 transition-colors">Playground</a>
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-4 py-2 text-xs font-medium text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors">
            Profile
          </button>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        {/* Placeholder for content */}
        <Outlet />
      </main>
    </div>
  );
}
