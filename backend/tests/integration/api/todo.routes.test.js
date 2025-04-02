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
});