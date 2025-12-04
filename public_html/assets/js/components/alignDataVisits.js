// components/alignDataVisits.js

export const alignDataVisits = (dates, data) => {
  if (!dates || !data) {
    console.error("Dates or data are undefined");
    return [];
  }

  const dataMap = new Map(
    data.map((item) => [item.date, item.visits || item.cnt_integrations])
  );

  return dates.map((date) => ({
    value: dataMap.get(date.date) || null,
  }));
};
