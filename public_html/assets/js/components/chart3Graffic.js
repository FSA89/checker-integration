// components/chart3Graffic.js

export const chart3Graffic = (
  integrationTitle,
  integrationDataNextSunday,
  datesOneIntegration
) => {
  // console.log("Проверяем dates_one_integration_data ", datesOneIntegration);

  const integrationLabelTitle = integrationTitle;
  const integrationLabelDate = integrationDataNextSunday;

  if (!datesOneIntegration) {
    console.error("dates_one_integration_data is undefined");
    return [];
  }

  let localDatesOneIntegration = [...datesOneIntegration];

  const areAllTitlesEmpty = localDatesOneIntegration.every(
    (item) => !item.titles
  );

  if (areAllTitlesEmpty) {
    if (
      !localDatesOneIntegration.some(
        (item) => item.date === integrationLabelDate
      )
    ) {
      const newObject = {
        date: integrationLabelDate,
        titles: integrationLabelTitle,
        cnt_integrations: 1,
      };

      localDatesOneIntegration.unshift(newObject);
    }
  }

  const result = localDatesOneIntegration.map((item) => ({
    date: item.date,
    value: item.cnt_integrations || null,
    toolText: item.titles || null,
  }));

  const updatedResult = result.map((dateItem) => {
    if (dateItem.date === integrationLabelDate) {
      return { ...dateItem, value: 1 };
    }
    return dateItem;
  });

  return updatedResult;
};
