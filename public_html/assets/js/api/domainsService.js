// api/domainsService.js
import { apiRequest } from "./apiClient.js";

export function fetchDomains() {
    return apiRequest("/api/domains");
}
