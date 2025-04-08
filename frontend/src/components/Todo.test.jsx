/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'

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
      expect(buttonArchive).toBeVisible();

    })
  })
})