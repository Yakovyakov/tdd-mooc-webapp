const MemoryStore = require('../../../../src/models/stores/memoryStore');

describe('MemoryStore', () => {
  let store;

  beforeEach(() => {
    store = new MemoryStore();
  });

  describe('MemoryStore-getAll', () => {
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

  describe('MemoryStore-create', () =>{

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

});