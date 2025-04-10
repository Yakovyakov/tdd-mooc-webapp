/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Todo from './Todo'


describe('Todo component tests', () => {
  let container

  describe('Todo Tests, step 1', () => {
    
    test('title is visible', () => {
      const todo = {
        id: '1234',
        title: 'title value',
        completed: false,
      }
      container = render(<Todo todo={todo}/>).container
      
      let element = screen.getByText('title value')

      expect(element).toBeDefined()
      expect(element).toBeVisible()
      element = screen.getByText('This todo is not done')
      expect(element).toBeDefined()
      expect(element).toBeVisible()
      const button = screen.getByRole('button', { name: /set as done/i })
      expect(button).toBeDefined()
      expect(button).toBeVisible();

      const buttonArchive = screen.getByRole('button', { name: /archive/i })
      expect(buttonArchive).toBeDefined()
      expect(buttonArchive).toBeVisible();


    })
    test('if completed is true, button set as done is not visible', () => {
      const todo = {
        id: '1234',
        title: 'title value',
        completed: true,
      }
      container = render(<Todo todo={todo}/>).container
      
      let element = screen.getByText('title value')

      expect(element).toBeDefined()
      expect(element).toBeVisible()
      element = screen.getByText('This todo is done')
      expect(element).toBeDefined()
      expect(element).toBeVisible()

      const button = screen.queryByRole('button', { name: /set as done/i })
      expect(button).toBeNull()

      const buttonArchive = screen.getByRole('button', { name: /archive/i })
      expect(buttonArchive).toBeDefined()
      expect(buttonArchive).toBeVisible()

    })

    test('can click on "set as done" button', async () => {
      const completeTodo = vi.fn()
      const user = userEvent.setup()
      const todo = {
        id: '1234',
        title: 'title value',
        completed: false,
      }
      render(<Todo todo={todo} completeTodo={completeTodo}/>)

      const completeButton = screen.getByRole('button', { name: /set as done/i })
      await user.click(completeButton)

      expect(completeTodo.mock.calls).toHaveLength(1)
  
      expect(completeTodo.mock.calls[0][0]).toStrictEqual('1234')
      expect(completeTodo.mock.calls[0][1]).toStrictEqual({ completed: true })      
    })
    
    test('can rename a Todo', async () => {
      const mockUpdate = vi.fn()
      const user = userEvent.setup()
      const todo = { id: 1, title: "Original", completed: false }
      
      render(<Todo todo={todo} renameTodo={mockUpdate} />)
      
      await user.click(screen.getByText(/rename/i))
      
      const input = screen.getByDisplayValue("Original")
      await user.clear(input);
      await user.type(input, "Edited")
      
      await user.click(screen.getByText(/save/i))

      await waitFor(() => {
        expect(screen.queryByDisplayValue("Edited")).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: /rename/i })).toBeInTheDocument()
      })
      expect(mockUpdate).toHaveBeenCalledWith(1, { title: "Edited" })
    })

    test('can archived a Todo', async () => {
      const mockUpdate = vi.fn()
      const user = userEvent.setup()
      const todo = { id: 1, title: "Todo Test", completed: false }
      
      render(<Todo todo={todo} archiveTodo={mockUpdate} />)

      await user.click(screen.getByRole('button', { name: /archive/i }))

      expect(mockUpdate).toHaveBeenCalledWith(1, { archived: true })
    })

  })
})