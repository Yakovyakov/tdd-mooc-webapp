const { mockDeep } = require('jest-mock-extended');


const PostgresTodoStore = require('../../../../src/models/stores/postgresTodoStore');


describe('PostgresTodoStore', () => {
  let mockDb;
  let postgresTodoStore;

  beforeEach(() => {
    // mock db
    mockDb = mockDeep();
    postgresTodoStore = new PostgresTodoStore(mockDb);
  });

  describe('PostgresTodoStore - getAll', () => {
    
    test('should return array of ToDo not archived', async () => {
      // mock return some data
      const mockTodos = [
        { id: 1, title: 'ToDo 1', completed: false },
        { id: 2, title: 'ToDo 2', completed: true }
      ];
  
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
      
      const result = await postgresTodoStore.getAll();
      
      expect(result).toEqual(mockTodos);
      expect(mockDb.query).toHaveBeenCalledTimes(1);
      const [actualSql] = mockDb.query.mock.calls[0];
      const normalizedActual = actualSql.replace(/\s+/g, ' ').trim();
      const expectedSql = 'SELECT id, title, completed FROM todos WHERE archived = false';
      
      expect(normalizedActual).toBe(expectedSql);
    });

    test('should return an empty array if not ToDo', async () => {
      // mock return some data
      const mockTodos = [];
  
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
  
      const result = await postgresTodoStore.getAll();
  
      expect(result).toEqual([]);
      expect(mockDb.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('Postgress - create()', () =>{

    test('create() can create a todo', async () => {
      // mock return some data insert
      const mockTodo = [{ id: 1, title: 'ToDo 1', completed: false }];
  
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodo
      });
      
      const result = await postgresTodoStore.create({ title: 'ToDo 1' });
      
      expect(result.id).toBe(1);
      expect(result.title).toBe('ToDo 1');
      expect(result.completed).toBe(false);
  
    });
  });

});

