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
      // mock return empty array
      mockDb.query.mockResolvedValueOnce({
        rows: []
      });
  
      const result = await postgresTodoStore.getAll();
  
      expect(result).toEqual([]);
      expect(mockDb.query).toHaveBeenCalledTimes(1);
    });
  });

});

