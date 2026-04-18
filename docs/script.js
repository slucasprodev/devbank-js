const API = "https://devbank-api.onrender.com";

//  elementos da UI
const saldoEl = document.getElementById("valorSaldo");
const listaExtrato = document.getElementById("listaExtrato");
const areaExtrato = document.getElementById("areaExtrato");

//  carregar saldo
async function carregarSaldo() {
  try {
    const res = await fetch(`${API}/saldo/lucas`);
    const data = await res.json();
    saldoEl.innerText = `R$ ${data.saldo}`;
  } catch (err) {
    console.error("Erro ao carregar saldo:", err);
  }
}

// 🔹 carregar extrato
async function carregarExtrato() {
  try {
    const res = await fetch(`${API}/extrato/lucas`);
    const data = await res.json();

    listaExtrato.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");

      if (item.tipo === "deposito") {
        li.innerText = `+ Depósito: R$ ${item.valor} (${item.data})`;
      } else if (item.tipo === "saque") {
        li.innerText = `- Saque: R$ ${item.valor} (${item.data})`;
      } else if (item.tipo === "transferencia_envio") {
        li.innerText = `➡ Enviado para ${item.para}: R$ ${item.valor}`;
      } else if (item.tipo === "transferencia_recebida") {
        li.innerText = `⬅ Recebido de ${item.de}: R$ ${item.valor}`;
      }

      listaExtrato.appendChild(li);
    });

    areaExtrato.classList.remove("hidden");
  } catch (err) {
    console.error("Erro ao carregar extrato:", err);
  }
}

// 🔹 depositar
async function depositar() {
  const valor = Number(prompt("Valor do depósito:"));

  if (!valor || valor <= 0) return alert("Valor inválido");

  await fetch(`${API}/deposito`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario: "lucas",
      valor
    })
  });

  carregarSaldo();
}

//  sacar
async function sacar() {
  const valor = Number(prompt("Valor do saque:"));

  if (!valor || valor <= 0) return alert("Valor inválido");

  await fetch(`${API}/saque`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      usuario: "lucas",
      valor
    })
  });

  carregarSaldo();
}

//  eventos
document.getElementById("depositar").addEventListener("click", depositar);
document.getElementById("sacar").addEventListener("click", sacar);
document.getElementById("extratoBtn").addEventListener("click", carregarExtrato);

// 🔹 inicialização
carregarSaldo();