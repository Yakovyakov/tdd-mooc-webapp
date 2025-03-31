
class TodoService {
  constructor(model) {
    this.model = model;
  }
 
  async getAllTodo() {
    return this.model.getAll();
  }

}

module.exports = TodoService;