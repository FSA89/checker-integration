export function countingRecords() {
  // Подсчет записей
  const records = document.querySelectorAll(".tables-page__string").length;
  const recordsElement = document.querySelector(".tables-page__records");

  if (recordsElement) {
    function getRecordWord(count) {
      if (count === 1) {
        return "Запись";
      } else if (count >= 2 && count <= 4) {
        return "Записи";
      } else {
        return "Записей";
      }
    }

    recordsElement.innerHTML = "";
    const numberSpan = document.createElement("span");
    numberSpan.textContent = records;

    const wordSpan = document.createElement("span");
    wordSpan.textContent = getRecordWord(records);

    recordsElement.appendChild(numberSpan);
    recordsElement.appendChild(wordSpan);
  }

  // Поиск по записям
  const searchInput = document.querySelector("#search");
  const rows = document.querySelectorAll(".tables-page__string");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();

      rows.forEach(function (row) {
        const firstPole = row.querySelector(".tables-page__pole");
        if (firstPole) {
          const text = firstPole.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("download").addEventListener("click", function () {
    const headers = Array.from(
      document.querySelectorAll(".tables-page__name .tables-page__u")
    ).map((header) => header.textContent.trim());

    const rows = Array.from(
      document.querySelectorAll(".tables-page__string")
    ).map((row) => {
      return Array.from(row.querySelectorAll(".tables-page__pole")).map(
        (cell) => cell.textContent.trim()
      );
    });

    const data = [headers, ...rows];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 80 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws, "Данные");

    XLSX.writeFile(wb, "Отслеживаемые и не отслеживаемые внедрения.xlsx");
  });
});
