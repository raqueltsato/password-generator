document.addEventListener("DOMContentLoaded", () => {
  const rangeInput = document.querySelector(".input-range");
  const textInput = document.querySelector(".input-typed");
  const weakBox = document.querySelector(".weak");
  const mediumBox = document.querySelector(".medium");
  const strongBox = document.querySelector(".strong");
  const passwordText = document.querySelector(".password-text");
  const generatePasswordButtons = document.querySelectorAll(".generate-new-password");

  textInput.value = rangeInput.value;

  rangeInput.addEventListener("input", () => {
    textInput.value = rangeInput.value;
  });

  function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const requirementsPassword = [includeUppercase, includeLowercase, includeNumbers, includeSymbols];
    if (requirementsPassword.every((requirement) => !Boolean(requirement))) return;

    let forcePoint = requirementsPassword.reduce((accPoint, requirement) => {
      let point = accPoint;
      if (!!requirement) {
        point += 2;
      }
      return point;
    }, 0);

    if (Number(length) === 7) {
      forcePoint += 1;
    }
    if (Number(length) > 7 && length <= 8) {
      forcePoint += 2;
    }
    if (Number(length) >= 9 && length <= 16) {
      forcePoint += 3;
    }
    if (Number(length) >= 17) {
      forcePoint += 4;
    }

    if (forcePoint <= 5) {
      weakBox.classList.remove("green");
      mediumBox.classList.remove("green");
      strongBox.classList.remove("green");

      weakBox.classList.remove("yellow");
      mediumBox.classList.remove("yellow");

      weakBox.classList.add("red");
    }

    if (forcePoint >= 6 && forcePoint <= 7) {
      weakBox.classList.remove("green");
      mediumBox.classList.remove("green");
      strongBox.classList.remove("green");

      weakBox.classList.remove("red");
      mediumBox.classList.remove("red");
      strongBox.classList.remove("red");

      weakBox.classList.remove("green");
      weakBox.classList.remove("green");

      weakBox.classList.add("yellow");
      mediumBox.classList.add("yellow");
    }

    if (forcePoint >= 8) {
      weakBox.classList.add("green");
      mediumBox.classList.add("green");
      strongBox.classList.add("green");
    }

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

  generatePasswordButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const numberOfCharacters = document.querySelector(".input-typed").value;
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
});
