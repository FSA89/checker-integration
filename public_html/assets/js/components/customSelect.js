// components/customSelect.js

export class CustomSelect {
  static counter = 1;

  constructor(selectId) {
    this.select = document.getElementById(selectId);
    this.uniqueId = `unic-${CustomSelect.counter++}`;
    this.createCustomDropdown();
    this.bindEvents();
  }

  createCustomDropdown() {
    this.select.style.display = "none";

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("custom-select-wrapper");
    this.wrapper.id = this.uniqueId;

    this.select.parentNode.insertBefore(this.wrapper, this.select);
    this.wrapper.appendChild(this.select);

    this.dropdown = document.createElement("div");
    this.dropdown.classList.add("custom-dropdown");

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add("custom-select-button");
    this.button.textContent = this.select.options[0]?.textContent || "Выберите";

    this.dropdown.appendChild(this.button);

    this.dropdownContent = document.createElement("div");
    this.dropdownContent.classList.add("custom-dropdown-content");
    this.dropdownContent.style.display = "none";

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Поиск...";
    this.dropdownContent.appendChild(this.input);

    this.ul = document.createElement("ul");
    this.dropdownContent.appendChild(this.ul);

    this.dropdown.appendChild(this.dropdownContent);
    this.wrapper.appendChild(this.dropdown);

    this.populateList();
  }

  populateList() {
    this.ul.innerHTML = "";

    [...this.select.options].forEach((option) => {
      if (option.disabled) return;

      const li = document.createElement("li");
      li.textContent = option.textContent;
      li.dataset.value = option.value;

      [...option.attributes].forEach((attr) => {
        if (attr.name.startsWith("data-")) {
          li.setAttribute(attr.name, attr.value);
        }
      });

      this.ul.appendChild(li);
    });
  }

  bindEvents() {
    this.button.addEventListener("click", () => {
      const isOpen = this.dropdownContent.style.display === "block";

      // Закрыть все открытые выпадающие списки
      document
        .querySelectorAll(".custom-select-button.active")
        .forEach((btn) => {
          btn.classList.remove("active");
          const content = btn
            .closest(".custom-select-wrapper")
            ?.querySelector(".custom-dropdown-content");
          if (content) content.style.display = "none";
        });

      if (!isOpen) {
        this.dropdownContent.style.display = "block";
        this.button.classList.add("active");
        this.input.focus();
      } else {
        this.dropdownContent.style.display = "none";
        this.button.classList.remove("active");
      }
    });

    this.input.addEventListener("input", () => {
      const term = this.input.value.toLowerCase();

      // Если строка поиска пустая, показываем все элементы
      if (term === "") {
        [...this.ul.querySelectorAll("li")].forEach((li) => {
          li.style.display = "block"; // Показываем все li
        });
      } else {
        // Иначе, скрываем элементы, которые не соответствуют поисковому запросу
        [...this.ul.querySelectorAll("li")].forEach((li) => {
          li.style.display = li.textContent.toLowerCase().includes(term)
            ? "block"
            : "none";
        });
      }
    });

    this.ul.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "li") {
        const value = e.target.dataset.value;
        this.select.value = value;
        this.button.textContent = e.target.textContent;
        this.select.dispatchEvent(new Event("change"));
        this.dropdownContent.style.display = "none";
        this.button.classList.remove("active");
        this.input.value = "";
      }
    });

    document.addEventListener("click", (e) => {
      const isClickInside = this.wrapper.contains(e.target);

      if (!isClickInside) {
        this.dropdownContent.style.display = "none";
        this.button.classList.remove("active");
      }
    });

    this.select.addEventListener("change", () => {
      this.button.textContent =
        this.select.options[this.select.selectedIndex]?.textContent ||
        "Выбрать";
    });
  }

  refresh() {
    this.populateList();

    this.select.selectedIndex = 0;
    this.button.textContent = this.select.options[0]?.textContent || "Выберите";
  }
}
