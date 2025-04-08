// tests/integration/api/todo.routes.test.js
const request = require('supertest');
jest.mock('../../../src/services/todoService');
const TodoService = require('../../../src/services/todoService');


const app = require('../../../src/app');

describe('API Routes (with Mocks)', () => {
  
  let mockService;

  beforeAll(() => {
    
    mockService = TodoService.mock.instances[0];
    
    mockService.addTodo = jest.fn();
    mockService.getAllTodo = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /todos should return 400 if title is empty', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: '' });
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Title is required' });
    // never call to the service
    expect(mockService.addTodo).not.toHaveBeenCalled();
  });

  test('GET /todos should return 200 with mocked Todo', async () => {
    mockService.getAllTodo.mockResolvedValue([{ id: 1, title: 'Mocked Todo', completed: false }]);
    
    const response = await request(app).get('/todos');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Mocked Todo', completed: false }]);
  });

  describe('PATCH /todos/:id Generic Update', () => {
    test('PATCH can update complete field, should return 200 with updated Todo', async () => {
      mockService.updateTodo.mockResolvedValue({ id: 1, title: 'Mocked Todo', completed: true });
      
      const response = await request(app)
        .patch('/todos/1')
        .send({ completed: true });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, title: 'Mocked Todo', completed: true });
    });

    test('PATCH can update title field, should return 200 with updated Todo', async () => {
      mockService.updateTodo.mockResolvedValue({ id: 1, title: 'Mocked Todo', completed: true });
      
      const response = await request(app)
        .patch('/todos/1')
        .send({ title: 'Mocked Todo' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, title: 'Mocked Todo', completed: true });
    });

    test('PATCH can update archived field, should return 200 with updated Todo', async () => {
      mockService.updateTodo.mockResolvedValue({ id: 1, title: 'Mocked Todo', completed: true });
      
      const response = await request(app)
        .patch('/todos/1')
        .send({ archived: true });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, title: 'Mocked Todo', completed: true });
    });

    test('PATCH if does not exist a Todo should return status code 404', async () => {
      mockService.updateTodo.mockRejectedValue(
        new Error("Todo not found")
      );
      
      const response = await request(app)
        .patch('/todos/1')
        .send({ completed: true });
      
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Todo not found' });
    });


    test('PATCH if not valid fields, should return status code 400', async () => {
      mockService.updateTodo.mockRejectedValue(
        new Error("No valid fields to update")
      );
      
      const response = await request(app)
        .patch('/todos/1')
        .send({ invalidField: true });
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'No valid fields to update' });
    });
  });
});
