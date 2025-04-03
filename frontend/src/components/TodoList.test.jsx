/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'

import TodoList from './TodoList'

describe('List component tests', () => {
  test('should show all Todo', () => {
    const todos = [
      { id: 1, title: 'ToDo 1', archived: false },
      { id: 2, title: 'ToDo 2', archived: true },
      { id: 3, title: 'ToDo 3', archived: false },
    ]
    render(<TodoList todos={todos}/>)
    todos.forEach(todo => {
      expect(screen.getByText(todo.title)).toBeInTheDocument()
    })
  })
})
