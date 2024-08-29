import { initHomeLogic } from "./addItemsCart.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("container");
  const selectCategorie = document.getElementById("categories"); // Se é um único select, use getElementById

  // Função para buscar produtos
  async function fetchProducts(categoryName = "") {
    const queryParams = categoryName
      ? `?category_name=${encodeURIComponent(categoryName)}`
      : "";
    const response = await fetch(
      `http://localhost:5501/products${queryParams}`
    );
    const data = await response.json();
    const products = data.products;

    // Limpar o container antes de adicionar os produtos
    container.innerHTML = "";

    // Renderiza os produtos dinamicamente
    products.forEach((product) => {
      const itemDiv = document.createElement("div");
      itemDiv.id = "item";

      // Gera as opções de quantidade dinamicamente
      let quantityOptions = "";
      for (let i = 1; i <= product.quantity; i++) {
        quantityOptions += `<option value="${i}">${i}</option>`;
      }

      // Preenche o HTML com os dados do produto, incluindo as opções dinâmicas
      itemDiv.innerHTML = `
            <div>
              <input type="text" id="product" name="${product.name}" value="${product.name}" readonly><br>
              <img class="img" src="${product.image_url}" alt="${product.name}">
            </div>

            <div>
              <label for="description">Descrição:</label>
              <input type="text" id="description" value="${product.description}" readonly>
            </div>
          
            <span>
              <label for="amount">Valor:</label>
              <input id="amount" type="text" value="${product.price}" readonly>
            </span>
          
            <select name="quantidade" id="quantity" class="notrender">
              ${quantityOptions}
            </select>
            
            <div>
              <label for="size">Tamanho:</label>
              <input type="text" id="size" name="${product.size_name}" value="${product.size_name}" readonly><br>
            </div>

            <button id="button" type="button" name="btn${product.id}">Adicionar ao Carrinho</button>
          `;

      container.appendChild(itemDiv);
    });

    // Após renderizar os produtos, inicializa o home.js
    initHomeLogic(); // Função para inicializar a lógica do carrinho
  }

  // Inicializa com todos os produtos
  fetchProducts();

  // Adiciona o listener para mudanças no select
  selectCategorie.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    fetchProducts(selectedCategory);
  });
});
