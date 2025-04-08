
const Todo = ({ todo, completeTodo }) => {
  const onClickComplete = () => {
    completeTodo(todo.id, { completed: true })
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
      <span>
        {todo.title}
      </span>
      {todo.completed ? doneInfo : notDoneInfo}
    </div>
  )
}
export default Todo