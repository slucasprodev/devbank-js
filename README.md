# 🏦 DevBank - Full Stack Banking System

A full-stack learning project simulating a simple digital banking system.

DevBank is a simple full-stack banking simulation project built for learning backend and frontend integration using Node.js and vanilla JavaScript.

---

## 🚀 Features

- User-based accounts (no authentication system yet)
- Deposit system
- Withdraw system
- Transfers between users
- Transaction history (statement)
- Persistent storage using JSON file (db.json)

---

## 🧠 What I Learned

- Building REST APIs with Node.js and Express
- HTTP methods (GET, POST) and routing
- Backend state management
- File-based persistence using the `fs` module
- Frontend and backend communication using the Fetch API
- Basic system design and banking logic simulation
- Structuring a full-stack project

---

## 📡 API Routes

### 💰 Deposit
**POST** `/deposito`

```json
{
  "usuario": "lucas",
  "valor": 100
}
```

### 💸 Withdraw
**POST** `/saque`

```json
{
  "usuario": "lucas",
  "valor": 50
}
```

### 🔄 Transfer
**POST** `/transferencia`

```json
{
  "de": "lucas",
  "para": "ana",
  "valor": 50
}
```

### 💰 Balance
**GET** `/saldo/:usuario`

Example: `/saldo/lucas`

Response:
```json
{
  "saldo": 150
}
```

### 📄 Statement
**GET** `/extrato/:usuario`

Example: `/extrato/lucas`

Response:
```json
[
  {
    "tipo": "deposito",
    "valor": 100,
    "data": "2026-04-18T13:40:10.778Z"
  }
]
```

---

## 💻 How to Run

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

Open `frontend/index.html` using **Live Server** (VS Code extension).

---

## 📌 Status

Project completed as a full-stack learning exercise. It simulates a basic banking system with users, transactions, and persistence.

---

## 🎯 Purpose

This project was built to practice:

- Backend development fundamentals
- API design
- Frontend-backend integration
- Real-world system thinking (banking logic simulation)

---

## 🚀 Final Note

This project represents my progress in transitioning from basic programming concepts to full-stack application development.