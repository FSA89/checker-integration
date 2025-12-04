// components/alignCatVisit.js

export const alignCatVisit = (dates, data) => {
  if (!dates || !data) {
    console.error("Dates or data are undefined");
    return [];
  }

  return data
    .filter((item) => item.visits !== null)
    .map((item) => ({
      date: item.date,
      value: Number(item.visits),
    }));
};
