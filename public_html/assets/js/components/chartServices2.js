// components/chartServices2.js

// import { alignDataVisits, dataChartTraffic } from "../main.js";
import { alignDataVisits } from "./alignDataVisits.js";
import { dataChartTraffic } from "./dataChartTraffic.js";

export function renderChart2(
  dates,
  documentIntegrationAgg,
  integrationTitleDate,
  datesOneIntegration,
  integrationTitle,
  integrationDataNextSunday,
  datesIntegration
) {
  const yandexWithoutIntegration = alignDataVisits(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "yandex" && p.integrated_group === null
    )
  );
  const googleWithoutIntegration = alignDataVisits(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "google" && p.integrated_group === null
    )
  );
  const yandexWithIntegration = alignDataVisits(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "yandex" && p.integrated_group === 1
    )
  );
  const googleWithIntegration = alignDataVisits(
    dates,
    documentIntegrationAgg.filter(
      (p) => p.search_engine === "google" && p.integrated_group === 1
    )
  );
  const integrationPositions = dataChartTraffic(
    dates,
    datesOneIntegration,
    integrationTitle,
    integrationDataNextSunday
  );
  // const otherIntegrations = alignDataVisits(dates, datesIntegration.data);

  // const otherIntegrationsData = datesIntegration.data;
  const filteredOtherIntegrationsData = datesIntegration.data;
  // .filter(
  //   (p) => p.titles !== null || p.cnt_integrations !== null
  // );

  const validDatesSet = new Set(
    filteredOtherIntegrationsData.map((p) => p.date)
  );
  dates = dates.filter((d) => validDatesSet.has(d.date));

  // const otherIntegrationsWithNames = otherIntegrationsData.map((p) => ({
  //   x: p.date,
  //   y: p.cnt_integrations,
  //   integrationName: p.titles || "Неизвестное внедрение",
  // }));
  // console.log("otherIntegrationsWithNames ", otherIntegrationsWithNames);

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

  const chartDom = document.getElementById("tables-chart__2");

  if (window.chartInstance2) {
    window.chartInstance2.dispose();
  }

  const myChart = echarts.init(chartDom);
  window.chartInstance2 = myChart;

  const maxYValue = Math.max(
    ...yandexWithoutIntegration.map((p) => p.value),
    ...googleWithoutIntegration.map((p) => p.value),
    ...yandexWithIntegration.map((p) => p.value),
    ...googleWithIntegration.map((p) => p.value),
    ...integrationPositions.map((p) => p.value),
    ...otherIntegrationsWithNames.map((p) => p.y)
  );

  const option = {
    title: {
      text: "Средний недельный трафик",
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

    // legend: {
    //   top: 50,
    //   itemGap: 12,
    //   data: [
    //     "Яндекс без внедрения",
    //     "Гугл без внедрения",
    //     "Яндекс с внедрением",
    //     "Гугл с внедрением",
    //     integrationTitleDate,
    //     "Другие внедрения",
    //   ],
    //   selected: {
    //     "Другие внедрения": false,
    //   },
    //   padding: [30, 0, 0, 0],
    //   textStyle: {
    //     fontSize: 12,
    //     lineHeight: 14,
    //     overflow: "truncate", // Можно добавить
    //   },
    // },
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
      name: "Визиты",
      nameLocation: "middle",
      nameGap: 40,
      nameRotate: 90,
      min: 0,
      max: Math.ceil(maxYValue) + 1,
      interval: 1,
      axisLabel: {
        fontSize: 12,
        formatter: "{value}",
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
        data: integrationPositions.map((p) => (p.value === 1 ? 0.1 : p.value)),
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
          // value: p.y,
          value: p.y === 1 ? 0.1 : p.value,
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
            // Разбиение длинного заголовка на строки
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
