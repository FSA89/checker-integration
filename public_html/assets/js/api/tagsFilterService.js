// api/tagsFilterService.js

import { apiRequest } from "./apiClient.js";

export async function fetchTagsFilter(domainid, tagValue) {
  try {
    const queryParams = {
      domainId: Number(domainid),
      tagValue: tagValue,
    };

    const queryString = JSON.stringify(queryParams);

    const url = `/api/integrations/tagsfilter?query=${encodeURIComponent(
      queryString
    )}`;

    const response = await apiRequest(url);
    // console.log('Ответ от сервера:', response);

    return response;
  } catch (error) {
    console.error("Ошибка при запросе для даты и интеграции:", error);
    return null;
  }
}
