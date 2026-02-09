const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const generateBtn = document.getElementById("genbtn");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+{}[]<>?";

const copyBtn = document.getElementById("copybtn");

copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard.writeText(passwordInput.value);

  copyBtn.textContent = "✅";
  setTimeout(() => {
    copyBtn.textContent = "📋";
  }, 1000);
});

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", () => {
  const length = Number(lengthSlider.value);
  passwordInput.value = generatePassword(length);
});

function generatePassword(length) {
  let allowedChars = "";
  let passwordArray = [];

  if (uppercaseCheckbox.checked) {
    allowedChars += UPPERCASE;
    passwordArray.push(randomChar(UPPERCASE));
  }

  if (lowercaseCheckbox.checked) {
    allowedChars += LOWERCASE;
    passwordArray.push(randomChar(LOWERCASE));
  }

  if (numbersCheckbox.checked) {
    allowedChars += NUMBERS;
    passwordArray.push(randomChar(NUMBERS));
  }

  if (symbolsCheckbox.checked) {
    allowedChars += SYMBOLS;
    passwordArray.push(randomChar(SYMBOLS));
  }

  if (allowedChars.length === 0) {
    return "Select at least one option";
  }

  while (passwordArray.length < length) {
    passwordArray.push(randomChar(allowedChars));
  }

  shuffle(passwordArray);

  return passwordArray.join("");
}

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}