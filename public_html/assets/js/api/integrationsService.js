// api/integrationsService.js

import { apiRequest } from "./apiClient.js";

export async function fetchIntegrations(domainId) {
  const queryString = `{"id":${domainId}}`;
  const url = `/api/integrations?query=${encodeURIComponent(queryString)}`;

  return await apiRequest(url);
}
