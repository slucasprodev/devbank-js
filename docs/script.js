const API = "https://devbank-api.onrender.com";

let usuarioAtual = "";
let extratoAberto = false;

// elements
const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");
const saldoEl = document.getElementById("valorSaldo");
const listaExtrato = document.getElementById("listaExtrato");

// LOGIN
document.getElementById("entrar").addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value.trim();

  if (!usuario) {
    alert("Enter a username");
    return;
  }

  usuarioAtual = usuario;

  loginBox.style.display = "none";
  app.style.display = "block";

  carregarSaldo();
});

function onlyNumbers(value) {
  const cleaned = String(value).replace(/[^0-9]/g, "");
  const num = Number(cleaned);
  if (!num || num <= 0) return null;
  return num;
}

// 💰 balance
async function carregarSaldo() {
  const res = await fetch(`${API}/saldo/${usuarioAtual}`);
  const data = await res.json();
  saldoEl.innerText = `R$ ${data.saldo}`;
}

// statement
async function carregarExtrato() {
  const res = await fetch(`${API}/extrato/${usuarioAtual}`);
  const data = await res.json();

  listaExtrato.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");

    if (item.tipo === "deposito") {
      li.innerText = `+ Deposit: R$ ${item.valor}`;
    } else if (item.tipo === "saque") {
      li.innerText = `- Withdraw: R$ ${item.valor}`;
    } else if (item.tipo === "transferencia_envio") {
      li.innerText = `➡ Sent: R$ ${item.valor} to ${item.para}`;
    } else if (item.tipo === "transferencia_recebida") {
      li.innerText = `⬅ Received: R$ ${item.valor} from ${item.de}`;
    }

    listaExtrato.appendChild(li);
  });
}

// deposit
async function depositar() {
  const input = prompt("Deposit amount:");

  if (input === null) {
    alert("Deposit cancelled");
    return;
  }

  const valor = onlyNumbers(input);

  if (!valor) return;

  await fetch(`${API}/deposito`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: usuarioAtual,
      valor
    })
  });

  carregarSaldo();
}

// withdraw
async function sacar() {
  const input = prompt("Withdraw amount:");

  if (input === null) {
    alert("Withdraw cancelled");
    return;
  }

  const valor = onlyNumbers(input);

  if (!valor) return;

  await fetch(`${API}/saque`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: usuarioAtual,
      valor
    })
  });

  carregarSaldo();
}

// transfer
async function transferir() {
  const para = prompt("Transfer to:");

  if (para === null) {
    alert("Transfer cancelled");
    return;
  }

  const input = prompt("Amount:");

  if (input === null) {
    alert("Transfer cancelled");
    return;
  }

  const valor = onlyNumbers(input);

  if (!valor) return;

  await fetch(`${API}/transferencia`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      de: usuarioAtual,
      para,
      valor
    })
  });

  carregarSaldo();
}

// toggle statement
document.getElementById("extratoBtn").addEventListener("click", () => {
  extratoAberto = !extratoAberto;

  if (extratoAberto) {
    carregarExtrato();
    listaExtrato.style.display = "block";
  } else {
    listaExtrato.style.display = "none";
  }
});

//  logout
document.getElementById("sair").addEventListener("click", () => {
  usuarioAtual = "";
  loginBox.style.display = "block";
  app.style.display = "none";
});

// events
document.getElementById("depositar").addEventListener("click", depositar);
document.getElementById("sacar").addEventListener("click", sacar);
document.getElementById("transferirBtn").addEventListener("click", transferir);

// init
listaExtrato.style.display = "none";