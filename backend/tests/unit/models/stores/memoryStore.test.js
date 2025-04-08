const MemoryStore = require('../../../../src/models/stores/memoryStore');

describe('MemoryStore', () => {
  let store;

  beforeEach(() => {
    store = new MemoryStore();
  });

  describe('MemoryStore - getAll', () => {
    test('if empty, should return an empty list', async () => {
      const allTodo = await store.getAll();
      expect(allTodo).toEqual([]);

    });

    test('getAll(), if non empty return all Todo', async () => {
      
      // inject some data

      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
        {id: 2, title: 'ToDo 2', completed: true, archived: false},
      ];
      const allTodo = await store.getAll();
      const expectedTodo = [
        { id: 1, title: 'ToDo 1', completed: false },
        { id: 2, title: 'ToDo 2', completed: true },
      ];

      expect(allTodo).toHaveLength(2);
      expect(allTodo).toEqual(expect.arrayContaining(expectedTodo));
    });

    test('getAll(), if non empty return all Todo except archived = true', async () => {

      // inject some data
      
      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
        {id: 2, title: 'ToDo 2', completed: true, archived: true},
        {id: 3, title: 'ToDo 3', completed: true, archived: false},
      ];
      const allTodo = await store.getAll();
      const expectedTodo = [
        { id: 1, title: 'ToDo 1', completed: false },
        { id: 3, title: 'ToDo 3', completed: true },
      ];

      expect(allTodo).toHaveLength(2);
      expect(allTodo).toEqual(expect.arrayContaining(expectedTodo));
    });

  
  });

  describe('MemoryStore - create', () =>{

    test('create() can create a todo', async () => {
      const todo1 = await store.create({ title: 'ToDo 1' });
      expect(todo1.id).toBe(1);
      expect(todo1.title).toBe('ToDo 1');
      expect(todo1.completed).toBe(false);
  
    });
    test('create() generates incremental IDs', async () => {
      const todo1 = await store.create({ title: 'ToDo 1' });
      const todo2 = await store.create({ title: 'ToDo 2' });
      expect(todo2.id).toBe(todo1.id + 1);
    });
  });

  describe('MemoryStore - getById', () =>{

    test('can find a Todo by Id', async () => {
      // inject some data

      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
        {id: 2, title: 'ToDo 2', completed: true, archived: false},
        {id: 3, title: 'ToDo 3', completed: true, archived: false},
      ];
      for (const todo of store.todos) {
      
        const existenId = todo.id;
        const result = await store.getById(existenId);
        expect(result.id).toBe(existenId);
        expect(result.title).toBe(todo.title);
        expect(result.completed).toBe(todo.completed);
        expect(result).not.toHaveProperty('archived');
      }
    });

    test('can not find a Todo if Todo does not exist', async () => {
      // inject some data

      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
        {id: 2, title: 'ToDo 2', completed: true, archived: false},
        {id: 3, title: 'ToDo 3', completed: true, archived: false},
      ];

      const nonExistenId = 999;
      const result = await store.getById(nonExistenId);
      expect(result).toBe(null);
    });

    test('can not find a Todo if property archived is true', async () => {
      // inject some data

      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
        {id: 2, title: 'ToDo 2', completed: true, archived: true},
        {id: 3, title: 'ToDo 3', completed: true, archived: false},
      ];

      const existenId = 2;
      const result = await store.getById(existenId);
      expect(result).toBe(null);
    });
  });

  describe('MemoryStore - update', () =>{

    test('can not update if not valid fields', async () => {
      // inject some data
      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
      ];

      const existenId = 1;

      await expect(store.update(existenId, { invalidFields: true }))
        .rejects
        .toThrow('No valid fields to update');
    });
  
    test('can update completed field', async () => {
      // inject some data
      store.todos = [
        {id: 1, title: 'ToDo 1', completed: false, archived: false},
      ];

      const existenId = 1;

      const result = await store.update(existenId, { completed: true });

      expect(result.id).toBe(1);
      expect(result.title).toBe('ToDo 1');
      expect(result.completed).toBe(true);
      expect(result).not.toHaveProperty('archived');

    });

    test('can update title field', async () => {
      // inject some data
      store.todos = [
        {id: 1, title: 'Original Title', completed: false, archived: false},
      ];

      const existenId = 1;

      const result = await store.update(existenId, { title: 'New title' });

      expect(result.id).toBe(1);
      expect(result.title).toBe('New title');
      expect(result.completed).toBe(false);
      expect(result).not.toHaveProperty('archived');

    });

    test('can update archived field', async () => {
      // inject some data
      store.todos = [
        {id: 1, title: 'Original Title', completed: false, archived: false},
      ];

      const existenId = 1;

      const result = await store.update(existenId, { archived: true });

      expect(result.id).toBe(1);
      expect(result.title).toBe('Original Title');
      expect(result.completed).toBe(false);
      expect(result).not.toHaveProperty('archived');
      expect(store.todos[0].archived).toBe(true)

    });

  });


});