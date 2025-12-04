// api/datesIntegrationService.js

import { apiRequest } from "./apiClient.js";

export async function fetchDatesIntegration(dates, domainid) {
  try {
    const queryParams = {
      date: dates,
      domainId: Number(domainid),
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/datesintegrations?query=${encodeURIComponent(
      queryString
    )}`;

    const response = await apiRequest(url);
    // console.log("Ответ от сервера fetchDatesIntegration:", response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе для даты и интеграции:", error);
    return null;
  }
}
