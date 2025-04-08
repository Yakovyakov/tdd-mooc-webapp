/* eslint-disable no-undef */
import { render, screen, waitFor, fireEvent} from "@testing-library/react"
import axios from '../util/apiClient'
import TodoView from './TodoView'

vi.mock('../util/apiClient')

describe('TodoView component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should load and display the initial all', async () => {
    const mockTodos = [
      { id: 1, title: "ToDo 1", completed: false },
      { id: 2, title: "ToDo 2", completed: true }
    ]
    
    axios.get.mockResolvedValueOnce({ data: mockTodos })
    
    render(<TodoView />)
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/todos')
    })
    
    expect(screen.getByText('ToDo 1')).toBeInTheDocument()
    expect(screen.getByText('ToDo 2')).toBeInTheDocument()
    
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })

  test('should add a new Todo', async () => {
    const newTodo = { id: 3, title: "New Todo", completed: false }
    
    axios.get.mockResolvedValueOnce({ data: [] })
    axios.post.mockResolvedValueOnce({ data: newTodo })
    
    render(<TodoView />)
    
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: /create/i })
    
    fireEvent.change(input, { target: { value: newTodo.title } })
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/todos',
        { title: newTodo.title }
      )
    })
    
    expect(await screen.findByText(newTodo.title)).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })

  test('can mark a Todo as completed', async () => {
    const mockedGetData = [{ id: 1, title: "Test Todo", completed: false }]
    const mockedUpdatedTodo = { id: 1, title: "Test Todo", completed: true }
    
    axios.get.mockResolvedValueOnce({ data: mockedGetData })
    axios.get.mockResolvedValueOnce({ data: [mockedUpdatedTodo] })
    axios.patch.mockResolvedValueOnce({ data: mockedUpdatedTodo })

    render(<TodoView />)

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument()
    })    
    const button = screen.getByRole('button', { name: /set as done/i })
    
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        '/todos/1',
        { completed: true }
      )
    })
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })

    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })
  
  test('can rename a Todo', async () => {
    const mockedGetData = [{ id: 1, title: "Original", completed: false }]
    const mockedUpdatedTodo = { id: 1, title: "Edited", completed: false }
    
    axios.get.mockResolvedValueOnce({ data: mockedGetData })
    axios.get.mockResolvedValueOnce({ data: [mockedUpdatedTodo] })
    axios.patch.mockResolvedValueOnce({ data: mockedUpdatedTodo })

    render(<TodoView />)

    await waitFor(() => {
      expect(screen.getByText('Original')).toBeInTheDocument()
    })    
    const button = screen.getByRole('button', { name: /rename/i })
    
    fireEvent.click(button)

    const input = screen.getByDisplayValue("Original")
    
    fireEvent.change(input, { target: { value: 'Edited' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }))
    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        '/todos/1',
        { title: 'Edited' }
      )
    })
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })

    expect(screen.getByText('Edited')).toBeInTheDocument()
    
  })

})