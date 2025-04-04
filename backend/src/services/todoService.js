
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

  async updateTodo(id, updates) {
    const todo = await this.model.getById(id);


    if (!todo) throw new Error('Todo not found');

    return this.model.update(id, updates);
  }

}


module.exports = TodoService;