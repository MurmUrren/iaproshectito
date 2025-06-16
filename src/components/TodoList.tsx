import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'
import { getSuggestedTasks } from '../services/deepseekService'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { todos, addTodo, toggleTodo, removeTodo, suggestedTodos, setSuggestedTodos } = useTodoStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
      setIsLoading(true)
      // Al agregar una tarea, se obtienen las sugerencias de tareas
      const suggestions = await getSuggestedTasks(newTodo.trim())
      setSuggestedTodos(suggestions)
      setIsLoading(false)
    }
  }

  const handleSuggestedTaskClick = (task: string) => {
    addTodo(task)
    // Al agregar una tarea, se elimina de la lista de sugerencias
    setSuggestedTodos(suggestedTodos.filter((t) => t !== task))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Suggested Tasks</h2>
          <div className="text-gray-500">Loading suggestions...</div>
        </div>
      ) : suggestedTodos.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Suggested Tasks</h2>
          <div className="space-y-2">
            {suggestedTodos.map((task, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedTaskClick(task)}
                className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {task}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </div>
    </div>
  )
} 