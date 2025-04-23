import { initHomeLogic } from "./addItemsCart.js";
const baseUrl =
  "https://ecommercejs-backend-site.onrender.com/products" ||
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

      // Preenche o HTML com os dados do produto, incluindo as opções dinâmicas
      itemDiv.className = "col-md-4 col-lg-3 mb-4";
      itemDiv.id = "item"; // precisa ter esse ID pro script funcionar

      itemDiv.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image_url}" class="card-img-top" alt="${product.name}" style="object-fit: contain; width: 100%; height: 250px;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">
            Nome: <span id="product">${product.name}</span>
          </h5>
          <p class="card-text text-muted">
            Descrição: <span id="description">${product.description}</span>
          </p>
          <p class="mb-1 text-success fw-bold fs-5">
            <span class="text-muted fs-6 align-top">R$</span> <span id="amount">${product.price}</span>
          </p>
          <p class="mb-1 text-secondary" style="font-size: 0.9rem;">
            em até <span class="text-primary">12x no cartão</span>
          </p>
          <p class="mb-3 text-danger fw-semibold" style="font-size: 0.9rem;">
            Promoção disponível por tempo limitado!
          </p>
          <p class="mb-3">
            <strong>Tamanho:</strong> <span id="size">${product.size_name}</span>
          </p>
          <button class="btn btn-primary mt-auto" id="button" type="button" name="btn${product.id}">
            Adicionar ao Carrinho
          </button>
        </div>
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
