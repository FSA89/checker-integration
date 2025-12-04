// Календарь
// export function calendarDate() {
//   // Данные для календарей
//   const startDateInput = document.getElementById("startDate");
//   const endDateInput = document.getElementById("endDate");
//   const dateRangeContainer = document.querySelector(".date-range-container");

//   // Инициализация для выбора начальной даты
//   flatpickr(startDateInput, {
//     dateFormat: "Y-m-d", // Формат даты
//     locale: "ru", // Устанавливаем русскую локализацию
//     onChange: function (selectedDates, dateStr, instance) {
//       const startDate = selectedDates[0]; // Получаем выбранную начальную дату
//       if (endDateInput.value) {
//         const endDate = flatpickr.parseDate(endDateInput.value, "Y-m-d");
//         if (startDate > endDate) {
//           // Если начальная дата больше конечной, показываем предупреждение
//           alert("Начальная дата не может быть позже конечной.");
//           startDateInput.value = "";
//         }
//       }
//       // Если начальная дата выбрана, записываем ее в атрибут data-date-start
//       if (startDate) {
//         dateRangeContainer.setAttribute(
//           "data-date-start",
//           startDate.toISOString().split("T")[0]
//         );
//       } else {
//         dateRangeContainer.removeAttribute("data-date-start");
//       }
//     },
//   });

//   // Инициализация для выбора конечной даты
//   flatpickr(endDateInput, {
//     dateFormat: "Y-m-d", // Формат даты
//     locale: "ru", // Устанавливаем русскую локализацию
//     onChange: function (selectedDates, dateStr, instance) {
//       const endDate = selectedDates[0]; // Получаем выбранную конечную дату
//       if (startDateInput.value) {
//         const startDate = flatpickr.parseDate(startDateInput.value, "Y-m-d");
//         if (endDate < startDate) {
//           // Если конечная дата меньше начальной, показываем предупреждение
//           alert("Конечная дата не может быть раньше начальной.");
//           endDateInput.value = "";
//         }
//       }
//       // Если конечная дата выбрана, записываем ее в атрибут data-date-end
//       if (endDate) {
//         dateRangeContainer.setAttribute(
//           "data-date-end",
//           endDate.toISOString().split("T")[0]
//         );
//       } else {
//         dateRangeContainer.removeAttribute("data-date-end");
//       }
//     },
//   });

//   // Когда оба поля выбраны, записываем диапазон в атрибуты контейнера
//   document.querySelectorAll(".date-input").forEach((input) => {
//     input.addEventListener("input", function () {
//       if (startDateInput.value && endDateInput.value) {
//         // Формируем строку с диапазоном
//         const rangeStart = startDateInput.value;
//         const rangeEnd = endDateInput.value;
//         // Записываем диапазон в атрибуты data-date-start и data-date-end
//         dateRangeContainer.setAttribute("data-date-start", rangeStart);
//         dateRangeContainer.setAttribute("data-date-end", rangeEnd);
//       }
//     });
//   });
// }
