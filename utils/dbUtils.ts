import { SQLiteDatabase } from 'expo-sqlite/next';

export const checkIfTableExists = async (db: SQLiteDatabase, tableName: string) => {
  db.withTransactionAsync(async () => {
    const result = await db.runAsync(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
    );
    console.log('🚀 ~ db.withTransactionAsync ~ result:', result);
  });
};

export const initTables = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT, description TEXT, userId INTEGER, createdAt TEXT, updatedAt TEXT);
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT, email TEXT, password TEXT);
    `
    );
  } catch (error) {
  console.log("🚀 ~ initTables ~ error:", error)
  }
};
