
import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos }) => {

  return (
    <>
      {
        todos.map(todo => (
            <React.Fragment key={todo.id}>
              <hr key={`separator-${todo.id}`} />
              <Todo todo={todo} />
            </React.Fragment>
        ))
      }
    </>
  )
}

export default TodoList
