import { useState } from 'react'
const Todo = ({ todo, completeTodo, renameTodo, archiveTodo }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const onClickComplete = () => {
    completeTodo(todo.id, { completed: true })
  }

  const onClickSave = () => {
    renameTodo(todo.id, { title: editedTitle })
    setIsEditing(false);
  }

  const onClickArchive = () => {
    archiveTodo(todo.id, { archived: true })
    
  }

  const doneInfo = (
    <>
      <span data-testid="todo-status" >This todo is done</span>
      <span>
        <button data-testid="todo-arcvhive-button" onClick={onClickArchive}> Archive </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span data-testid="todo-status">
        This todo is not done
      </span>
      <span>
        <button data-testid="todo-archive-button" onClick={onClickArchive}> Archive </button>
        <button data-testid="todo-complete-button" onClick={onClickComplete}> Set as done </button>
      </span>
    </>
  )
  return (
    <div data-testid="todo-item" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      {isEditing ? (
        <input
          type="text"
          data-testid="todo-edit-input"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          autoFocus
        /> 
      ) : (
        <span data-testid="todo-title">
          {todo.title}
        </span>
      )}
      <div>
        
        {!isEditing && (
          <button data-testid="todo-rename-button" onClick={() => setIsEditing(true)}>
            Rename
          </button>
        )}
        
        {isEditing && (
          <>
            <button data-testid="todo-save-button" onClick={onClickSave}>
              Save
            </button>
            <button data-testid="todo-cancel-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        )}
        
      </div>
      {todo.completed ? doneInfo : notDoneInfo}
    </div>
  )
}
export default Todo