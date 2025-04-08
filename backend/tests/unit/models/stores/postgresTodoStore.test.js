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

  describe('PostgressTodoStore - create', () =>{

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

  describe('PostgresTodoStore - getById', () => {
    
    test('can find a Todo by Id', async () => {
      // mock return some data
      const mockTodos = [{ id: 1, title: 'ToDo 1', completed: false }]
      ;
      const existenId = 1;
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
      
      const result = await postgresTodoStore.getById(existenId);
      expect(result.id).toBe(1);
      expect(result.title).toBe('ToDo 1');
      expect(result.completed).toBe(false);
      
      expect(mockDb.query).toHaveBeenCalledTimes(1);
      const [actualSql] = mockDb.query.mock.calls[0];
      const normalizedActual = actualSql.replace(/\s+/g, ' ').trim();
      const expectedSql = 'SELECT id, title, completed FROM todos WHERE id = $1 AND archived != true';
      expect(normalizedActual).toBe(expectedSql);
      
    });

    test('can not find a Todo if it does not exist, should return null', async () => {
      // mock return some data
      const mockTodos = [];
      const nonExistenId = 999;
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
  
      const result = await postgresTodoStore.getById(nonExistenId);
  
      expect(result).toEqual(null);
      expect(mockDb.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('PostgresTodoStore - update', () => {
    
    test('can update completed field', async () => {
      // mock return some data
      const mockTodos = [{ id: 1, title: 'ToDo 1', completed: true }]
      ;
      const existenId = 1;
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
      
      const result = await postgresTodoStore.update(existenId, { completed: true });
      expect(result.id).toBe(1);
      expect(result.title).toBe('ToDo 1');
      expect(result.completed).toBe(true);
      
    });

    test('can update title field', async () => {
      // mock return some data
      const mockTodos = [{ id: 1, title: 'New title', completed: false }]
      ;
      const existenId = 1;
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
      
      const result = await postgresTodoStore.update(existenId, { title: 'New title' });
      expect(result.id).toBe(1);
      expect(result.title).toBe('New title');
      expect(result.completed).toBe(false);
            
    });

    test('can update archived field', async () => {
      // mock return some data
      const mockTodos = [{ id: 1, title: 'Todo Test', completed: true }]
      ;
      const existenId = 1;
      // mock db.query
      mockDb.query.mockResolvedValueOnce({
        rows: mockTodos
      });
      
      const result = await postgresTodoStore.update(existenId, { archived: true });
      expect(result.id).toBe(1);
      expect(result.title).toBe('Todo Test');
      expect(result.completed).toBe(true);
            
    });


    test('can not update if not valid field', async () => {

      const existenId = 1;
      await expect(postgresTodoStore.update(existenId, { invalidFields: true }))
      .rejects
      .toThrow('No valid fields to update');

      
    });
  });

});

