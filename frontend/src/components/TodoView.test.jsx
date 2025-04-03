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

})