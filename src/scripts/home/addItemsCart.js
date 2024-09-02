export function initHomeLogic() {
  const buttons = [...document.querySelectorAll("#button")];
  const items = [...document.querySelectorAll("#item")];

  // Tenta carregar os itens do carrinho do localStorage, ou inicializa um array vazio
  let arrayItens = JSON.parse(localStorage.getItem("product")) || [];

  // Atualiza o número de itens no ícone do carrinho na inicialização
  getDatesCart();

  buttons.map((el, i) => {
    el.addEventListener("click", () => {
      const nameProduct =
        items[i].querySelector('span[id="product"]').textContent;
      if (!arrayItens.includes(nameProduct)) {
        arrayItens.push(nameProduct);
        addProducts(arrayItens);
        getDatesCart(); // Atualiza o ícone após adicionar o item
      }
    });
  });

  function addProducts(products) {
    if (products !== undefined) {
      localStorage.setItem("product", JSON.stringify(products));
    }
  }

  function getDatesCart() {
    const cart = document.getElementById("valuecart");
    const itensInCart = localStorage.getItem("product");

    if (itensInCart) {
      try {
        const items = JSON.parse(itensInCart);
        cart.innerText = items.length;
      } catch (error) {
        console.error("Erro ao analisar o JSON: ", error);
        cart.innerText = 0;
      }
    } else {
      cart.innerText = 0;
    }
  }

  // Atualiza o ícone do carrinho sempre que a página é carregada
  document.addEventListener("DOMContentLoaded", getDatesCart);
}
