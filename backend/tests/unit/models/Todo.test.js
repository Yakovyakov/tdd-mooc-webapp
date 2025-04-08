const Todo = require('../../../src/models/Todo');
const MemoryStore = require('../../../src/models/stores/memoryStore');

describe('Todo Model Unit Tests (with Memory Store)', () => {
  let todoModel;
  let memoryStore;

  beforeEach(() => {
    memoryStore = new MemoryStore();
    todoModel = new Todo(memoryStore);
  });

  describe('create()', () => {
    it('should throw error when title is missing', async () => {
      await expect(todoModel.create({}))
        .rejects
        .toThrow('Title is required');
    });

    it('should create a new todo', async () => {
      const todoData = { title: 'ToDo 1' };
      const createdTodo = await todoModel.create(todoData);
      
      expect(createdTodo).toHaveProperty('id');
      expect(createdTodo.title).toBe(todoData.title);
      expect(createdTodo.completed).toBe(false);
    });
  });

  describe('getAll()', () => {
    it('should return empty array initially', async () => {
      const todos = await todoModel.getAll();
      expect(todos).toEqual([]);
    });

    it('should return all created todos', async () => {
      const todo1 = await todoModel.create({ title: 'Todo 1' });
      const todo2 = await todoModel.create({ title: 'Todo 2' });
      
      const todos = await todoModel.getAll();
      expect(todos).toHaveLength(2);
      expect(todos).toEqual(expect.arrayContaining([todo1, todo2]));
    });
  });


  describe('getById()', () => {
    it('can find a Todo by Id', async () => {

      const todo1 = await todoModel.create({ title: 'Todo 1' });
      const todo2 = await todoModel.create({ title: 'Todo 2' });
      const todo3 = await todoModel.create({ title: 'Todo 3' });

      const todos = await todoModel.getAll();
      expect(todos).toHaveLength(3);
      expect(todos).toEqual(expect.arrayContaining([todo1, todo2, todo3 ]));
      for (const todo of todos) {
        const existenId = todo.id;
        const result = await todoModel.getById(existenId);
        expect(result.id).toBe(existenId);
        expect(result.title).toBe(todo.title);
        expect(result.completed).toBe(false);
        expect(result).not.toHaveProperty('archived');
      }
    });

    it('can not find a Todo if it does not exist', async () => {
      const todo1 = await todoModel.create({ title: 'Todo 1' });
      const todo2 = await todoModel.create({ title: 'Todo 2' });
      const todo3 = await todoModel.create({ title: 'Todo 3' });

      const todos = await todoModel.getAll();
      expect(todos).toHaveLength(3);
      expect(todos).toEqual(expect.arrayContaining([todo1, todo2, todo3 ]));

      const notExistenId = 999;

      const result = await todoModel.getById(notExistenId);
      expect(result).toEqual(null);
    });
  });

  describe('update', () => {
    it('can update completed field', async () => {
      const todo1 = await todoModel.create({ title: 'Todo 1' });
      expect(todo1.completed).toEqual(false);

      const existenId = 1;
      const result = await todoModel.update(existenId, { completed: true });
      expect(result.completed).toEqual(true);
      expect(result.id).toEqual(existenId);
      expect(result.title).toEqual('Todo 1');
      expect(result).not.toHaveProperty('archived');

    });

    it('can update title field', async () => {
      const todo1 = await todoModel.create({ title: 'Original title' });
      expect(todo1.completed).toEqual(false);

      const existenId = 1;
      const result = await todoModel.update(existenId, { title: 'New title' });
      expect(result.completed).toEqual(false);
      expect(result.id).toEqual(existenId);
      expect(result.title).toEqual('New title');
      expect(result).not.toHaveProperty('archived');

    });

    it('can update archived field', async () => {
      const todo1 = await todoModel.create({ title: 'Todo Test' });
      expect(todo1.completed).toEqual(false);

      const existenId = 1;
      const result = await todoModel.update(existenId, { archived: true });
      expect(result.completed).toEqual(false);
      expect(result.id).toEqual(existenId);
      expect(result.title).toEqual('Todo Test');
      expect(result).not.toHaveProperty('archived');

    });


    test('can not update if not valid fields', async () => {
      const todo1 = await todoModel.create({ title: 'Todo 1' });
      expect(todo1.completed).toEqual(false);

      const existenId = 1;

      await expect(todoModel.update(existenId, { invalidFields: true }))
        .rejects
        .toThrow('No valid fields to update');
    });


  });

});