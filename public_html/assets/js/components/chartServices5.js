// components/chartServices5.js

import { chart3Graffic } from "./chart3Graffic.js";
import { alignCatVisit } from "./alignCatVisit.js";

export function renderChart5(
  dates,
  integrationTitle,
  integrationDataNextSunday,
  datesOneIntegration,
  datesIntegration,
  responseCategoriesPosCopy,
  documentsTable,
  selectedSegment
) {
  // console.log("dates ", dates, "datesOneIntegration ", datesOneIntegration);

  const otherIntegrations = datesIntegration.data;
  const selectedCategory = selectedSegment.selectedCategory;

  const yandexVisits = alignCatVisit(
    dates,
    responseCategoriesPosCopy.filter((p) => p.search_engine === "yandex")
  );
  const googleVisits = alignCatVisit(
    dates,
    responseCategoriesPosCopy.filter((p) => p.search_engine === "google")
  );

  const integrationPositions = chart3Graffic(
    integrationTitle,
    integrationDataNextSunday,
    datesOneIntegration
  );

  const filteredOtherIntegrationsData = datesIntegration.data.filter(
    (p) => p.titles !== null || p.cnt_integrations !== null
  );

  const validDatesSet = new Set(
    filteredOtherIntegrationsData.map((p) => p.date)
  );
  dates = dates.filter((d) => validDatesSet.has(d.date));

  // const otherIntegrationsWithNames = otherIntegrations.map((p) => {
  //   const integrationName = p.titles || "Неизвестное внедрение";
  //   return {
  //     x: p.date,
  //     y: p.cnt_integrations,
  //     integrationName,
  //   };
  // });

  // console.log(
  //   "filteredOtherIntegrationsData  и dates",
  //   filteredOtherIntegrationsData,
  //   dates
  // );

  const otherIntegrationsWithNames = filteredOtherIntegrationsData.map((p) => ({
    x: p.date,
    y: p.cnt_integrations,
    integrationName: p.titles || "Неизвестное внедрение",
  }));

  // const allDates = [
  //   ...yandexVisits.map((p) => p.date),
  //   ...googleVisits.map((p) => p.date),
  //   ...integrationPositions.map((p) => p.date),
  //   ...otherIntegrationsWithNames.map((p) => p.x),
  // ].filter((date, index, self) => self.indexOf(date) === index);

  const validDatesOnly = new Set(dates.map((d) => d.date));

  const allDates = [
    ...yandexVisits.map((p) => p.date),
    ...googleVisits.map((p) => p.date),
    ...integrationPositions.map((p) => p.date),
    ...otherIntegrationsWithNames.map((p) => p.x),
  ]
    .filter((date, index, self) => self.indexOf(date) === index) // Убираем дубли
    .filter((date) => validDatesOnly.has(date)); // Фильтруем по нужным датам

  allDates.sort((a, b) => new Date(a) - new Date(b));

  // console.log("allDates ", allDates);

  const mapDataToDates = (
    sourceData,
    dateField = "date",
    valueField = "value"
  ) => {
    const dataMap = {};
    sourceData.forEach((item) => {
      dataMap[item[dateField]] = item[valueField];
    });

    return allDates.map((date) => dataMap[date] || null);
  };

  const chartDom = document.getElementById("tables-chart__5");
  if (window.chartInstance5) {
    window.chartInstance5.dispose();
  }
  const myChart = echarts.init(chartDom);
  window.chartInstance5 = myChart;

  const maxVisits = Math.max(
    ...yandexVisits.map((p) => p.value),
    ...googleVisits.map((p) => p.value),
    0
  );

  const option = {
    title: {
      text: "Количество визитов " + selectedCategory,
      left: "center",
      top: 30,
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        const date = params[0].name;
        const seriesData = params
          .map((item) => {
            if (item.seriesType === "scatter") return "";
            const value = item.data;
            if (value == null) return "";
            return `${item.seriesName}: <strong>${value}</strong>`;
          })
          .filter(Boolean)
          .join("<br>");
        return `Дата: ${date}<br>${seriesData}`;
      },
    },
    legend: [
      {
        top: 50,
        left: "center",
        itemGap: 12,
        data: ["Яндекс (визиты)", "Google (визиты)"],
        padding: [30, 0, 0, 0],
        textStyle: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
      {
        top: 70,
        left: "center",
        itemGap: 12,
        data: [integrationTitle + " " + integrationDataNextSunday],
        padding: [30, 0, 0, 0],
        textStyle: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
      {
        top: 90,
        left: "center",
        itemGap: 12,
        data: ["Другие внедрения"],
        selected: {
          "Другие внедрения": false,
        },
        padding: [30, 0, 0, 0],
        textStyle: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    ],
    grid: {
      top: 150,
      left: 60,
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "Дата",
      nameLocation: "start",
      nameGap: 20,
      data: allDates,
      axisLabel: {
        interval: 0,
        rotate: 85,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "В среднем визитов за неделю",
      nameLocation: "middle",
      nameGap: 40,
      nameRotate: 90,
      axisLabel: {
        fontSize: 12,
      },
      min: 0,
      max: maxVisits + 1,
      interval: 1,
    },
    series: [
      {
        name: "Яндекс (визиты)",
        type: "bar",
        data: mapDataToDates(yandexVisits),
        itemStyle: {
          color: "#7d0736",
        },
        barWidth: "40%",
      },
      {
        name: "Google (визиты)",
        type: "bar",
        data: mapDataToDates(googleVisits),
        itemStyle: {
          color: "#4c6eaf",
        },
        barWidth: "40%",
      },
      {
        name: integrationTitle + " " + integrationDataNextSunday,
        type: "line",
        // data: mapDataToDates(integrationPositions),
        data: mapDataToDates(integrationPositions).map((item) =>
          item === 1 ? 0.05 : item
        ),
        lineStyle: {
          color: "#FF0000",
          type: "dashed",
        },
        symbol: "diamond",
        symbolSize: 11,
        itemStyle: {
          color: "#FF0000",
        },
      },
      {
        name: "Другие внедрения",
        type: "scatter",
        data: otherIntegrationsWithNames.map((p) => ({
          name: p.integrationName,
          // value: p.y,
          value: p.y === 1 ? 0.05 : p.y,
          x: p.x,
        })),
        symbol: "triangle",
        symbolSize: 11,
        itemStyle: {
          color: "#026e04",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            const title = params.name || "Неизвестное внедрение";
            const formattedTitle =
              title.length > 40 ? title.replace(/(.{40})/g, "$1<br>") : title;
            return `
              <strong>Другие внедрения</strong><br>
              Внедрения: <div style="max-width: 350px; word-wrap: break-word; white-space: normal;">${formattedTitle}</div><br>
              Дата: ${params.data.x}<br>
              Количество внедрений: ${params.data.value || 0}`;
          },
        },
        emphasis: {
          focus: "series",
        },
      },
    ],
  };

  myChart.setOption(option);
}
