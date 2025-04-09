import React, { useState } from 'react'

const TodoForm = ({ createTodo }) => {
  const [title, setTitle] = useState('')

  const onChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTodo({ title })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="titleInput" type="text" name="title" value={title} onChange={onChange} />
      <button data-testid="todo-create-button" type="submit"> Create </button>
    </form>
  )
}

export default TodoForm
