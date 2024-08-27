import { getFormDataUser } from "./user.js";

const form = document.getElementById("checkout-form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Previne o envio automático do formulário

  const formData = getFormDataUser(); // Obtém os dados do formulário

  if (!formData) {
    return; // Se os dados do formulário não estiverem completos, interrompe a execução
  }

  const amounts = [...document.querySelectorAll("#amount")];
  const products = [...document.querySelectorAll("#product")];
  const quantitys = [...document.querySelectorAll("#quantity")];

  let objetoItens = products.map((product, index) => {
    return {
      product: product.value,
      amount: amounts[index].value,
      quantity: quantitys[index].value,
    };
  });

  if (objetoItens.length === 0) {
    alert("Adicione itens ao carrinho antes de comprar.");
    return;
  }

  const data = {
    items: objetoItens,
    formData, // Adiciona os dados do formulário ao objeto de dados
  };

  fetchDate(data);
});

async function fetchDate(data) {
  try {
    const fetchDate = await fetch("http://localhost:5501/createpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!fetchDate.ok) {
      throw new Error(`Erro na requisição: ${fetchDate.status}`);
    }

    const result = await fetchDate.json();

    // Redireciona para o link fornecido pela resposta
    window.location.href = result.init_point;
  } catch (error) {
    console.error("Erro:", error);
  }
}
