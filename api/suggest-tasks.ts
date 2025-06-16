import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.VITE_DEEPSEEK_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userInput } = body

    if (!userInput) {
      return new Response(JSON.stringify({ error: 'User input is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Suggest 3 simple daily tasks based on the user's input as a list. Only return the list, no other text. User input: ${userInput}`,
        },
      ],
      model: 'deepseek-chat',
    })

    const content = completion.choices[0].message.content || ''

    const tasks = content
      .split(/\n|\d+\.\s?/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    return new Response(JSON.stringify({ tasks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in suggest-tasks API:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
