const { v4: uuid } = require('uuid');
const { pool } = require('../utils/db');

class TodoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this._validate();
  }

  _validate() {
    if (this.title.trim() < 5) { // jeżeli po usunięciu spacji tytuł ma ciągle 5 znaków to jest za krótki
      throw new Error('Todo title should be at least 5 characters.');
    }

    if (this.title.length > 150) {
      throw new Error('To do title should be at most 150 characters.');
    }
  }

  async insert() {
    this.id = this.id ?? uuid();

    await pool.execute('INSERT INTO `todos` (`id`, `title`)VALUES(:id, :title)', {
      id: this.id,
      title: this.title,
    });
    return this.id;
  }

  async delete() {
    if (!this.id) {
      throw new Error('Todo has no id');
    }

    await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
      id: this.id,
    });
  }

  static async find(id) { // jest to metoda statyczna
    const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
      id,
    });
    return results.length === 1 ? new TodoRecord(results[0]) : null; // robimy obiektowość?? jeżeli znaleziono to go
    // zwróc jak nie to zwróć nulla
  }

  async update() {
    this._validate();
    await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {
      id: this.id,
      title: this.title,
    });
  }

  static async findAll() {
    const [results] = await pool.execute('SELECT * FROM `todos`');
    return results;
  }
}

module.exports = {
  TodoRecord,
};
