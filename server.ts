import express from 'express';
import { createServer as createViteServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { aiProvider } from './src/lib/aiProvider.ts';
import { db } from './src/db/index.ts';
import { learningPaths } from './src/db/schema.ts';
import { xpTransactions } from './src/db/gamification_schema.ts';

async function createServer() {
  const app = express();
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    plugins: [react(), tailwindcss()],
  });
  
  app.use(express.json());
  app.use(vite.middlewares);
  
  app.post('/api/ai', async (req, res) => {
    const { prompt, temperature, model } = req.body;
    try {
      const text = await aiProvider.generate(prompt, { temperature, model });
      res.json({ text });
    } catch (error) {
      console.error('AI Error:', error);
      res.status(500).json({ error: 'AI generation failed' });
    }
  });

  app.get('/api/paths', async (req, res) => {
    try {
      const paths = await db.select().from(learningPaths);
      res.json(paths);
    } catch (error) {
      console.error('Paths Error:', error);
      res.status(500).json({ error: 'Failed to fetch paths' });
    }
  });

  app.post('/api/xp', async (req, res) => {
    const { userId, amount, activityType } = req.body;
    if (!userId || !amount || !activityType) return res.status(400).json({ error: 'missing fields' });
    if (typeof amount !== 'number' || amount < 0 || amount > 1000) return res.status(400).json({ error: 'invalid amount' });
    try {
      await db.insert(xpTransactions).values({ userId, amount, activityType });
      res.json({ ok: true });
    } catch (error) {
      console.error('XP Error:', error);
      res.status(500).json({ error: 'XP update failed' });
    }
  });

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(url, (await import('fs')).readFileSync('./index.html', 'utf-8'));
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

createServer();
