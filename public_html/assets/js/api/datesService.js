// api/datesService.js

import { apiRequest } from "./apiClient.js";

export async function fetchDates(dates) {
  const queryString = `{"date":"${dates}"}`;
  const url = `/api/dates?query=${encodeURIComponent(queryString)}`;

  try {
    const response = await apiRequest(url);
    // console.log("==> Ответ от сервера fetchDates:", response);
    return response;
  } catch (error) {
    console.error("Ошибка при выполнении fetchDates:", error);
    throw error;
  }
}
