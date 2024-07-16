let calculationString = "";
let calculationHistory = []; 
const maxHistoryItems = 8;
const input = document.querySelector(".input");

const icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "images/sun.png";
  } else {
    icon.src = "images/moon.png";
  }
};

function updateInputAndHistory() {
  document.querySelector("input").value = calculationString;
  localStorage.setItem(
    "calculationHistory",
    JSON.stringify(calculationHistory)
  );
  updateHistoryList(); 
}

const savedCalculationHistory = localStorage.getItem("calculationHistory");
if (savedCalculationHistory) {
  calculationHistory = JSON.parse(savedCalculationHistory);
  updateHistoryList();
  
}

function updateHistoryList() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = ""; 

  calculationHistory.forEach((calculation) => {
    const listItem = document.createElement("li");
    listItem.textContent = calculation;
    historyList.appendChild(listItem);
  });
}

let buttons = document.querySelectorAll(".button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      calculate();
    } else if (e.target.innerHTML == "C") {
      calculationString = "";
      updateInputAndHistory();
    } else if (e.target.innerHTML == "←") {
      calculationString = calculationString.slice(
        0,
        calculationString.length - 1
      );
      updateInputAndHistory();
    } else {
      calculationString += e.target.innerHTML;
      updateInputAndHistory();
    }
  });
});

function calculate() {
  calculationString = input.value;
  try {
    if (calculationString && calculationString.match(/[+\-*\/]/g)) {
      let result = eval(calculationString);
      calculationHistory.push(`${calculationString} = ${result}`);
      calculationString = result.toString();
      updateInputAndHistory();
    }
  } catch (e) {
    input.value = "";
    input.classList.add("shake"); 
    setTimeout(() => {
      input.classList.remove("shake"); 
    }, 500);
  }
}

input.addEventListener("keydown", function (e) {
  if (!isValid(e.key)) {
    input.classList.add("shake"); 
    setTimeout(() => {
      input.classList.remove("shake"); 
    }, 500);
    e.preventDefault();
  }
  if (e.key == "Enter") {
    calculate();
  }
});

function isValid(key) {
  return (
    !isNaN(parseFloat(key)) ||
    ["+", "-", "*", "/", "=", "Enter", "Backspace", "Shift", "."].includes(key)
  );
}

const clearBtn = document.querySelector(".clearHistory");
clearBtn.addEventListener("click", function (e) {
  localStorage.clear();
  calculationHistory = [];
  clearHistory("history-list");
});
function clearHistory(parentId) {
  const parent = document.querySelector(`#${parentId}`);
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
  if (e.key == "Enter") {
    calculate();
  }
}

function isValid(key) {
  return (
    !isNaN(parseFloat(key)) ||
    ["+", "-", "*", "/", "=", "Enter", "Backspace", "Shift", "."].includes(key)
  );
}

