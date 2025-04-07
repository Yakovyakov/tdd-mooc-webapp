class MemoryStore {
  constructor() {
    this.todos = [];
    this.currentId = 1;
  }

  async getById(id) {
    const todo = this.todos.find((todo) => todo.id === id && todo.archived === false)
    if (!todo) return null;

    const { archived, ...todoWithoutArchived } = todo;

    return todoWithoutArchived;
  }
  async getAll() {
    return this.todos
      .filter(todo => !todo.archived)
      .map(({ id, title, completed }) => ({
        id,
        title,
        completed,
        // not includes 'archived' = true!
      }));
  }

  async create(todo) {
    const newTodo = {
      id: this.currentId++,
      title: todo.title,
      completed: todo.completed || false,
      archived: false
    };
    this.todos.push(newTodo);
    return ({ id: newTodo.id, title: newTodo.title, completed: newTodo.completed })
  }

}
  
module.exports = MemoryStore;