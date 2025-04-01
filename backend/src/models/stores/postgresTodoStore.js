class PostgresTodoStore {
  constructor(db) {
      this.db = db;
  }

  async getAll() {
    const result = await this.db.query(`
      SELECT id, title, completed
      FROM todos
      WHERE archived = false
    `); // ¡No selecciona el campo 'archived'!
    return result.rows;
  }

  async create({ title }) {
    const { rows } = await this.db.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING id, title, completed',
      [title]
    );
    return rows;
  }
}

module.exports = PostgresTodoStore;