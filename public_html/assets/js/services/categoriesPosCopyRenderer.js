// services/categoriesPosCopyRenderer.js
export function renderCategoriesPosCopy(data) {
  // Если data - это объект, а не массив, выведем структуру
  if (!data || (typeof data !== "object" && !Array.isArray(data))) {
    console.error("Ожидался массив данных, но получен:", data);
    return;
  }

  // if (Array.isArray(data)) {
  //   // console.log("Результат агрегации документов интеграции:", data);
  // } else {
  //   console.error("Ожидался массив, но получен объект:", data);
  // }
}
