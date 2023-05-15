/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Counter from '@/lib/counter';
import { Message, Role } from '@/types/chatboxTypes';
import { SYSTEM_PROMPT } from '@/utils/prompt';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { Readable } from 'stream';

const CHAT_URL = 'https://api.openai.com/v1/chat/completions';
// incaase someone tries to spam the API
const counter = new Counter();
const ONE_HOUR = 60 * 60;

export default async function chat(req: NextApiRequest, res: NextApiResponse) {
  if (counter.getCount() > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  const messages = JSON.parse(req.body).messages as Message[];
  if (!messages) {
    return res.status(400).json({ error: 'Missing messages' });
  }
  const messages_to_send = [
    {
      role: Role.System,
      content: SYSTEM_PROMPT,
    },
  ].concat(
    messages.map((m) => {
      return {
        role: m.role,
        content: m.content,
      };
    }),
  );
  const raw = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: messages_to_send,
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

  if (
    !openai_response ||
    openai_response.status === 400 ||
    !openai_response.body
  ) {
    console.error(openai_response);
    return res.status(500).json({ error: 'Error fetching from OpenAI' });
  }

  counter.increment().expires(ONE_HOUR);
  console.log('Request received, Counter: ', counter.getCount());
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const nodeStream = Readable.from(openai_response.body);

  nodeStream.on('data', (chunk) => {
    res.write(chunk);
  });
  nodeStream.on('end', () => {
    res.end();
  });
  nodeStream.on('error', (_) => {
    console.error(_);
    res.status(500).json({ error: 'Error streaming response' });
  });
}
