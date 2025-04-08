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

  async genericUpdate(req, res) {
    try {
      // only allowedFields
      const { id } = req.params;
      const updates = req.body;
      const allowedFields = ['completed', 'title'];
      const filteredUpdates = Object.keys(updates)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = updates[key];
          return obj;
        }, {});

      if (Object.keys(filteredUpdates).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      const { completed } = filteredUpdates;

      if (completed && typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      const updatedTodo = await this.service.updateTodo(id, filteredUpdates );
      res.status(200).json(updatedTodo);
    } catch (error) {
      if (error.message === 'Todo not found') {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(500).json({ error: error.message });
    }
  }

}
  
module.exports = TodoController;