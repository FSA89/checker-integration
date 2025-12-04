// api/tagsListService.js

import { apiRequest } from "./apiClient.js";

export async function fetchTagsList(domainId) {
  // console.log("1 domainId", domainId);

  const queryString = `{"domainId":${domainId}}`;
  const url = `/api/tags/list?query=${encodeURIComponent(queryString)}`;

  return await apiRequest(url);
}
