// components/alignDataChartPositions.js

export const alignDataChartPositions = (
  dates,
  data,
  integrationTitle,
  integrationDataNextSunday
) => {
  const integrationLabelDate = integrationTitle; // Дата
  const integrationLabelTitle = integrationDataNextSunday; // Заголовок

  if (!dates || !data) {
    console.error("Dates or data are undefined");
    return [];
  }

  let localDatesOneIntegration = [...data];

  const areAllTitlesEmpty = localDatesOneIntegration.every(
    (item) => !item.titles
  );

  const isObjectAlreadyAdded = localDatesOneIntegration.some(
    (item) => item.date === integrationLabelDate
  );

  if (areAllTitlesEmpty && !isObjectAlreadyAdded) {
    const newObject = {
      date: integrationLabelDate,
      titles: integrationLabelTitle,
      cnt_integrations: null,
    };

    localDatesOneIntegration.unshift(newObject);
  }

  const dataMap = new Map(
    data.map((item) => [item.date, item.position_avg || item.cnt_integrations])
  );

  if (areAllTitlesEmpty) {
    const updatedDates = dates.map((dateItem) => {
      if (dateItem.date === integrationLabelDate) {
        return { ...dateItem, value: 1 };
      }
      return { ...dateItem, value: null };
    });

    const result = localDatesOneIntegration.map((item) => ({
      date: item.date,
      titles: item.titles,
      cnt_integrations: null,
    }));

    return updatedDates;
  }

  const result = dates.map((date) => ({
    date: date.date,
    value: dataMap.get(date.date) || null,
  }));

  if (!areAllTitlesEmpty) {
    // console.log("Возвращаем исходные данные:", result, dates_one_integration.data);
  }

  return result;
};
