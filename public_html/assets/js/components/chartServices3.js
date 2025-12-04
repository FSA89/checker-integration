// components/chartServices3.js

import { peiChart } from "../main.js";

export let selectedSegment = null;

export function renderChart3(documentsTable, onSegmentClick) {
  const pieChartData = peiChart(documentsTable);

  const chartDom = document.getElementById("tables-chart__3");
  if (window.chartInstance3) {
    window.chartInstance3.dispose();
  }

  const myChart = echarts.init(chartDom);
  window.chartInstance3 = myChart;

  const option = {
    title: {
      text: "Категории, затронутые внедрением",
      subtext: "Всего: " + pieChartData.reduce((sum, d) => sum + d.data, 0),
      left: "center",
      top: 30,
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        const percent = params.percent.toFixed(1) + "%";
        const name = params.name;
        const value = params.value;

        return `
          <div style="padding: 5px 10px">
            <strong>${name}</strong><br>
            Документов: ${value}<br>
            Доля: ${percent}
          </div>
        `;
      },
    },
    // legend: {
    //   // top: 30,
    //   bottom: 20,
    //   left: "center",
    //   data: pieChartData.map((item) => item.label),
    // },
    series: [
      {
        name: "Категории",
        type: "pie",
        radius: "45%",
        center: ["50%", "45%"],
        selectedMode: "single",
        label: {
          show: true,
          position: "outside",
          formatter: "{b}: {c} ({d}%)",
          fontSize: 12,
        },
        labelLine: {
          length: 15,
          length2: 10,
        },
        data: pieChartData.map((item, index) => ({
          name: item.label,
          value: item.data,
          itemStyle: {
            color: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"][index % 4],
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  myChart.setOption(option);

  myChart.on("click", function (params) {
    const selectedCategory = params.name;
    const selectedValue = params.value;

    selectedSegment = { selectedCategory, selectedValue };

    if (onSegmentClick) {
      onSegmentClick(selectedCategory, selectedValue);
    }
  });
}
