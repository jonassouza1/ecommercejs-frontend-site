const divContainer = document.getElementById("carrinho");
let baseUrl =
  "https://ecommercejs-backend-site.vercel.app/products" ||
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
    itemDiv.id = "item";

    let quantityOptions = "";
    for (let i = 1; i <= product.quantity; i++) {
      quantityOptions += `<option value="${i}">${i}</option>`;
    }

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
      <label><strong>Quantidade:</strong></label>
      <select name="quantidade" id="quantity" >
              ${quantityOptions}
      </select>
      <div>
        <strong>Tamanho:</strong> <span id="size">  ${product.size_name} </span>
      </div>
      <div>
        <button class="btnremove" id="btnr" type="button">Remover Item do Carrinho</button>
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
