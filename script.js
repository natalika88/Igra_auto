const colorPicker = document.getElementById("colorPicker");
const colorValue = document.getElementById("colorValue");
const statusText = document.getElementById("statusText");
const parts = document.querySelectorAll(".part");

function getCurrentColor() {
  return colorPicker.value.toUpperCase();
}

function setStatus(text) {
  statusText.textContent = text;
}

colorPicker.addEventListener("input", () => {
  colorValue.textContent = getCurrentColor();
});

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
