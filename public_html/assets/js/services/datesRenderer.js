// services/datesRenderer.js

export function renderDates(dates) {
    if (!dates || !Array.isArray(dates.data)) {
        console.error('Ожидался массив устройств внутри data, но получен:', dates);
        return;
    }

    dates.data.forEach(date => {

    });


}
