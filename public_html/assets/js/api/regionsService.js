// api/regionsService.js

import { apiRequest } from "./apiClient.js";

export async function fetchRegions(domainId) {
  const queryString = `{"id":${domainId}}`;
  const url = `/api/regions?query=${encodeURIComponent(queryString)}`;

  // console.log('Сформированный url ', url);

  return await apiRequest(url);
}
