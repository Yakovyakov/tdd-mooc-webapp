// TODO: integration test Todo Model - postgressTodoStore - db
const { pool } = require('../../../src/config/db');
const PostgresTodoStore = require('../../../src/models/stores/postgresTodoStore');
const Todo  = require('../../../src/models/Todo');

describe('TodoModel + PostgresTodoStore (Integración)', () => {
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
});