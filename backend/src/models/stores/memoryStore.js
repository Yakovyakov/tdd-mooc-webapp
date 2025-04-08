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

  async update(id, updates) {

    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;

    // only allowedFields
    const allowedFields = ['completed', 'title', 'archived'];
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    if (Object.keys(filteredUpdates).length === 0) {
      throw new Error('No valid fields to update');
    }

    this.todos[index] = { 
      ...this.todos[index], 
      ...filteredUpdates 
    };

    const todo = this.todos[index];
    const { archived, ...todoWithoutArchived } = todo;
    return todoWithoutArchived;
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