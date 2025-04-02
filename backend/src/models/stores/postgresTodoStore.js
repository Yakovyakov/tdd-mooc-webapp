class PostgresTodoStore {
  constructor(db) {
      this.db = db;
  }
  #rowToTodo(row) {
    return { id: row.id, title: row.title, completed: row.completed };
  }
  async getAll() {
    const result = await this.db.query(`
      SELECT id, title, completed
      FROM todos
      WHERE archived = false
    `);
    return result.rows;
  }

  async create({ title }) {
    const { rows }  = await this.db.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed',
      [title]
    );
    return rows.map(this.#rowToTodo)[0] || null;
  }
}

module.exports = PostgresTodoStore;