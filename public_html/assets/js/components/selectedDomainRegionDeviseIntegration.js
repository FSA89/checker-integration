// components/selectedDomain.js

export function selectDomains() {
  const dropdown = document.getElementById("dropdownDomen");
  const button = document.getElementById("buttonDomen");
  const menu = document.getElementById("menuDomen");

  if (!dropdown || !button || !menu) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("active");
    menu.style.display = dropdown.classList.contains("active")
      ? "block"
      : "none";
  });

  document.addEventListener("click", (event) => {
    setTimeout(() => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
        menu.style.display = "none";
      }
    }, 10);
  });
}
