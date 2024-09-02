import { getFormDataUser } from "./validatesData.js";
const container = document.getElementById("carrinho");

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
  const sizes = [...document.querySelectorAll("#size")];
  const descriptions = [...document.querySelectorAll("#description")];

  let objetoItens = products.map((product, index) => {
    return {
      product: product.textContent,
      amount: Number(amounts[index].textContent),
      quantity: Number(quantitys[index].value),
      description: descriptions[index].textContent,
      size: sizes[index].textContent,
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
  console.log(data);
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
    container.innerText = "";
    localStorage.removeItem("product");

    // Redireciona para o link fornecido pela resposta
    window.location.href = result.init_point;
  } catch (error) {
    console.error("Erro:", error);
  }
}
