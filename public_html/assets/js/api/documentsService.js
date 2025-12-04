// api/documentsService.js

import { apiRequest } from "./apiClient.js";

export async function fetchDocuments(domainid, taskId) {
  try {
    const queryParams = {
      domainId: Number(domainid),
      taskId: Number(taskId),
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/documents?query=${encodeURIComponent(queryString)}`;

    // console.log('Формируемый URL:', url);

    const response = await apiRequest(url);
    // console.log('Ответ от сервера:', response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе для даты и интеграции:", error);
    return null;
  }
}
