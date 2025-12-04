// services/categoriesRenderer.js
export function renderCategories(data) {
  if (!data || !Array.isArray(data.data)) {
    console.error("Ожидался массив данных, но получен:", data);
    return;
  }

  // console.log("Результат агрегации документов интеграции:", data.data);
}
