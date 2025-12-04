// services/datesIntegrationRenderer.js

export function renderDatesIntagration(dates) {
    if (!dates || !Array.isArray(dates.data)) {
        console.error('Ожидался массив устройств внутри data, но получен:', dates);
        return;
    }

    dates.data.forEach(date => {

    });


}
