// components/alignCatPos.js

export const alignCatPos = (dates, data) => {
  if (!dates || !data) {
    console.error("Dates or data are undefined");
    return [];
  }

  const allTitlesEmpty = data.every((item) => !item.titles);
  const firstDate = data.length > 0 ? data[0].date : null;

  const dataMap = new Map(
    data.map((item) => [item.date, item.position_avg || item.cnt_integrations])
  );

  return dates.map((date) => {
    const value = dataMap.get(date.date) ?? null;

    return {
      date: date.date,
      value: allTitlesEmpty && date.date === firstDate ? "Внедрение" : value,
    };
  });
};
