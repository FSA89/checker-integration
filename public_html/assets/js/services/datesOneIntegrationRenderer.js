// services/datesOneIntegrationRenderer.js
export function renderDatesOneIntegration(data) {
    if (!data || !Array.isArray(data.data)) {
        console.error("Ожидался массив данных, но получен:", data);
        return;
    }

    // console.log("Результат для даты и интеграции:", data.data);
}
