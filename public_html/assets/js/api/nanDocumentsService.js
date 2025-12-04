// api/nanDocumentsService.js

import { apiRequest } from "./apiClient.js";

export async function fetchNanDocuments(taskId) {
  try {
    const queryParams = {
      taskId: Number(taskId),
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/nandocuments?query=${encodeURIComponent(queryString)}`;

    // console.log('Формируемый URL:', url);

    const response = await apiRequest(url);
    // console.log('Ответ от сервера:', response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе для fetchNanDocuments:", error);
    return null;
  }
}
