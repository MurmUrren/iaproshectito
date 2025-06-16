import React from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => onRemove(todo.id)} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </div>
  )
} 