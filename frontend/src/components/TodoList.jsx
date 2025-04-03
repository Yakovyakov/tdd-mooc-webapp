
import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos }) => {

  return (
    <>
      {
        todos.map((todo, index) => (
            <React.Fragment key={todo.id}>
              <Todo todo={todo} />
              {
                index < todos.length - 1 && (
                  <hr key={`separator-${todo.id}`} />
                )
              }
            </React.Fragment>
        ))
      }
    </>
  )
}

export default TodoList
