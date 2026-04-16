let saldo = 0;
let extrato = [];

// ELEMENTOS
const saldoElemento = document.getElementById("valorSaldo");
const listaExtrato = document.getElementById("listaExtrato");
const areaExtrato = document.getElementById("areaExtrato");

const btnDepositar = document.getElementById("depositar");
const btnSacar = document.getElementById("sacar");
const btnExtrato = document.getElementById("extratoBtn");
const btnSair = document.getElementById("sair");

// 🔥 CARREGAR DADOS SALVOS
function carregarDados() {
  let saldoSalvo = localStorage.getItem("saldo");
  let extratoSalvo = localStorage.getItem("extrato");

  if (saldoSalvo) {
    saldo = Number(saldoSalvo);
  }

  if (extratoSalvo) {
    extrato = JSON.parse(extratoSalvo);

    extrato.forEach(item => {
      adicionarExtrato(item);
    });
  }
}

// 🔥 SALVAR DADOS
function salvarDados() {
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("extrato", JSON.stringify(extrato));
}

// SALDO
function atualizarSaldo() {
  saldoElemento.innerText = `R$ ${saldo}`;
}

// DATA
function pegarData() {
  return new Date().toLocaleString();
}

// EXTRATO
function adicionarExtrato(texto) {
  let li = document.createElement("li");
  li.innerText = texto;
  listaExtrato.appendChild(li);
}

// DEPOSITAR
btnDepositar.onclick = function () {
  let valor = prompt("Valor depósito:");

  if (valor === null) {
    alert("Depósito cancelado");
    return;
  }

  valor = Number(valor);

  if (valor > 0) {
    saldo += valor;

    let msg = `Depósito R$ ${valor} - ${pegarData()}`;
    extrato.push(msg);
    adicionarExtrato(msg);

    salvarDados();
    atualizarSaldo();

    alert("Depósito feito!");
  } else {
    alert("Valor inválido");
  }
};

// SACAR
btnSacar.onclick = function () {
  let valor = prompt("Valor saque:");

  if (valor === null) {
    alert("Saque cancelado");
    return;
  }

  valor = Number(valor);

  if (valor <= 0) {
    alert("Valor inválido");
    return;
  }

  if (valor > saldo) {
    alert("Saldo insuficiente");
  } else {
    if (confirm("Confirmar saque?")) {
      saldo -= valor;

      let msg = `Saque R$ ${valor} - ${pegarData()}`;
      extrato.push(msg);
      adicionarExtrato(msg);

      salvarDados();
      atualizarSaldo();

      alert("Saque feito!");
    } else {
      alert("Saque cancelado");
    }
  }
};

// EXTRATO
btnExtrato.onclick = function () {
  areaExtrato.classList.toggle("hidden");
};

// SAIR
btnSair.onclick = function () {
  if (confirm("Deseja sair?")) {
    document.body.innerHTML = "<h1 style='text-align:center;'>Sistema encerrado</h1>";
  }
};

// INIT
carregarDados();
atualizarSaldo();