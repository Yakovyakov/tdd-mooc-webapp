import { useEffect, useState } from 'react'
import axios from '../util/apiClient'


import TodoForm from './TodoForm'
import TodoList from './TodoList'

const TodoView = () => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    const { data } = await axios.get('/todos')
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    setTodos([...todos, data])
  }


  return (
    <>
      <h1>Todos App</h1>
      <TodoForm createTodo={createTodo} />
      <TodoList todos={todos}  />
    </>
  )
}

export default TodoView
