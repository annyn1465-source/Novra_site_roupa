import open from "open";
import express from "express";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static("public"));

// Criar a pasta do banco
const pastaBanco = path.join(__dirname, "database");

if (!fs.existsSync(pastaBanco)) {
    fs.mkdirSync(pastaBanco, { recursive: true });
}

// Conectar ao SQLite
const db = new Database(
    path.join(pastaBanco, "novra.db")
);

// Criar a tabela de usuários
db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT NOT NULL,
        senha TEXT NOT NULL,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Testar o servidor
app.get("/api/health", (req, res) => {
    res.json({
        mensagem: "Servidor NOVRA funcionando!"
    });
});

/* ==========================
   LOGIN DE USUÁRIOS
============================ */

app.post("/api/login", async (req, res) => {
    const { email, senha } = req.body;

    if (typeof email !== "string" || typeof senha !== "string" || !email.trim() || !senha) {
        return res.status(400).json({
            mensagem: "Preencha o e-mail e a senha."
        });
    }

    try {
        const emailLimpo = email.trim().toLowerCase();

        // Procura o usuário pelo e-mail
        const usuario = db.prepare(
            "SELECT * FROM usuarios WHERE email = ?"
        ).get(emailLimpo);

        // Confere o e-mail e a senha
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }

        // Login realizado
        return res.status(200).json({
            mensagem: `Login realizado com sucesso! Olá, ${usuario.nome}!`,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro);

        return res.status(500).json({
            mensagem: "Erro ao realizar login."
        });
    }
});

app.listen(PORTA, async () => {
    console.log(`NOVRA rodando em http://localhost:${PORTA}`);

    await open(`http://localhost:${PORTA}`);
});


/* ==========================
   CADASTRO DE USUÁRIOS
============================ */

app.post("/api/usuarios", async (req, res) => {
    const { nome, email, telefone, senha } = req.body;

    // Verificar se todos os campos foram enviados
    if (
        typeof nome !== "string" ||
        typeof email !== "string" ||
        typeof telefone !== "string" ||
        typeof senha !== "string"
    ) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const telefoneLimpo = telefone.trim();

    // Validar os dados
    if (
        nomeLimpo.length < 3 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo) ||
        telefoneLimpo.replace(/\D/g, "").length < 8 ||
        senha.length < 6
    ) {
        return res.status(400).json({
            mensagem: "Confira seu nome, e-mail, telefone e senha."
        });
    }

    try {
        // Proteger a senha antes de salvar
        const senhaHash = await bcrypt.hash(senha, 10);

        // Salvar usuário no SQLite
        const resultado = db.prepare(`
            INSERT INTO usuarios (nome, email, telefone, senha)
            VALUES (?, ?, ?, ?)
        `).run(nomeLimpo, emailLimpo, telefoneLimpo, senhaHash);

        return res.status(201).json({
            mensagem: "Conta criada com sucesso!",
            id: resultado.lastInsertRowid
        });

    } catch (erro) {
        // Verificar se o e-mail já está cadastrado
        if (erro.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                mensagem: "Este e-mail já está cadastrado."
            });
        }

        console.error("Erro ao cadastrar usuário:", erro);

        return res.status(500).json({
            mensagem: "Erro ao criar a conta. Tente novamente."
        });
    }
});