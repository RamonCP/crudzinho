import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve(__dirname, "database.db"));

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    )
  `);

export default db;
