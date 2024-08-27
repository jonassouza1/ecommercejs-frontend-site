const divContainer = document.getElementById("carrinho");

function getProduct() {
  const itens = localStorage.getItem("product");

  if (itens) {
    const parseItens = JSON.parse(itens);
    renderCart(parseItens);
  }
}

function renderCart(products) {
  // Limpa o conteúdo atual do carrinho
  divContainer.innerHTML = "";

  // Re-renderiza os itens do carrinho
  products.map((el, i) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
      ${el}
      <button class="btnremove" id="btnr" type="button">Remover Item do Carrinho</button>
    `;

    divContainer.appendChild(productDiv);
  });

  // Reaplica a função deleteItens para os novos botões renderizados
  deleteItens(products);
}

function deleteItens(products) {
  const buttons = [...document.querySelectorAll("#btnr")];

  buttons.map((btn, i) => {
    btn.addEventListener("click", () => {
      // Remove o item do array de produtos
      products.splice(i, 1);

      // Atualiza o localStorage
      localStorage.setItem("product", JSON.stringify(products));

      // Re-renderiza o carrinho
      renderCart(products);
    });
  });
}

getProduct();
