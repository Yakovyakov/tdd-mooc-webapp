const TodoController = require('../../../src/controllers/todoController');
const TodoService = require('../../../src/services/todoService');

jest.mock('../../../src/services/todoService');

describe('TodoController', () => {
  let controller;
  let mockService;
  let mockRes;

  beforeEach(() => {
    mockService = new TodoService();
    controller = new TodoController(mockService);
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // GET /todos
  describe('getTodos', () => {
    it('should return status code 200 with ToDo list', async () => {
      const mockTodos = [{ id: 1, title: 'Test', completed: false }];
      mockService.getAllTodo.mockResolvedValue(mockTodos);

      await controller.getTodos({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTodos);
    });

    it('should handle error 500', async () => {
      mockService.getAllTodo.mockRejectedValue(new Error('Error in DB'));

      await controller.getTodos({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error in DB' });
    });
  });

  // POST /todos
  describe('addTodo', () => {
    it('should return status code 201 and a new ToDo', async () => {
      const mockTodo = { id: 1, title: 'New Todo', completed: false };
      mockService.addTodo.mockResolvedValue(mockTodo);

      await controller.addTodo({ body: { title: 'New Todo' } }, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockTodo);
    });

    it('should return status code 400 if title is empty', async () => {
      await controller.addTodo({ body: { title: '' } }, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Title is required' });
    });
  });
});