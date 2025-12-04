// components/dataChartTraffic.js

export const dataChartTraffic = (
  dates,
  data,
  integrationTitle,
  integrationDataNextSunday
) => {
  const integrationLabelDate = integrationTitle;
  const integrationLabelTitle = integrationDataNextSunday;

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
    // console.log("Добавлен новый объект в локальную копию:", newObject);
  }

  const dataMap = new Map(
    data.map((item) => [item.date, item.visits || item.cnt_integrations])
  );

  if (areAllTitlesEmpty) {
    const updatedDates = dates.map((dateItem) => {
      if (dateItem.date === integrationLabelDate) {
        return { ...dateItem, value: 1 };
      }
      return { ...dateItem, value: null };
    });

    // console.log("Обновленный массив с проставленным value:", updatedDates);

    const result = localDatesOneIntegration.map((item) => ({
      date: item.date,
      titles: item.titles,
      cnt_integrations: null,
    }));

    // console.log("Возвращаем обновленные данные с новым заголовком:", result);
    // console.log("dates:", updatedDates);

    return updatedDates;
  }

  const result = dates.map((date) => ({
    date: date.date,
    value: dataMap.get(date.date) || null,
  }));

  if (!areAllTitlesEmpty) {
    // console.log("Возвращаем исходные данные:", result, data);
  }

  return result;
};
