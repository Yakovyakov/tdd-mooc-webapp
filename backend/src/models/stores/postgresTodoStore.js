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

  async getById(id) {
    const { rows } = await this.db.query(`
      SELECT id, title, completed
      FROM todos
      WHERE id = $1 AND archived != true`,
      [id],
    );
    return rows.map(this.#rowToTodo)[0] || null;
  }

  async create({ title }) {
    const { rows }  = await this.db.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed',
      [title]
    );
    return rows.map(this.#rowToTodo)[0] || null;
  }

  async update(id, updates) {

    const allowedFields = ['completed', 'title'];
    const setClauses = [];
    const values = [];
    let paramIndex = 1;
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClauses.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (setClauses.length === 0) {
      throw new Error('No valid fields to update');
    }

    values.push(id);
    
    const query = `
      UPDATE todos
      SET ${setClauses.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, title, completed
    `;

    const { rows } = await this.db.query(query, values);

    return rows.map(this.#rowToTodo)[0] || null;
  }

}

module.exports = PostgresTodoStore;