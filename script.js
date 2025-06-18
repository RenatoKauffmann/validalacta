let produtos = [];

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("produto").value;
  const fabricacao = document.getElementById("fabricacao").value;
  const validade = document.getElementById("validade").value;

  produtos.push({ nome, fabricacao, validade });
  atualizarTabela();
  atualizarDashboard();
  this.reset();
});

function atualizarTabela() {
  const tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";

  produtos.forEach((produto, index) => {
    const hoje = new Date();
    const validade = new Date(produto.validade);
    const diff = (validade - hoje) / (1000 * 60 * 60 * 24);

    let status = "status-ok";
    let textoStatus = "Válido";

    if (diff < 0) {
      status = "status-vencido";
      textoStatus = "Vencido";
    } else if (diff <= 5) {
      status = "status-proximo";
      textoStatus = "Próximo do vencimento";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.fabricacao}</td>
      <td>${produto.validade}</td>
      <td><span class="${status}">${textoStatus}</span></td>
      <td><button onclick="removerProduto(${index})">Excluir</button></td>
    `;

    tbody.appendChild(tr);
  });
}

function removerProduto(index) {
  produtos.splice(index, 1);
  atualizarTabela();
  atualizarDashboard();
}

function atualizarDashboard() {
  let vencidos = 0;
  let proximos = 0;
  let validos = 0;

  const hoje = new Date();

  produtos.forEach((produto) => {
    const validade = new Date(produto.validade);
    const diff = (validade - hoje) / (1000 * 60 * 60 * 24);

    if (diff < 0) vencidos++;
    else if (diff <= 5) proximos++;
    else validos++;
  });

  document.getElementById("total").innerText = produtos.length;
  document.getElementById("vencidos").innerText = vencidos;
  document.getElementById("proximos").innerText = proximos;
  document.getElementById("validos").innerText = validos;
}

function navegar(secao) {
  document.querySelectorAll(".secao").forEach((el) => el.classList.remove("ativa"));
  document.getElementById(secao).classList.add("ativa");
}

window.onload = () => navegar("dashboard");
