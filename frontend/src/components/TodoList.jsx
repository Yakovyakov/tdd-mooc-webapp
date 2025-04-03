
import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos }) => {

  return (
    <>
      {
        todos.map(
          todo => <Todo todo={todo} />
        ).reduce((acc, cur) => [...acc, <hr />, cur], [])
      }
    </>
  )
}

export default TodoList
