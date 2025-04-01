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

}

module.exports = PostgresTodoStore;