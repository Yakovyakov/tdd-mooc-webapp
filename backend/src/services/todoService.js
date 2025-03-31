
class TodoService {
  constructor(model) {
    this.model = model;
  }
 
  async getAllTodo() {
    return this.model.getAll();
  }

  async addTodo(todo) {
    if (!todo.title) {
      throw new Error('Title is required');
    }
    
    return this.model.create({
      title: todo.title,
    });
  }

}


module.exports = TodoService;