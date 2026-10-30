import express from 'express';
import { createServer as createViteServer } from 'vite';
import { ai } from './src/lib/gemini.ts';
import { db } from './src/db/index.ts';
import { learningPaths } from './src/db/schema.ts';

async function createServer() {
  const app = express();
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  
  app.use(vite.middlewares);
  app.use(express.json());
  
  app.post('/api/ai', async (req, res) => {
    const { prompt } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });
      res.json({ text: response.text });
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

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

createServer();
