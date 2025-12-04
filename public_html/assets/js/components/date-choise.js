// // Календарь

document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const dateRangeContainer = document.querySelector(".date-range-container");

  // Вычисляем текущую дату и дату 3 месяца назад
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 1);

  // Форматируем даты в Y-m-d
  const formatDate = (date) => date.toISOString().split("T")[0];
  const startDateStr = formatDate(threeMonthsAgo);
  const endDateStr = formatDate(today);

  // Устанавливаем значения по умолчанию в поля
  startDateInput.value = startDateStr;
  endDateInput.value = endDateStr;

  // Устанавливаем атрибуты на контейнер
  dateRangeContainer.setAttribute("data-date-start", startDateStr);
  dateRangeContainer.setAttribute("data-date-end", endDateStr);

  // Инициализация начальной даты
  flatpickr(startDateInput, {
    dateFormat: "Y-m-d",
    locale: "ru",
    defaultDate: startDateStr,
    onChange: function (selectedDates) {
      const startDate = selectedDates[0];
      if (endDateInput.value) {
        const endDate = flatpickr.parseDate(endDateInput.value, "Y-m-d");
        if (startDate > endDate) {
          alert("Начальная дата не может быть позже конечной.");
          startDateInput.value = "";
          dateRangeContainer.removeAttribute("data-date-start");
          return;
        }
      }
      if (startDate) {
        dateRangeContainer.setAttribute(
          "data-date-start",
          formatDate(startDate)
        );
      }
    },
  });

  // Инициализация конечной даты
  flatpickr(endDateInput, {
    dateFormat: "Y-m-d",
    locale: "ru",
    defaultDate: endDateStr,
    onChange: function (selectedDates) {
      const endDate = selectedDates[0];
      if (startDateInput.value) {
        const startDate = flatpickr.parseDate(startDateInput.value, "Y-m-d");
        if (endDate < startDate) {
          alert("Конечная дата не может быть раньше начальной.");
          endDateInput.value = "";
          dateRangeContainer.removeAttribute("data-date-end");
          return;
        }
      }
      if (endDate) {
        dateRangeContainer.setAttribute("data-date-end", formatDate(endDate));
      }
    },
  });

  // Обновление атрибутов при ручном вводе
  document.querySelectorAll(".date-input").forEach((input) => {
    input.addEventListener("input", function () {
      if (startDateInput.value && endDateInput.value) {
        dateRangeContainer.setAttribute(
          "data-date-start",
          startDateInput.value
        );
        dateRangeContainer.setAttribute("data-date-end", endDateInput.value);
      }
    });
  });
});
