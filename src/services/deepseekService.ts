export const getSuggestedTasks = async (userInput: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/suggest-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch suggested tasks')
    }

    const data = await response.json()
    return data.tasks
  } catch (error) {
    console.error('Error fetching suggested tasks:', error)
    return []
  }
} 