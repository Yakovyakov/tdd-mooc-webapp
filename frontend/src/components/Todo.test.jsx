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

    })
    test('if completed is true, button archived is visible', () => {
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
      element = screen.getByText('Archive')
      expect(element).toBeDefined()
      expect(element).toBeVisible()

    })
  })
})