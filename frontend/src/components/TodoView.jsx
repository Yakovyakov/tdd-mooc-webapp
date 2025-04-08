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

  const completeTodo = async (id, updates) => {
    const { _data } = await axios.patch(`/todos/${id}`, updates)
    refreshTodos()
  }

  const renameTodo = async (id, updates) => {
    const { _data } = await axios.patch(`/todos/${id}`, updates)
    refreshTodos()
  }


  return (
    <>
      <h1>Todos App</h1>
      <TodoForm createTodo={createTodo} />
      <TodoList todos={todos} completeTodo={completeTodo} renameTodo={renameTodo} archiveTodo={() => null}/>
    </>
  )
}

export default TodoView
