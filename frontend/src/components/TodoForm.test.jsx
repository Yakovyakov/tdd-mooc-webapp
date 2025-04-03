/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

describe('Form component tests, create a Todo', () => {
  test('can calls onSubmit', async () => {
    const createTodo = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm createTodo = {createTodo} />)

    const titleInput = screen.getByRole('textbox')
    
    const createButton = screen.getByRole('button')

    await user.type(titleInput, 'ToDo 1')
    await user.click(createButton)
    const titleExpected= {
      title: 'ToDo 1'
    }
    expect(createTodo.mock.calls).toHaveLength(1)

    expect(createTodo.mock.calls[0][0]).toStrictEqual(titleExpected)

    expect(titleInput.value).toBe('')
  })
})
