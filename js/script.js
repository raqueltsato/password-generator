document.addEventListener("DOMContentLoaded", () => {
  const rangeInput = document.querySelector(".input-range");
  const textInput = document.querySelector(".input-typed");
  const weakBox = document.querySelector(".weak");
  const mediumBox = document.querySelector(".medium");
  const strongBox = document.querySelector(".strong");
  const passwordText = document.querySelector(".password-text");
  const generatePasswordButtons = document.querySelectorAll(".generate-new-password");
  const copyButton = document.querySelector(".copy-button");

  textInput.value = rangeInput.value;

  rangeInput.addEventListener("input", () => {
    textInput.value = rangeInput.value;
  });

  function generateRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const requirementsPassword = [includeUppercase, includeLowercase, includeNumbers, includeSymbols];
    if (requirementsPassword.every((requirement) => !Boolean(requirement))) return;

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

    const allCharsAvailable = permitionCharsGroup.join("");

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

  function calculatepasswordStrength(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const requirementsPassword = [includeUppercase, includeLowercase, includeNumbers, includeSymbols];
    let forcePoint = requirementsPassword.reduce((accPoint, requirement) => {
      let point = accPoint;
      if (!!requirement) {
        point += 2;
      }
      return point;
    }, 0);

    const lengthPoints = {
      7: 1,
      8: 2,
      9: 3,
      10: 3,
      11: 3,
      12: 3,
      13: 3,
      14: 3,
      15: 3,
      16: 3,
    };

    const getPointsForLength = lengthPoints[length] || (length >= 17 ? 4 : 0);

    forcePoint += getPointsForLength;

    const updateClasses = (forcePoint) => {
      const classMap = {
        low: {
          range: forcePoint <= 5,
          add: { weakBox: ["red"] },
        },
        medium: {
          range: forcePoint >= 6 && forcePoint <= 7,
          add: { weakBox: ["yellow"], mediumBox: ["yellow"] },
        },
        high: {
          range: forcePoint >= 8,
          add: { weakBox: ["green"], mediumBox: ["green"], strongBox: ["green"] },
        },
      };

      [weakBox, mediumBox, strongBox].forEach((box) => {
        box.classList.remove("green", "yellow", "red");
      });

      for (const key in classMap) {
        if (classMap[key].range) {
          const { add = {} } = classMap[key];

          Object.keys(add).forEach((boxId) => {
            const classesToAdd = add[boxId];
            const box = {
              weakBox,
              mediumBox,
              strongBox,
            }[boxId];
            classesToAdd.forEach((cls) => box.classList.add(cls));
          });
          break;
        }
      }
    };

    updateClasses(forcePoint);
  }

  copyButton.addEventListener("click", () => {
    const passwordCopied = document.querySelector(".password-text");
    if (passwordCopied.textContent) {
      navigator.clipboard.writeText(passwordCopied.textContent);
    }
  });

  generatePasswordButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const numberOfCharacters = document.querySelector(".input-typed").value;
      const includeUppercase = document.getElementById("uppercase").checked;
      const includeLowercase = document.getElementById("lowercase").checked;
      const includeNumbers = document.getElementById("numbers").checked;
      const includeSymbols = document.getElementById("symbols").checked;
      generateRandomPassword(numberOfCharacters, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
      calculatepasswordStrength(numberOfCharacters, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    });
  });
});
