// TODO: TDD

const TodoService = require('../../../src/services/todoService');

describe('TodoService - Unit test', () => {
  let service, mockModel;

  beforeEach(() => {
    // Mock the model
    mockModel = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn()
    };
    service = new TodoService(mockModel);
  });

  describe("get All ToDo", () => {
    test('if empty, should return an empty list', async () => {
      mockModel.getAll.mockResolvedValue([]);
      const result = await service.getAllTodo();
      expect(result.length).toBe(0);
    });

    test('if non empty, should return a list ToDo', async () => {
      mockModel.getAll.mockResolvedValue(
        [
          {
            id: 1,
            title: 'ToDo 1',
            completed: false
          },
          {
            id: 2,
            title: 'ToDo 2',
            completed: true
          },
        ]
      );
      const result = await service.getAllTodo();

      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[0].title).toBe("ToDo 1");
      expect(result[0].completed).toBe(false);
      expect(result[1].id).toBe(2);
      expect(result[1].title).toBe("ToDo 2");
      expect(result[1].completed).toBe(true);
    });
  
  });

  describe("addTodo", () => {
    test('should be create a task "completed: false"', async () => {
    
      mockModel.create.mockResolvedValue({
        id: 1,
        title: 'ToDo 1',
        completed: false
      });
      
      const result = await service.addTodo({ title: 'ToDo 1' });
      
      expect(mockModel.create).toHaveBeenCalledWith({
        title: 'ToDo 1',
      });
      
      expect(result.completed).toBe(false);
    });
  
    test('error if title is empty', async () => {
      await expect(service.addTodo({}))
        .rejects
        .toThrow('Title is required');
    });
  
  });

  describe("updateTodo", () => {
    test('can update completed field', async () => {
    
      mockTodo = { id: 1, title: 'ToDo 1', completed: false }
      mockModel.getById.mockResolvedValue(mockModel);
      mockModel.update.mockResolvedValue({ ...mockTodo, completed: true });
      let result = await service.updateTodo(1, { completed: true });
      expect(result.completed).toBe(true);
    });
  
    test('error if todo not found', async () => {
      const nonExistenId = 999;
      mockModel.getById.mockResolvedValue(null);
      await expect(service.updateTodo(nonExistenId, { completed: true }))
        .rejects
        .toThrow('Todo not found');
    });
  
  });

});