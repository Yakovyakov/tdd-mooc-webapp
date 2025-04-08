
import React from 'react'
import Todo from './Todo'
const TodoList = ({ todos, completeTodo }) => {

  return (
    <>
      {
        todos.map(todo => (
            <React.Fragment key={todo.id}>
              <hr key={`separator-${todo.id}`} />
              <Todo todo={todo} completeTodo={completeTodo} />
            </React.Fragment>
        ))
      }
    </>
  )
}

export default TodoList
