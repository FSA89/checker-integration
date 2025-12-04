// api/weeklymetricsService.js
import { apiRequest } from "./apiClient.js";

export async function fetchWeeklymetricsService(
  username,
  department,
  tagvalue,
  startdate,
  enddate
) {
  try {
    const queryParams = {
      username,
      department,
      tagvalue,
      startdate,
      enddate,
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/v1/weeklymetrics?query=${encodeURIComponent(
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
