const form = document.getElementById("formulario");
const tabela = document.querySelector("#tabela tbody");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function calcularStatus(validade) {
  const hoje = new Date();
  const dataVal = new Date(validade);
  const diffDias = Math.ceil((dataVal - hoje) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return "vencido";
  if (diffDias <= 3) return "proximo";
  return "ok";
}

function getClasseStatus(status) {
  if (status === "vencido") return "status-vencido";
  if (status === "proximo") return "status-proximo";
  return "status-ok";
}

function renderizarTabela() {
  tabela.innerHTML = "";
  produtos.forEach((p, index) => {
    const status = calcularStatus(p.validade);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.produto}</td>
      <td>${p.fabricacao}</td>
      <td>${p.validade}</td>
      <td class="${getClasseStatus(status)}">${status.toUpperCase()}</td>
      <td><button class="deletar" onclick="deletar(${index})">Excluir</button></td>
    `;
    tabela.appendChild(tr);
  });
}

function deletar(index) {
  produtos.splice(index, 1);
  salvar();
  renderizarTabela();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const produto = document.getElementById("produto").value;
  const fabricacao = document.getElementById("fabricacao").value;
  const validade = document.getElementById("validade").value;

  produtos.push({ produto, fabricacao, validade });
  salvar();
  renderizarTabela();

  form.reset();
});

renderizarTabela();
