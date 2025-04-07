// TODO: integration test Todo Model - postgressTodoStore - db
const { pool } = require('../../../src/config/db');
const PostgresTodoStore = require('../../../src/models/stores/postgresTodoStore');
const Todo  = require('../../../src/models/Todo');

describe('TodoModel + PostgresTodoStore (Integration test)', () => {
  let model;
  let store;

  beforeAll(async () => {
    
    store = new PostgresTodoStore(pool);
    model = new Todo(store);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        archived BOOLEAN DEFAULT FALSE
      )
    `);
  });

  beforeEach(async () => {
    await pool.query('DELETE FROM todos');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('should create a ToDo and save in Postgres DB', async () => {
    
    const newTodo = await model.create({ title: 'Test Integration' });
    
    expect(newTodo).toMatchObject({
      id: expect.any(Number),
      title: 'Test Integration',
      completed: false,
    });
    
    const { rows } = await pool.query('SELECT * FROM todos');
    expect(rows[0].title).toBe('Test Integration');
    expect(rows[0].completed).toBe(false);
    expect(rows[0].archived).toBe(false);
  });

  test('getAll() should return only not archived', async () => {
    
    await pool.query(`
      INSERT INTO todos (title, completed, archived) 
      VALUES ('ToDo 1', false, false), ('ToDo 2', true, true)
    `);
    
    const todos = await model.getAll();
    
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('ToDo 1');
  });

  test('getAll() should return an empty array if all archived or not data in DB', async () => {
    
    let todos = await model.getAll();
    
    expect(todos.length).toBe(0);
    expect(todos).toEqual([]);

    await pool.query(`
      INSERT INTO todos (title, completed, archived) 
      VALUES ('ToDo 1', false, true), ('ToDo 2', true, true)
    `);
    
    todos = await model.getAll();
    
    expect(todos.length).toBe(0);
    expect(todos).toEqual([]);
  });

  describe('getById', () => {
    test('can find a Todo in DB', async () => {
    
      let todos = await model.getAll();
      
      expect(todos.length).toBe(0);
      expect(todos).toEqual([]);
      // inject some data in DB
      await pool.query(`
        INSERT INTO todos (title, completed, archived) 
        VALUES ('ToDo 1', false, false), ('ToDo 2', false, false)
      `);

      const query = await pool.query(`
        SELECT id, title, completed, archived
        FROM todos
      `);
      const todosAtStart = query.rows;
      for (const todo of todosAtStart) {
        const existenId = todo.id;

        const result = await model.getById(existenId);
        expect(result.id).toEqual(existenId);
        expect(result.title).toEqual(todo.title);
        expect(result.completed).toEqual(false);
        expect(result).not.toHaveProperty('archived');
      }
      
    });
  
    test('can not find a Todo in DB if it does not exist', async () => {
    
      let todos = await model.getAll();
      
      expect(todos.length).toBe(0);
      expect(todos).toEqual([]);
      // inject some data in DB
      await pool.query(`
        INSERT INTO todos (title, completed, archived) 
        VALUES ('ToDo 1', false, false), ('ToDo 2', false, false)
      `);
      const nonExistenId = 999;
      const result = await model.getById(nonExistenId);
      expect(result).toEqual(null);      
    });

    test('can not find a Todo in DB if it has property archived = true', async () => {
    

      // inject some data in DB
      await pool.query(`
        INSERT INTO todos (title, completed, archived) 
        VALUES ('ToDo 1', false, true), ('ToDo 2', false, true)
      `);
      const query = await pool.query(`
        SELECT id, title, completed, archived
        FROM todos
      `);
      const todosAtStart = query.rows;
      for (const todo of todosAtStart) {
        // exist Id but archived = true
        const existenId = todo.id;

        const result = await model.getById(existenId);
        expect(result).toEqual(null);
      }
    });

  });

  describe('update', () => {
    test('You can update the completed field in a TODO in the DB.', async () => {
    
      let todos = await model.getAll();
      
      expect(todos.length).toBe(0);
      expect(todos).toEqual([]);
      // inject some data in DB
      await pool.query(`
        INSERT INTO todos (title, completed, archived) 
        VALUES ('ToDo 1', false, false)
      `);

      let query = await pool.query(`
        SELECT id, title, completed, archived
        FROM todos
      `);

      query = await pool.query(`
        SELECT id, title, completed, archived
        FROM todos
      `);
      const firstTodo = query.rows[0];
      const existenId = firstTodo.id;
      
      const updated = await model.update(existenId, { completed: true });
      expect(updated.id).toEqual(existenId);
      expect(updated.title).toEqual('ToDo 1');
      expect(updated.completed).toEqual(true);
      expect(updated).not.toHaveProperty('archived');

      // verify consistence
      const { rows } = await store.db.query(`SELECT * FROM todos WHERE id = ${existenId}`);
      expect(rows[0].title).toBe('ToDo 1');
      expect(rows[0].completed).toEqual(true);
    });
  });

});