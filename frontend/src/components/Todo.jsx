import { useState } from 'react'
const Todo = ({ todo, completeTodo, renameTodo }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const onClickComplete = () => {
    completeTodo(todo.id, { completed: true })
  }

  const onClickSave = () => {
    renameTodo(todo.id, { title: editedTitle })
  }

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button > Archive </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button > Archive </button>
        <button onClick={onClickComplete}> Set as done </button>
      </span>
    </>
  )
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          autoFocus
        /> 
      ) : (
        <span>
          {todo.title}
        </span>
      )}
      <div>
        
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            Rename
          </button>
        )}
        
        {isEditing && (
          <>
            <button onClick={onClickSave}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)}>
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