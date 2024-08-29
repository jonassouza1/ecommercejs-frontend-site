export function getFormDataUser() {
  // Obtém e limpa os valores dos campos do formulário
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const street_number =
    document.getElementById("street_number").value.trim() || null;
  const floor = document.getElementById("floor").value.trim() || "";
  const apartment = document.getElementById("apartment").value.trim() || "";
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const zip = document.getElementById("zip").value.trim();
  const country_name =
    document.getElementById("country_name").value.trim() || null;

  // Expressões regulares para validação
  const nameRegex = /^[a-zA-Z\s]+$/; // Nome pode conter apenas letras e espaços
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validação básica de e-mail
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; // Formato brasileiro com DDD: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
  const zipRegex = /^\d{5}-\d{3}$/; // Exemplo de validação para CEP no formato XXXXX-XXX

  // Verifica se os campos obrigatórios estão preenchidos
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !street_number ||
    !city ||
    !state ||
    !zip
  ) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return null;
  }

  // Valida o nome
  if (!nameRegex.test(name)) {
    alert("O nome deve conter apenas letras e espaços.");
    return null;
  }

  // Valida o e-mail
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return null;
  }
  // Valida o número de telefone
  if (!phoneRegex.test(phone)) {
    alert("Por favor, insira um número de telefone válido.");
    return null;
  }

  // Valida o CEP
  if (!zipRegex.test(zip)) {
    alert("O CEP deve estar no formato XXXXX-XXX.");
    return null;
  }

  // Valida o número da rua
  const streetNumberValue = Number(street_number);
  if (street_number && isNaN(streetNumberValue)) {
    alert("O campo 'Número da Rua' deve ser um número.");
    return null;
  }

  // Retorna os dados validados
  return {
    name,
    email,
    phone,
    address,
    street_number: streetNumberValue,
    floor,
    apartment,
    city,
    state,
    zip,
    country_name,
  };
}
document.addEventListener("DOMContentLoaded", function () {
  zip.addEventListener("input", function (event) {
    let value = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5, 8);
    }

    event.target.value = value;
  });
});
