// services/nanDocumentsRenderer.js

export function renderNanDocuments(data) {
    if (!data || !Array.isArray(data.data)) {
        console.error('Ожидался массив устройств внутри data, но получен:', data);
        return;
    }
}
