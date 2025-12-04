// api/datesOneIntegrationService.js
import { apiRequest } from "./apiClient.js";

export async function fetchDatesOneIntegration(nextsunday, domainid, taskId) {
  try {
    const queryParams = {
      date: nextsunday,
      domainId: Number(domainid),
      taskId: Number(taskId),
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/datesoneintegration?query=${encodeURIComponent(
      queryString
    )}`;

    const response = await apiRequest(url);
    // console.log("Ответ от сервера fetchDatesOneIntegration:", response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе для даты и интеграции:", error);
    return null;
  }
}
