class Todo {
  constructor(store) {
    this.store = store;
  }

  async create(todo) {
    if (!todo.title?.trim()) {
      throw new Error('Title is required');
    }
    return this.store.create({
      title: todo.title.trim(),
    });
  }

  async getById(id) {
    return this.store.getById(id);
  }

  async update(id, updates) {
    return this.store.update(id, updates);
  }
  
  async getAll() {
    return this.store.getAll();
  }
}
  
  module.exports = Todo;