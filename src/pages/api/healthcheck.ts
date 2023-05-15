import { NextApiRequest, NextApiResponse } from 'next';

export default async function chat(req: NextApiRequest, res: NextApiResponse) {
  if (
    process.env.OPENAI_API_KEY != null &&
    process.env.OPENAI_API_KEY != undefined
  ) {
    res.status(200).json({ message: 'API key is set' });
  } else {
    res.status(400).json({ message: 'API key is not set' });
  }
}
