// TODO: TDD

const TodoService = require('../../src/services/todoService');

describe('TodoService - Unit test', () => {
  let service, mockModel;

  beforeEach(() => {
    // Mock the model
    mockModel = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn(),
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


});