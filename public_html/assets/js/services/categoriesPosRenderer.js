// services/categoriesPosRenderer.js
export function renderCategoriesPos(data) {
  if (!data || (typeof data !== "object" && !Array.isArray(data))) {
    console.error("Ожидался массив данных, но получен:", data);
    return;
  }

  // if (Array.isArray(data)) {

  // } else {
  //   console.error("Ожидался массив, но получен объект:", data);
  // }
}
