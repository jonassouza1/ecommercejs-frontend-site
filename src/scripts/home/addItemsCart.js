export function initHomeLogic() {
  const buttons = [...document.querySelectorAll("#button")];
  const items = [...document.querySelectorAll("#item")];

  let arrayItens = JSON.parse(localStorage.getItem("product")) || [];

  // Atualiza o número de itens no ícone do carrinho na inicialização
  getDatesCart();

  buttons.map((el, i) => {
    el.addEventListener("click", () => {
      if (!arrayItens.includes(items[i].outerHTML)) {
        arrayItens.push(items[i].outerHTML);
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
    const itensInCart = arrayItens.length;
    cart.innerText = itensInCart;
  }

  // Atualiza o ícone do carrinho sempre que a página é carregada
  document.addEventListener("DOMContentLoaded", getDatesCart);
}
