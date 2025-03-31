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

});