class MemoryStore {
  constructor() {
    this.todos = [];
    this.currentId = 1;
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
}
  
module.exports = MemoryStore;