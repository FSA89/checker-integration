// api/categoriesService.js
import { apiRequest } from "./apiClient.js";

export async function fetchCategories(
  taskId,
  domainid,
  regionId,
  isMobile,
  categoryId,
  nextsunday
) {
  try {
    const queryParams = {
      taskId: Number(taskId),
      domainid: Number(domainid),
      regionId: Number(regionId),
      isMobile,
      categoryId,
      nextsunday,
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/category/categories?query=${queryString}`;

    // console.log('Формируемый URL:', url);

    const response = await apiRequest(url);
    console.log("Ответ от сервера:", response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе документов интеграции:", error);
    return null;
  }
}
