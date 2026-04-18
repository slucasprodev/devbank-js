let usuarioAtual = "";

//  login
function login() {
  usuarioAtual = document.getElementById("usuario").value;

  if (!usuarioAtual) return;

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";

  atualizarSaldo();
  carregarExtrato();
}

//  saldo
async function atualizarSaldo() {
  const res = await fetch(`http://localhost:3000/saldo/${usuarioAtual}`);
  const data = await res.json();

  document.getElementById("valorSaldo").innerText = `R$ ${data.saldo}`;
}

// 📄 extrato
async function carregarExtrato() {
  const res = await fetch(`http://localhost:3000/extrato/${usuarioAtual}`);
  const data = await res.json();

  const lista = document.getElementById("listaExtrato");
  lista.innerHTML = "";

  data.reverse().forEach(e => {
    const li = document.createElement("li");
    li.innerText = `${e.tipo} - R$${e.valor} - ${new Date(e.data).toLocaleString()}`;
    lista.appendChild(li);
  });
}

//  depósito
document.getElementById("depositar").onclick = async () => {
  const valor = prompt("Valor depósito:");

  await fetch("http://localhost:3000/deposito", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: usuarioAtual, valor: Number(valor) })
  });

  atualizarSaldo();
  carregarExtrato();
};

// saque
document.getElementById("sacar").onclick = async () => {
  const valor = prompt("Valor saque:");

  await fetch("http://localhost:3000/saque", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: usuarioAtual, valor: Number(valor) })
  });

  atualizarSaldo();
  carregarExtrato();
};

// extrato
document.getElementById("extratoBtn").onclick = carregarExtrato;

//  transferência
document.getElementById("transferirBtn").onclick = async () => {
  const para = prompt("Transferir para:");
  const valor = prompt("Valor:");

  await fetch("http://localhost:3000/transferencia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      de: usuarioAtual,
      para,
      valor: Number(valor)
    })
  });

  atualizarSaldo();
  carregarExtrato();
};

//  sair
document.getElementById("sair").onclick = () => {
  location.reload();
};