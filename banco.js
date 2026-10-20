
import Database from "better-sqlite3";

// Cria ou abre o banco de dados
const db = new Database("novra.db");

// Cria a tabela de usuários
db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    )
`);

console.log("Banco de dados criado!");