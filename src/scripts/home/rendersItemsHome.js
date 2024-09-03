import { initHomeLogic } from "./addItemsCart.js";
const baseUrl =
  "https://ecommercejs-backend-site.vercel.app/products" ||
  "http://localhost:5501/products";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container");
  const selectCategorie = document.getElementById("categories"); // Se é um único select, use getElementById

  // Função para buscar produtos
  async function fetchProducts(categoryName = "") {
    const queryParams = categoryName
      ? `?category_name=${encodeURIComponent(categoryName)}`
      : "";
    const response = await fetch(`${baseUrl}${queryParams}`);
    const data = await response.json();
    const products = data.products;

    // Limpar o container antes de adicionar os produtos
    container.innerHTML = "";

    // Renderiza os produtos dinamicamente
    products.forEach((product) => {
      const itemDiv = document.createElement("div");
      itemDiv.id = "item";

      // Gera as opções de quantidade dinamicamente

      // Preenche o HTML com os dados do produto, incluindo as opções dinâmicas
      itemDiv.innerHTML = `
     <div>
        <img class="img" src="${product.image_url}" alt="${product.name}">
      </div>
      <div>
        <strong>Nome:</strong> <span id="product">  ${product.name} </span>
      </div>
      <div>
        <strong>Descrição:</strong> <span id="description">  ${product.description} </span>
      </div>
      <div>
        <strong>Valor:</strong> <span id="amount">  ${product.price} </span>
      </div>
      <div>
        <strong>Tamanho:</strong> <span id="size">  ${product.size_name} </span>
      </div>
      <div>
        <button id="button" type="button" name="btn${product.id}">Adicionar ao Carrinho</button>
      </div>
            
          `;

      container.appendChild(itemDiv);
      initHomeLogic();
    });

    // Após renderizar os produtos, inicializa o home.js
    // Função para inicializar a lógica do carrinho
  }

  // Inicializa com todos os produtos
  fetchProducts();

  // Adiciona o listener para mudanças no select
  selectCategorie.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    fetchProducts(selectedCategory);
  });
});
