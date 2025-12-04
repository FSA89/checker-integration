// api/categoriesPosService.js
import { apiRequest } from "./apiClient.js";

export async function fetchCategoriesPosService(
  domainid,
  regionId,
  isMobile,
  nextsunday,
  selectedSegment
) {
  try {
    const queryParams = {
      domainId: Number(domainid),
      regionId: Number(regionId),
      isMobile,
      title: selectedSegment,
      date: nextsunday,
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/category/category-pos?query=${encodeURIComponent(
      queryString
    )}`;

    const response = await apiRequest(url);
    // console.log("Ответ от сервера categoriesPosService:", response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе документов интеграции:", error);
    return null;
  }
}
