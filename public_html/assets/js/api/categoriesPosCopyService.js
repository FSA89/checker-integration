// api/categoriesPosCopyService.js
import { apiRequest } from "./apiClient.js";

export async function fetchCategoriesPosCopyService(
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
      date: nextsunday,
      title: selectedSegment,
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/category/category-pos-copy?query=${encodeURIComponent(
      queryString
    )}`;

    const response = await apiRequest(url);
    // console.log("Ответ от сервера categoriesPosCopyService:", response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе документов интеграции:", error);
    return null;
  }
}
