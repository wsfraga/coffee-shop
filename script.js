const produtos = [
  { nome: "Café Clássico", preco: 29.9 },
  { nome: "Café Premium", preco: 49.9 },
  { nome: "Café Gelado", preco: 19.9 },
  { nome: "Café Especial", preco: 59.9 },
  { nome: "Café Orgânico", preco: 54.9 },
  { nome: "Café Gourmet", preco: 64.9 },
  { nome: "Café Descafeinado", preco: 34.9 },
  { nome: "Café com Leite", preco: 14.9 },
  { nome: "Cappuccino", preco: 24.9 },
  { nome: "Latte", preco: 27.9 },
  { nome: "Mocha", preco: 31.9 },
  { nome: "Espresso", preco: 9.9 },
  { nome: "Espresso Duplo", preco: 14.9 },
  { nome: "Cold Brew", preco: 22.9 },
  { nome: "Frappuccino", preco: 28.9 },
  { nome: "Café com Canela", preco: 26.9 },
  { nome: "Café com Baunilha", preco: 29.9 },
  { nome: "Café Caramelo", preco: 32.9 },
  { nome: "Café Chocolate", preco: 35.9 },
  { nome: "Café Especial Premium", preco: 79.9 }
];

const container = document.querySelector(".produtos");

function mostrarProdutos(lista) {
  container.innerHTML = ""

  lista.forEach((produto) => {
    const divProduto = document.createElement("div");

    divProduto.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
    `;

    divProduto.classList.add("produto");

    if (produto.preco > 50) {
      divProduto.classList.add("caro");
    }

    container.appendChild(divProduto);
  });
}

mostrarProdutos(produtos);

const input = document.querySelector(".input-busca");
const botaoDeFiltrar = document.querySelector(".btn-filtrar");
const ordenar = document.querySelector(".ordenar");
let filtrado = false;

function atualizarLista() {
  let listaAtual = produtos;

  const valor = input.value.trim();

  if (valor) {
    const produtosFiltradosPorNome = listaAtual.filter((produto) => {
      return produto.nome.toLocaleLowerCase().includes(valor.toLocaleLowerCase());
    })

    listaAtual = produtosFiltradosPorNome;
  }

  if (filtrado) {
    const produtoFiltrado = listaAtual.filter((produto) => {
      return produto.preco > 50;
    })
    botaoDeFiltrar.innerText = "Mostrar todos"

    listaAtual = produtoFiltrado;
  } else {
    botaoDeFiltrar.innerText = "Mostrar os caros"
  }

  function ordemDosProdutos() {
    const ordemSelecionada = ordenar.value;

    if (ordemSelecionada === "menor") {
      listaAtual = listaAtual.toSorted((a, b) => a.preco - b.preco);
    } else if (ordemSelecionada === "maior") {
      listaAtual = listaAtual.toSorted((a, b) => b.preco - a.preco);
    } else if (ordemSelecionada === "az") {
      listaAtual = listaAtual.toSorted((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    } else if (ordemSelecionada === "za") {
      listaAtual = listaAtual.toSorted((a, b) => b.nome.localeCompare(a.nome, "pt-BR"));
    }
  }

  ordemDosProdutos(listaAtual);
  mostrarProdutos(listaAtual);
}

input.addEventListener("input", atualizarLista);

ordenar.addEventListener("change", atualizarLista);

botaoDeFiltrar.addEventListener("click", () => {
  filtrado = !filtrado;
  atualizarLista();
});