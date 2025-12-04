document.addEventListener("DOMContentLoaded", function () {
    FusionCharts.ready(function () {
        var chart = new FusionCharts({
            type: "msspline",
            renderAt: "tables-chart__1",
            width: "100%",
            height: "400",
            dataFormat: "json",
            dataSource: {
                chart: {
                    caption: "Средняя позиция",
                    yAxisName: "Позиция",
                    scrollHeight: 3,
                    scrollPadding: 10,
                    theme: "fusion",
                    legendPosition: "top",
                    canvasTopPadding: "10",
                    canvasBottomPadding: "10"
                },
                categories: [
                    {
                        category: JSON.parse(chartData.dates).map(p => ({ label: p.date }))
                    }
                ],
                dataset: [
                    {
                        seriesname: "Яндекс без внедрения",
                        data: alignData(JSON.parse(chartData.dates), JSON.parse(chartData.documents_integrations_agg).filter(p => p.search_engine === 'yandex' && p.integrated_group === null))
                    },
                    {
                        seriesname: "Гугл без внедрения",
                        data: alignData(JSON.parse(chartData.dates), JSON.parse(chartData.documents_integrations_agg).filter(p => p.search_engine === 'google' && p.integrated_group === null))
                    },
                    {
                        seriesname: "Яндекс с внедрением",
                        data: alignData(JSON.parse(chartData.dates), JSON.parse(chartData.documents_integrations_agg).filter(p => p.search_engine === 'yandex' && p.integrated_group === 1))
                    },
                    {
                        seriesname: "Гугл с внедрением",
                        data: alignData(JSON.parse(chartData.dates), JSON.parse(chartData.documents_integrations_agg).filter(p => p.search_engine === 'google' && p.integrated_group === 1))
                    },
                    {
                        seriesname: "Выбранное внедрение",
                        drawline: "1",
                        renderAs: "scatter",
                        parentYAxis: "S",
                        data: alignData(JSON.parse(chartData.dates), JSON.parse(chartData.dates_one_integration)),
                        anchorShape: "polygon",
                        showValues: "0",
                        anchorSides: "5",
                        anchorRadius: "8",
                        anchorBgColor: "#FF0000"
                    },
                    {
                        seriesname: "Другие внедрения",
                        drawline: "0",
                        renderAs: "scatter",
                        parentYAxis: "S",
                        data: alignData(JSON.parse(chartData.dates), JSON.parse(chartData.dates_integrations)),
                        anchorShape: "polygon",
                        showValues: "0",
                        anchorSides: "3",
                        anchorRadius: "8",
                        anchorBgColor: "#026e04"
                    }
                ]
            }
        });
        chart.render();
    });

    function alignData(dates, data) {
        if (!dates || !data) {
            console.error("Dates or data are undefined");
            return [];
        }
        const dataMap = new Map(data.map(item => [item.date, item.position_avg || null]));
        return dates.map(date => ({
            value: dataMap.get(date.date) || null
        }));
    }
});



document.addEventListener("DOMContentLoaded", function () {
    // Подсчет записей
    const records = document.querySelectorAll('.tables-page__string').length;
    const recordsElement = document.querySelector('.tables-page__records');

    if (recordsElement) {
        function getRecordWord(count) {
            if (count === 1) {
                return 'Запись';
            } else if (count >= 2 && count <= 4) {
                return 'Записи';
            } else {
                return 'Записей';
            }
        }

        recordsElement.innerHTML = '';
        const numberSpan = document.createElement('span');
        numberSpan.textContent = records;

        const wordSpan = document.createElement('span');
        wordSpan.textContent = getRecordWord(records);

        recordsElement.appendChild(numberSpan);
        recordsElement.appendChild(wordSpan);
    }

    // Поиск по записям
    const searchInput = document.querySelector('#search');
    const rows = document.querySelectorAll('.tables-page__string');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();

            rows.forEach(function (row) {
                const firstPole = row.querySelector('.tables-page__pole');
                if (firstPole) {
                    const text = firstPole.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    }
});
