import { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from 'openai'

if (!process.env.VITE_DEEPSEEK_API_KEY) {
  throw new Error('DEEPSEEK_API_KEY is not being detected ekisde')
}

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.VITE_DEEPSEEK_API_KEY,
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userInput } = req.body

    if (!userInput) {
      return res.status(400).json({ error: 'User input is required' })
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Suggest 3 simple daily tasks based on the user's input as a list. Only return the list, no other text. User input: ${userInput}` },
      ],
      model: 'deepseek-chat',
    })

    const content = completion.choices[0].message.content || ''

    const tasks = content
      .split(/\n|\d+\.\s?/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    return res.status(200).json({ tasks })
  } catch (error) {
    console.error('Error in suggest-tasks API:', error)
    // Return more detailed error information in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      : 'Internal server error'
    return res.status(500).json({ error: errorMessage })
  }
} 