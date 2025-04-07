const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  router.get('/', controller.getTodos.bind(controller));
  router.post('/', controller.addTodo.bind(controller));
  router.patch('/:id', controller.genericUpdate.bind(controller));
  
  return router;
};