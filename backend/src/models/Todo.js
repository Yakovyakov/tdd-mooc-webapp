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
  
  
    async getAll() {
      return this.store.getAll();
    }
  }
  
  module.exports = Todo;