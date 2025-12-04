// components/search-tag.js

class TagSearch {
  constructor({ inputId, suggestionsId, clearBtnId }) {
    this.input = document.getElementById(inputId);
    this.suggestions = document.getElementById(suggestionsId);
    this.clearBtn = document.getElementById(clearBtnId);

    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener("input", () => this.onInput());
    this.input.addEventListener("focus", () => this.updateSuggestions(""));

    this.clearBtn.addEventListener("click", () => this.clearInput());

    document.addEventListener("click", (e) => {
      if (
        !this.input.contains(e.target) &&
        !this.suggestions.contains(e.target)
      ) {
        this.suggestions.style.display = "none";
      }
    });

    this.suggestions.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "li") {
        this.input.value = e.target.textContent;
        this.suggestions.style.display = "none";
        this.input.dispatchEvent(new Event("input"));
      }
    });
  }

  onInput() {
    const inputValue = this.input.value.trim().toLowerCase();
    this.clearBtn.style.display = inputValue ? "inline" : "none";

    const containers = this.getTagContainers();

    containers.forEach((container) => {
      const tags = container.querySelectorAll(".graff-tag__text");
      const matchFound = Array.from(tags).some((tag) =>
        tag.textContent.trim().toLowerCase().includes(inputValue)
      );

      container.style.display = inputValue
        ? matchFound
          ? "block"
          : "none"
        : "block";
    });

    this.updateSuggestions(inputValue);
  }

  clearInput() {
    this.input.value = "";
    this.clearBtn.style.display = "none";
    this.input.dispatchEvent(new Event("input"));
  }

  getTags() {
    const tagElements = document.querySelectorAll(".graff-tag__text");
    const tagsSet = new Set();

    tagElements.forEach((el) => {
      const text = el.textContent.trim();
      if (text) tagsSet.add(text);
    });

    return [...tagsSet];
  }

  getTagContainers() {
    const tagElements = document.querySelectorAll(".graff-tag__text");
    const containers = new Set();

    tagElements.forEach((tagEl) => {
      const container = tagEl.closest(".graff-cont");
      if (container) containers.add(container);
    });

    return containers;
  }

  updateSuggestions(filter = "") {
    const tags = this.getTags().filter((tag) =>
      tag.toLowerCase().includes(filter)
    );

    this.suggestions.innerHTML = "";

    if (tags.length === 0) {
      this.suggestions.style.display = "none";
      return;
    }

    tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      this.suggestions.appendChild(li);
    });

    this.suggestions.style.display = "block";
  }
}

class TagSearchRemote extends TagSearch {
  constructor(config, remoteTags) {
    super(config);
    this.remoteTags = remoteTags || [];
  }

  getTags() {
    return this.remoteTags;
  }

  getTagContainers() {
    // При серверном сценарии, возможно, контейнеров на странице нет
    return new Set(); // Переопределяем, если не нужно скрытие блоков
  }

  onInput() {
    // Только обновление подсказок, без взаимодействия с DOM-блоками
    const inputValue = this.input.value.trim().toLowerCase();
    this.clearBtn.style.display = inputValue ? "inline" : "none";
    this.updateSuggestions(inputValue);
  }
}

// Инициализация

// Сценарий 1: локальные теги
const tagSearch = new TagSearch({
  inputId: "tag",
  suggestionsId: "tag-suggestions",
  clearBtnId: "clear-btn",
});

// Сценарий 2: теги с сервера
// const tagSearchRemote = new TagSearchRemote({
//   inputId: "tag",
//   suggestionsId: "tag-suggestions",
//   clearBtnId: "clear-btn"
// }, ["Art", "Business", "Coding", "Design"]);
