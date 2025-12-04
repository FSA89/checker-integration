// api/devicesService.js

import { apiRequest } from './apiClient.js';

export async function fetchDevices(domainId) {
    const queryString = `{"id":${domainId}}`;

    const url = `/api/devices?query=${encodeURIComponent(queryString)}`;

    // console.log('Сформированный url ', url);

    return await apiRequest(url);
}
