const colorPicker = document.getElementById("colorPicker");
const colorValue = document.getElementById("colorValue");
const statusText = document.getElementById("statusText");
const resetButton = document.getElementById("resetButton");
const swatches = document.querySelectorAll(".swatch");
const parts = document.querySelectorAll(".part");
const initialColors = new Map();

function getCurrentColor() {
  return colorPicker.value.toUpperCase();
}

function setStatus(text) {
  statusText.textContent = text;
}

function setColor(colorHex) {
  const upperColor = colorHex.toUpperCase();
  colorPicker.value = upperColor;
  colorValue.textContent = upperColor;

  swatches.forEach((swatch) => {
    const swatchColor = swatch.dataset.color.toUpperCase();
    swatch.classList.toggle("active", swatchColor === upperColor);
  });
}

parts.forEach((part) => {
  initialColors.set(part, part.getAttribute("fill"));
});

colorPicker.addEventListener("input", () => {
  setColor(colorPicker.value);
});

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    setColor(swatch.dataset.color);
    setStatus(`Выбран цвет ${getCurrentColor()}`);
  });
});

resetButton.addEventListener("click", () => {
  parts.forEach((part) => {
    part.classList.remove("selected");
    part.setAttribute("fill", initialColors.get(part));
  });
  setStatus("Цвета сброшены до исходных");
});

setColor(colorPicker.value);

parts.forEach((part) => {
  part.addEventListener("mouseenter", () => {
    const name = part.dataset.name;
    setStatus(`Навели на: ${name}`);
  });

  part.addEventListener("mouseleave", () => {
    setStatus("Деталь не выбрана");
  });

  part.addEventListener("click", () => {
    parts.forEach((item) => item.classList.remove("selected"));
    part.classList.add("selected");

    const selectedColor = getCurrentColor();
    part.setAttribute("fill", selectedColor);

    const name = part.dataset.name;
    setStatus(`${name} окрашен в ${selectedColor}`);
  });
});
