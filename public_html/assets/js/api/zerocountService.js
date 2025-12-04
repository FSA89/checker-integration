// api/zerocountService.js
import { apiRequest } from "./apiClient.js";

export function fetchZerocount() {
  return apiRequest("/api/integrations/zerocount");
}
