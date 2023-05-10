// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Message } from '@/types/chatboxTypes';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { Readable } from 'stream';

const CHAT_URL = 'https://api.openai.com/v1/chat/completions';

export default async function chat(req: NextApiRequest, res: NextApiResponse) {
  console;
  const messages = JSON.parse(req.body).messages as Message[];
  if (!messages) {
    return res.status(400).json({ error: 'Missing messages' });
  }
  const raw = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: messages.map((m) => {
      return {
        role: m.role,
        content: m.content,
      };
    }),
    stream: true,
  });

  const openai_response = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: raw,
  });

  if (!openai_response || !openai_response.body) {
    return res.status(500).json({ error: 'Error fetching from OpenAI' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const nodeStream = Readable.from(openai_response.body);

  nodeStream.on('data', (chunk) => {
    res.write(chunk.toString());
  });
  nodeStream.on('end', () => {
    res.end();
  });
  nodeStream.on('error', (_) => {
    res.status(500).json({ error: 'Error streaming response' });
  });
}
