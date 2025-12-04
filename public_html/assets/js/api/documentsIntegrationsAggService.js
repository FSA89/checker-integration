// api/documentsIntegrationsAggService.js
import { apiRequest } from "./apiClient.js";

export async function fetchDocumentsIntegrationsAgg(
  taskId,
  nextsunday,
  domainid,
  regionId,
  isMobile
) {
  try {
    const queryParams = {
      taskId: Number(taskId),
      nextsunday,
      domainid: Number(domainid),
      regionId: Number(regionId),
      isMobile,
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/documentsintegrations?query=${queryString}`;

    // console.log('Формируемый URL:', url);

    const response = await apiRequest(url);
    // console.log('Ответ от сервера:', response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе документов интеграции:", error);
    return null;
  }
}
