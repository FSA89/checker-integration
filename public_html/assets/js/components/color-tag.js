// components/color-tag.js

export function colorTag() {
  const tagColors = {
    "создание новой коммерческой страницы": {
      backgroundColor: "white",
      color: "rgb(0, 188, 212)",
      borderColor: "rgb(0, 188, 212)",
    },
    "создание новой информационной страницы": {
      backgroundColor: "white",
      color: "rgb(139, 195, 74)",
      borderColor: "rgb(139, 195, 74)",
    },
    "изменение мета-тегов": {
      backgroundColor: "white",
      color: "rgb(205, 220, 57)",
      borderColor: "rgb(205, 220, 57)",
    },
    "текстовая доработка": {
      backgroundColor: "white",
      color: "rgb(0, 150, 136)",
      borderColor: "rgb(0, 150, 136)",
    },
    "технические доработки": {
      backgroundColor: "white",
      color: "rgb(205, 220, 57)",
      borderColor: "rgb(205, 220, 57)",
    },
    "добавление функционала для удобства пользователя": {
      backgroundColor: "white",
      color: "rgb(139, 195, 74)",
      borderColor: "rgb(139, 195, 74)",
    },
    "добавление визуального контента": {
      backgroundColor: "white",
      color: "rgb(205, 220, 57)",
      borderColor: "rgb(205, 220, 57)",
    },
    "on-page оптимизация": {
      backgroundColor: "white",
      color: "rgb(0, 188, 212)",
      borderColor: "rgb(0, 188, 212)",
    },
    "работа с внутренней перелинковкой": {
      backgroundColor: "white",
      color: "rgb(205, 220, 57)",
      borderColor: "rgb(205, 220, 57)",
    },
    "вндрение словаря косинусной близости с перелинковкой": {
      backgroundColor: "white",
      color: "rgb(205, 220, 57)",
      borderColor: "rgb(205, 220, 57)",
    },
    "закупка ссылок": {
      backgroundColor: "white",
      color: "rgb(76, 175, 80)",
      borderColor: "rgb(76, 175, 80)",
    },
    другое: {
      backgroundColor: "white",
      color: "rgb(33, 150, 243)",
      borderColor: "rgb(33, 150, 243)",
    },
    "весь сайт": {
      backgroundColor: "white",
      color: "rgb(244, 67, 54)",
      borderColor: "rgb(244, 67, 54)",
    },
    "⚠️ без тега": {
      backgroundColor: "white",
      color: "rgb(244, 67, 54)",
      borderColor: "rgb(244, 67, 54)",
    },
  };

  function applyBackgroundColorToTag(tag) {
    const text = tag.textContent.trim().toLowerCase();
    const style = tagColors[text];

    if (style) {
      tag.style.backgroundColor = style.backgroundColor;
      tag.style.color = style.color;
      tag.style.border = `1px solid ${style.borderColor}`;
    } else {
      // fallback к случайному цвету, если тег не задан вручную
      tag.style.backgroundColor = getRandomLightColor();
    }
  }

  function getRandomLightColor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return `rgb(${r + 128}, ${g + 128}, ${b + 128})`;
  }

  function applyBackgroundColorToTags(tags) {
    tags.forEach((tag) => {
      applyBackgroundColorToTag(tag);
    });
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList" || mutation.type === "subtree") {
        const addedTags = mutation.addedNodes;
        addedTags.forEach((node) => {
          if (
            node.nodeType === 1 &&
            node.classList.contains("graff-tag__text")
          ) {
            applyBackgroundColorToTag(node);
          }
        });
      }
    });
  });

  const graffCont = document.querySelector(".graff-cont");
  if (graffCont) {
    observer.observe(graffCont, { childList: true, subtree: true });
  }

  const initialTags = document.querySelectorAll(".graff-tag__text");
  applyBackgroundColorToTags(initialTags);

  function reloadTagsAfterDataLoad() {
    const newTags = document.querySelectorAll(".graff-tag__text");
    applyBackgroundColorToTags(newTags);
  }

  reloadTagsAfterDataLoad();
}
