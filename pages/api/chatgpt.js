import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { message } = req.body;

  try {
    // Send the message to OpenAI's chat completion endpoint
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' depending on your needs
      messages: [{ role: 'user', content: message }],
    });

    const botResponse = completion.choices[0].message.content;

    res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error in ChatGPT request:', error);
    res.status(500).json({ error: 'Error in ChatGPT request' });
  }
}
