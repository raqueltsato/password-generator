document.addEventListener("DOMContentLoaded", () => {
  const rangeInput = document.querySelector(".input-range");
  const textInput = document.querySelector(".input-typed");
  const weakBox = document.querySelector(".weak");
  const mediumBox = document.querySelector(".medium");
  const strongBox = document.querySelector(".strong");
  const passwordText = document.querySelector(".password-text");

  textInput.value = rangeInput.value;

  rangeInput.addEventListener("input", () => {
    textInput.value = rangeInput.value;
  });

  const generatePassword = document.getElementById("generate-new-password");

  function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const permitionCharsGroup = [
      includeUppercase && uppercaseChars,
      includeLowercase && lowercaseChars,
      includeNumbers && numberChars,
      includeSymbols && symbolChars,
    ].filter(Boolean);

    let password = "";

    const allCharsAvailable = permitionCharsGroup.join();

    for (const group of permitionCharsGroup) {
      const randomIndex = Math.floor(Math.random() * group.length);
      password += group[randomIndex];
    }
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allCharsAvailable.length);
      password += allCharsAvailable[randomIndex];
    }

    passwordText.textContent = password;
  }

  generatePassword.addEventListener("click", () => {
    const numberOfCharacters = document.querySelector(".input-typed").value;
    const rangeValue = document.querySelector(".input-range").value;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;
    generateRandomPassword(numberOfCharacters, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    if ([includeUppercase, includeLowercase, includeNumbers, includeSymbols].every(Boolean)) {
      weakBox.classList.add("green");
      mediumBox.classList.add("green");
      strongBox.classList.add("green");
    }
  });
});
