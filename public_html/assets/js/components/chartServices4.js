// components/chartServices4.js

import { alignCatPos } from "./alignCatPos.js";
import { chart3Graffic } from "./chart3Graffic.js";

export function renderChart4(
  dates,
  integrationTitle,
  integrationDataNextSunday,
  datesOneIntegration,
  datesIntegration,
  responseCategoriesPosCopy,
  selectedSegment
) {
  const selectedCategory = selectedSegment.selectedCategory;

  const yandexWithoutIntegration = alignCatPos(
    dates,
    responseCategoriesPosCopy.filter((p) => p.search_engine === "yandex")
  );
  const googleWithoutIntegration = alignCatPos(
    dates,
    responseCategoriesPosCopy.filter((p) => p.search_engine === "google")
  );

  const integrationPositions = chart3Graffic(
    integrationTitle,
    integrationDataNextSunday,
    datesOneIntegration
  );

  // const otherIntegrationsData = datesIntegration.data;

  // const otherIntegrationsWithNames = otherIntegrationsData.map((p) => ({
  //   x: p.date,
  //   y: p.cnt_integrations,
  //   integrationName: p.titles || "Неизвестное внедрение",
  // }));

  const filteredOtherIntegrationsData = datesIntegration.data;
  // .filter(
  //   (p) => p.titles !== null || p.cnt_integrations !== null
  // );

  const validDatesSet = new Set(
    filteredOtherIntegrationsData.map((p) => p.date)
  );
  dates = dates.filter((d) => validDatesSet.has(d.date));

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

  const chartDom = document.getElementById("tables-chart__4");
  if (window.chartInstance4) {
    window.chartInstance4.dispose();
  }
  const myChart = echarts.init(chartDom);
  window.chartInstance4 = myChart;

  const option = {
    title: {
      text: "Средняя позиция " + selectedCategory,
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
            const value = item.data?.y;
            if (value == null) return "";
            const formattedValue = Number(value).toFixed(1); // округление до 1 знака
            return `${item.seriesName}: <strong>${formattedValue}</strong>`;
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
        data: ["Яндекс", "Google"],
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

    // legend: {
    //   top: 50,
    //   itemGap: 12,
    //   data: [
    //     "Яндекс",
    //     "Google",
    //     integrationTitle + " " + integrationDataNextSunday,
    //     "Другие внедрения",
    //   ],
    //   selected: {
    //     "Другие внедрения": false,
    //   },
    //   padding: [30, 0, 0, 0],
    // },
    grid: {
      top: 150,
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
        name: "Яндекс",
        type: "line",
        data: yandexWithoutIntegration.map((p) => ({
          value: p.value,
          y: p.value,
        })),
        smooth: true,
        lineStyle: { color: "#FF5733" },
        symbolSize: 8,
      },
      {
        name: "Google",
        type: "line",
        data: googleWithoutIntegration.map((p) => ({
          value: p.value,
          y: p.value,
        })),
        smooth: true,
        lineStyle: { color: "#33FF57" },
        symbolSize: 8,
      },
      {
        name: integrationTitle + " " + integrationDataNextSunday,
        type: "line",
        data: integrationPositions.map((p) => ({
          value: p.value,
          y: p.value,
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
