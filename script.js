function validaCPF() {
  const cpfFormatado = document.getElementById("cpf").value;

  const cpf = limpaFormatacao(cpfFormatado);
  if (cpf.length !== 11) {
    alert("CPF deve conter 11 dígitos.");
    return;
  }
  if (verificaDigitosRepetidos(cpf)) {
    mostraResultado("CPF não pode conter repetição do mesmo dígito.", "red");
    return;
  }
  const digito1 = calcularDigitoVerificador(cpf, 1);
  const digito2 = calcularDigitoVerificador(cpf, 2);

  if (
    digito1 === parseInt(cpf.charAt(9)) &&
    digito2 === parseInt(cpf.charAt(10))
  ) {
    mostraResultado("CPF válido.", "green");
  } else {
    mostraResultado("CPF inválido.", "red");
  }
}

function calcularDigitoVerificador(cpf, posicao) {
  const sequencia = cpf.slice(0, 9 + posicao);
  const multiplicador = posicao === 1 ? 10 : 11;
  const soma = sequencia
    .split("")
    .map((digito, index) => parseInt(digito) * (multiplicador - index))
    .reduce((acumulador, valor) => acumulador + valor, 0);
  const resto = soma % 11;

  return resto < 2 ? 0 : 11 - resto;
}

function limpaFormatacao(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return cpf;
}

function mostraResultado(texto, cor) {
  const span = document.getElementById("resultado");
  span.innerHTML = texto;
  span.style.color = cor;
}

function verificaDigitosRepetidos(cpf) {
  return cpf.split("").every((digito) => digito === cpf[0]);
}

var cpf = "123.456.789-00";
if (validarCPF(cpf)) {
  console.log("CPF válido!");
} else {
  console.log("CPF inválido!");
}
