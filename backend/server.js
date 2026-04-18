const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

//  Middlewares
app.use(express.json());
app.use(cors());

//  DB
const dbPath = path.join(__dirname, "db.json");

//  carregar DB
function carregarDB() {
  if (!fs.existsSync(dbPath)) {
    return { usuarios: {} };
  }

  const data = JSON.parse(fs.readFileSync(dbPath));

  if (!data.usuarios) {
    data.usuarios = {};
  }

  return data;
}

//  salvar DB
function salvarDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

let db = carregarDB();

//  usuário
function getUser(nome) {
  if (!db.usuarios[nome]) {
    db.usuarios[nome] = {
      saldo: 0,
      extrato: []
    };
  }

  return db.usuarios[nome];
}

//  base
app.get("/", (req, res) => {
  res.send("DevBank API rodando");
});

//  saldo
app.get("/saldo/:usuario", (req, res) => {
  const user = getUser(req.params.usuario);
  res.json({ saldo: user.saldo });
});

//  extrato
app.get("/extrato/:usuario", (req, res) => {
  const user = getUser(req.params.usuario);
  res.json(user.extrato);
});

//  depósito
app.post("/deposito", (req, res) => {
  const { usuario, valor } = req.body;

  if (!usuario || !valor || valor <= 0) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const user = getUser(usuario);

  user.saldo += valor;

  user.extrato.push({
    tipo: "deposito",
    valor,
    data: new Date().toISOString()
  });

  salvarDB(db);

  res.json({ usuario, saldo: user.saldo });
});

//  saque
app.post("/saque", (req, res) => {
  const { usuario, valor } = req.body;

  if (!usuario || !valor || valor <= 0) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const user = getUser(usuario);

  if (valor > user.saldo) {
    return res.status(400).json({ erro: "Saldo insuficiente" });
  }

  user.saldo -= valor;

  user.extrato.push({
    tipo: "saque",
    valor,
    data: new Date().toISOString()
  });

  salvarDB(db);

  res.json({ usuario, saldo: user.saldo });
});

//  transferência
app.post("/transferencia", (req, res) => {
  const { de, para, valor } = req.body;

  if (!de || !para || !valor || valor <= 0) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  const userFrom = getUser(de);
  const userTo = getUser(para);

  if (userFrom.saldo < valor) {
    return res.status(400).json({ erro: "Saldo insuficiente" });
  }

  userFrom.saldo -= valor;
  userTo.saldo += valor;

  userFrom.extrato.push({
    tipo: "transferencia_envio",
    para,
    valor,
    data: new Date().toISOString()
  });

  userTo.extrato.push({
    tipo: "transferencia_recebida",
    de,
    valor,
    data: new Date().toISOString()
  });

  salvarDB(db);

  res.json({ sucesso: true });
});

//  servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});