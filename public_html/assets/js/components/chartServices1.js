// components/chartServices1.js

import { alignData } from "./alignData.js";
import { alignDataChartPositions } from "./alignDataChartPositions.js";

export function renderChart1(
  dates,
  documentIntegrationAgg,
  integrationTitleDate,
  datesOneIntegration,
  integrationTitle,
  integrationDataNextSunday,
  datesIntegration
) {
  // console.log("dates ", dates);

  const yandexWithoutIntegration = alignData(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "yandex" && p.integrated_group === null
    )
  );
  const googleWithoutIntegration = alignData(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "google" && p.integrated_group === null
    )
  );
  const yandexWithIntegration = alignData(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "yandex" && p.integrated_group === 1
    )
  );
  const googleWithIntegration = alignData(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "google" && p.integrated_group === 1
    )
  );
  const integrationPositions = alignDataChartPositions(
    dates,
    datesOneIntegration,
    integrationTitle,
    integrationDataNextSunday
  );

  // console.log("integrationPositions ", integrationPositions, dates);

  const testing = integrationPositions.map((p) => ({
    value: p.value,
    name: p.date,
  }));

  // const otherIntegrations = alignData(dates, datesIntegration.data);

  // const otherIntegrationsData = datesIntegration.data;

  // Фильтруем только валидные внедрения — с не null title или cnt_integrations
  const filteredOtherIntegrationsData = datesIntegration.data;
  // .filter(
  //   (p) => p.titles !== null || p.cnt_integrations !== null
  // );

  const validDatesSet = new Set(
    filteredOtherIntegrationsData.map((p) => p.date)
  );
  dates = dates.filter((d) => validDatesSet.has(d.date));

  // console.log("filteredOtherIntegrationsData ", filteredOtherIntegrationsData);
  // console.log("validDatesSet ", validDatesSet);
  // console.log("dates ", dates);

  // Передаём уже отфильтрованные данные

  // const otherIntegrationsWithNames = otherIntegrationsData.map((p) => ({
  //   x: p.date,
  //   y: p.cnt_integrations,
  //   integrationName: p.titles || "Неизвестное внедрение",
  // }));

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

  const chartDom = document.getElementById("tables-chart__1");

  if (window.chartInstance1) {
    window.chartInstance1.dispose();
  }

  const myChart = echarts.init(chartDom);
  window.chartInstance1 = myChart;

  const option = {
    title: {
      text: "Средняя позиция",
      left: "center",
      top: 30,
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const date = params[0].name;

        const seriesData = params
          .map((item) => {
            if (item.value == null) {
              return "";
            }

            const seriesName = item.seriesName;
            const value =
              item.value !== null
                ? parseFloat(item.value).toFixed(1)
                : "нет данных";

            return `${seriesName}: <strong>${value}</strong>`;
          })
          .filter((item) => item !== "")
          .join("<br>");

        if (seriesData) {
          return `Дата: ${date}<br>${seriesData}`;
        } else {
          return "";
        }
      },
    },
    legend: [
      {
        top: 50,
        left: "center",
        itemGap: 12,
        data: ["Яндекс без внедрения", "Гугл без внедрения"],
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
        data: ["Яндекс с внедрением", "Гугл с внедрением"],
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
        data: [integrationTitleDate],
        padding: [30, 0, 0, 0],
        textStyle: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
      {
        top: 110,
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
      top: 170,
      left: "5%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "Дата",
      nameLocation: "start",
      nameGap: 20,
      data: dates.map((p) => p.date),
      axisLabel: {
        interval: 0,
        rotate: 85,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "Позиция",
      nameLocation: "middle",
      nameGap: 40,
      nameRotate: 90,
      axisLabel: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Яндекс без внедрения",
        type: "line",
        data: yandexWithoutIntegration.map((p) => p.value),
        smooth: true,
        lineStyle: { color: "#FF5733" },
        symbolSize: 8,
      },
      {
        name: "Гугл без внедрения",
        type: "line",
        data: googleWithoutIntegration.map((p) => p.value),
        smooth: true,
        lineStyle: { color: "#33FF57" },
        symbolSize: 8,
      },
      {
        name: "Яндекс с внедрением",
        type: "line",
        data: yandexWithIntegration.map((p) => p.value),
        smooth: true,
        lineStyle: { color: "#3380FF" },
        symbolSize: 8,
      },
      {
        name: "Гугл с внедрением",
        type: "line",
        data: googleWithIntegration.map((p) => p.value),
        smooth: true,
        lineStyle: { color: "#FF33F6" },
        symbolSize: 8,
      },
      {
        name: integrationTitleDate,
        type: "line",
        // data: integrationPositions.map((p) => p.value),
        data: integrationPositions.map((p) => ({
          value: p.value,
          name: p.date,
        })),
        lineStyle: { color: "#FF0000", type: "dashed" },
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
          value: p.y,
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
              Внедрения: <div style="max-width: 350px; word-wrap: break-word; white-space: normal;">${formattedTitle}</div>
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
