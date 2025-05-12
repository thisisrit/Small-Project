const options = document.querySelectorAll(".option");
const totalEl = document.getElementById("total");

function createSelectors(pairCount) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pairCount; i++) {
    const row = document.createElement("div");
    row.classList.add("selectors");

    const size = document.createElement("select");
    ["S", "M", "L"].forEach((s) => {
      const opt = document.createElement("option");
      opt.textContent = s;
      size.appendChild(opt);
    });

    const color = document.createElement("select");
    ["Colour", "Red", "Blue"].forEach((c) => {
      const opt = document.createElement("option");
      opt.textContent = c;
      color.appendChild(opt);
    });

    row.appendChild(size);
    row.appendChild(color);
    fragment.appendChild(row);
  }
  return fragment;
}

function updateTotal(selectedOption) {
  const price = parseFloat(selectedOption.dataset.price);
  totalEl.textContent = `DKK ${price.toFixed(2)}`;
}

function activateOption(selectedOption) {
  const isActive = selectedOption.classList.contains("active");

  options.forEach((option) => {
    option.classList.remove("active");
    option.querySelector('input[type="radio"]').checked = false;
  });

  if (!isActive) {
    selectedOption.classList.add("active");
    selectedOption.querySelector('input[type="radio"]').checked = true;
    updateTotal(selectedOption);
  } else {
    totalEl.textContent = "DKK 0.00";
  }
}

function initOptions() {
  options.forEach((option) => {
    const pairCount = parseInt(option.dataset.pairs);
    const container = option.querySelector(".selector-container");
    container.innerHTML = "";
    container.appendChild(createSelectors(pairCount));

    const header = option.querySelector(".option-header");
    header.addEventListener("click", () => activateOption(option));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initOptions();
  updateTotal(document.querySelector(".option.active"));
});
