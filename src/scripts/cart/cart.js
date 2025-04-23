const divContainer = document.getElementById("carrinho");
let baseUrl =
  "https://ecommercejs-backend-site.onrender.com/products" ||
  "http://localhost:5501/products";

baseUrl.trim();
async function fetchProductData(name) {
  const response = await fetch(`${baseUrl}/${encodeURIComponent(name)}`);

  if (response.ok) {
    const data = await response.json();
    const result = data.products;
    renderCart(result);
  } else {
    console.error("Erro ao buscar os dados do produto:", response.statusText);
  }
}

function getNameProduct() {
  const itens = localStorage.getItem("product");
  if (itens) {
    const parseItens = JSON.parse(itens);
    parseItens.map(async (nameItem) => {
      fetchProductData(nameItem);
    });
  }
}

function renderCart(products) {
  products.map((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "col-md-6 col-lg-4";
    itemDiv.id = "item";

    let quantityOptions = "";
    for (let i = 1; i <= product.quantity; i++) {
      quantityOptions += `<option value="${i}">${i}</option>`;
    }

    itemDiv.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image_url}" class="card-img-top" style="object-fit: contain; height: 200px; width: 100%;" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title"><span id="product">${product.name}</span></h5>
          <p class="card-text"><strong>Descrição:</strong> <span id="description">${product.description}</span></p>
          <p class="card-text"><strong>Valor:</strong> R$ <span id="amount">${product.price}</span></p>
          <p class="card-text"><strong>Tamanho:</strong> <span id="size">${product.size_name}</span></p>

          <div class="mb-3">
            <label for="quantity" class="form-label"><strong>Quantidade:</strong></label>
            <select id="quantity" class="form-select">${quantityOptions}</select>
          </div>

          <button class="btn btn-danger mt-auto" id="btnr" type="button">Remover Item do Carrinho</button>
        </div>
      </div>
    `;

    divContainer.appendChild(itemDiv);
  });

  deleteItens();
}

function deleteItens() {
  const buttons = [...document.querySelectorAll("#btnr")];
  const items = [...document.querySelectorAll("#item")];

  buttons.map((btn, i) => {
    btn.addEventListener("click", () => {
      // Remove o item do array de produtos
      const nameProduct =
        items[i].querySelector('span[id="product"]').textContent;
      items[i].remove();
      const products = localStorage.getItem("product");
      if (products) {
        const namesInLocalstorage = JSON.parse(products);
        const resultNames = namesInLocalstorage.filter(
          (name) => name !== nameProduct
        );
        localStorage.setItem("product", JSON.stringify(resultNames));
      }
    });
  });
}

getNameProduct();
