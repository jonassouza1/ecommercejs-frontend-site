const item = [...document.querySelectorAll("#item")];
const button = [...document.querySelectorAll("#button")];

let arrayItens = JSON.parse(localStorage.getItem("product")) || [];

// Atualiza o número de itens no ícone do carrinho na inicialização
getDatesCart();

button.map((el, i) => {
  el.addEventListener("click", () => {
    if (!arrayItens.includes(item[i].outerHTML)) {
      arrayItens.push(item[i].outerHTML);
      addProducts(arrayItens);
      getDatesCart(); // Atualiza o ícone após adicionar o item
    } else {
      return;
    }
  });
});

function addProducts(products) {
  if (products) {
    localStorage.setItem("product", JSON.stringify(products));
  }
}

function getDatesCart() {
  const cart = document.getElementById("valuecart");

  // Usa o comprimento do array `arrayItens` para definir o número de itens
  const itensInCart = arrayItens.length;

  cart.innerText = itensInCart;
}

// Atualiza o ícone do carrinho sempre que a página é carregada
document.addEventListener("DOMContentLoaded", getDatesCart);
