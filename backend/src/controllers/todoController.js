class TodoController {
  constructor(service) {
    this.service = service;
  }

  async getTodos(req, res) {
    try {
      const todos = await this.service.getAllTodo();
      console.log(todos);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addTodo(req, res) {
    try {
      const { title } = req.body;
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
      }

      const newTodo = await this.service.addTodo({ title });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
  
module.exports = TodoController;