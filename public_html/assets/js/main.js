// main.js

import { fetchDomains } from "./api/domainsService.js";
import { fetchDevices } from "./api/devicesService.js";
import { fetchTagsList } from "./api/tagsListService.js";
import { fetchTagsFilter } from "./api/tagsFilterService.js";
import { fetchRegions } from "./api/regionsService.js";
import { fetchDates } from "./api/datesService.js";
import { fetchIntegrations } from "./api/integrationsService.js";
import { fetchDocumentsIntegrationsAgg } from "./api/documentsIntegrationsAggService.js";
import { fetchDatesOneIntegration } from "./api/datesOneIntegrationService.js";
import { fetchDocuments } from "./api/documentsService.js";
import { fetchDatesIntegration } from "./api/datesIntegrationService.js";
import { fetchNanDocuments } from "./api/nanDocumentsService.js";
import { fetchCategories } from "./api/categoriesService.js";
import { fetchCategoriesPosService } from "./api/categoriesPosService.js";
import { fetchCategoriesPosCopyService } from "./api/categoriesPosCopyService.js";

import { renderDomains } from "./services/domainsRenderer.js";
import { renderTagsList } from "./services/tagsListRenderer.js";
import { renderTagsFilter } from "./services/tagsFilterRenderer.js";
import { renderDevices } from "./services/devicesRenderer.js";
import { renderRegions } from "./services/regionsRenderer.js";
import { renderDates } from "./services/datesRenderer.js";
import { renderIntegrations } from "./services/integrationsRenderer.js";
import { renderDocumentsIntegrationsAgg } from "./services/documentsIntegrationsAggRenderer.js";
import { renderDatesOneIntegration } from "./services/datesOneIntegrationRenderer.js";
import { renderDocuments } from "./services/documentsRenderer.js";
import { renderDatesIntagration } from "./services/datesIntegrationRenderer.js";
import { renderNanDocuments } from "./services/nanDocumentsRenderer.js";
import { renderCategories } from "./services/categoriesRenderer.js";
import { renderCategoriesPos } from "./services/categoriesPosRenderer.js";
import { renderCategoriesPosCopy } from "./services/categoriesPosCopyRenderer.js";

import { handleErrors } from "./services/handleErrors.js";

import { countingRecords } from "./components/chart.js";
import { renderChart1 } from "./components/chartServices1.js";
import { renderChart2 } from "./components/chartServices2.js";
import { renderChart3, selectedSegment } from "./components/chartServices3.js";
import { renderChart4 } from "./components/chartServices4.js";
import { renderChart5 } from "./components/chartServices5.js";

import { CustomSelect } from "./components/customSelect.js";

import { showPreloader, hidePreloader } from "./components/preloader.js";

export const peiChart = (documentsTable, selectedLabel) => {
  const pieChartData = documentsTable.map((item) => ({
    label: item.title,
    data: item.cnt_docs,
  }));

  if (selectedLabel) {
    return pieChartData.filter((item) => item.label === selectedLabel);
  }

  return pieChartData;
};

// -------------------------------

const nameCustom = new CustomSelect("name__select");
const integrationCustom = new CustomSelect("integration__select");
const regionCustom = new CustomSelect("region__select");
const deviceCustom = new CustomSelect("device__select");
const tagsCustom = new CustomSelect("tags__select");

const unic1 = document.querySelector("#unic-1 .custom-dropdown");
const unic2 = document.querySelector("#unic-2 .custom-dropdown");
const unic3 = document.querySelector("#unic-3 .custom-dropdown");
const unic4 = document.querySelector("#unic-4 .custom-dropdown");
const unic5 = document.querySelector("#unic-5 .custom-dropdown");

if (unic1 || unic2 || unic3 || unic4 || unic5) {
  unic2.style.display = "none";
  unic3.style.display = "none";
  unic4.style.display = "none";
  unic5.style.display = "none";
}

// -----------------------------

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const domains = await fetchDomains();
    renderDomains(domains);

    nameCustom.refresh();
  } catch (error) {
    handleErrors(error);
  }
});

const selectDomain = document.getElementById("name__select");
const selectIntegration = document.getElementById("integration__select");
const selectRegion = document.getElementById("region__select");
const selectDevice = document.getElementById("device__select");
const selectTags = document.getElementById("tags__select");
const tablesString = document.querySelector(".tables-string");
const tablesInner = document.querySelector(".tables-inner");

const progress = document.querySelector(".progress");
const progressNum = document.querySelector(".progress-num>span");

const btnChoice = document.getElementById("btn-choise");

const tablesContainer = document.querySelector(".tables-container");
const tablesPage = document.querySelector(".tables-page");
// const tablesText = document.querySelector(".tables-text");

let selectedDate = null;
let selectedIntegration = { nextSunday: null, taskId: null };
let selectedRegion = { regionId: null };

let integrationsArray = [];

selectDomain.addEventListener("change", async (event) => {
  showPreloader();
  clearAndRecreateCanvases();

  const selectedOption = event.target.selectedOptions[0];
  const domainId = selectedOption.getAttribute("data-domain-id");
  const wsProjectId = selectedOption.getAttribute("data-ws-project-id");

  progress.style.display = "block";

  try {
    const tagsListData = await fetchTagsList(domainId);
    const devicesData = await fetchDevices(domainId);
    const regionsData = await fetchRegions(domainId);
    const integrationsData = await fetchIntegrations(domainId, wsProjectId);

    // selectDevice.style.display = "block";
    // selectRegion.style.display = "block";
    // selectIntegration.style.display = "block";
    unic2.style.display = "block";
    unic3.style.display = "block";
    unic4.style.display = "block";
    unic5.style.display = "block";
    tablesInner.style.gap = "30px";

    tablesContainer.style.display = "none";
    // tablesText.style.display = "none";
    tablesPage.style.display = "none";
    tablesString.style.display = "none";

    renderTagsList(tagsListData);
    renderDevices(devicesData);
    renderRegions(regionsData);

    integrationsArray = renderIntegrations(integrationsData);
    selectedIntegration.integrationsArray = integrationsArray;

    tagsCustom.refresh();
    integrationCustom.refresh();
    regionCustom.refresh();
    deviceCustom.refresh();

    autoSelectSingleOption(selectRegion);
    autoSelectSingleOption(selectDevice);
    autoSelectSingleOption(selectIntegration);

    // console.log("Интеграции ", integrationsArray);
  } catch (error) {
    handleErrors(error);
  } finally {
    hidePreloader();
  }
});

function autoSelectSingleOption(selectElement) {
  const options = Array.from(selectElement.options).filter(
    (opt) => !opt.disabled
  );
  if (options.length === 1) {
    selectElement.value = options[0].value;

    // вручную триггерим событие change, если от него зависят другие действия
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

const checkAllSelectsFilled = () => {
  return selectRegion.value && selectDevice.value && selectIntegration.value;
};

const updateTablesStringVisibility = () => {
  const allFilled = checkAllSelectsFilled();
  // if (checkAllSelectsFilled()) {
  //   tablesString.style.display = "flex";
  // } else {
  //   tablesString.style.display = "none";
  // }

  if (allFilled) {
    btnChoice.click();
    btnDown.click();
  }
};

selectTags.addEventListener("change", async (event) => {
  const selectedOption = event.target.selectedOptions[0];

  if (!selectedOption) {
    // Если тег не выбран, не меняем данные
    return;
  }

  tablesContainer.style.display = "none";
  tablesPage.style.display = "none";

  const domainId = selectedOption.getAttribute("data-tags-domain-id");
  const tagValue = selectedOption.getAttribute("data-tags-value");

  try {
    showPreloader();

    // Если тег выбран, выполняем фильтрацию
    const filteredData = await fetchTagsFilter(domainId, tagValue);
    integrationsArray = renderIntegrations(filteredData);
    selectedIntegration.integrationsArray = integrationsArray;

    integrationCustom.refresh();
    regionCustom.refresh();
    deviceCustom.refresh();

    autoSelectSingleOption(selectRegion);
    autoSelectSingleOption(selectDevice);
    autoSelectSingleOption(selectIntegration);
  } catch (error) {
    handleErrors(error);
  } finally {
    hidePreloader();
  }
});

selectRegion.addEventListener("change", (event) => {
  const selectedOption = event.target.selectedOptions[0];
  selectedRegion.regionId = selectedOption
    ? selectedOption.getAttribute("data-region-id")
    : null;
  updateTablesStringVisibility();
});

selectDevice.addEventListener("change", (event) => {
  updateTablesStringVisibility();
});

selectIntegration.addEventListener("change", async (event) => {
  // console.log("2 22 ", integrationsArray);

  const selectedOption = event.target.selectedOptions[0];

  // selectedIntegration.nextSunday = selectedOption
  //   ? selectedOption.getAttribute("data-next-sunday")
  //   : null;
  selectedDate = selectedOption
    ? selectedOption.getAttribute("data-next-sunday")
    : null;
  selectedIntegration.taskId = selectedOption
    ? selectedOption.getAttribute("data-task-id")
    : null;

  const integrationTitle = selectedOption
    ? selectedOption.getAttribute("data-title")
    : "";

  btnChoice.setAttribute("data-integration-title", integrationTitle);
  btnChoice.setAttribute("data-next-sunday", selectedDate);

  updateTablesStringVisibility();

  await new Promise((resolve) => {
    if (integrationsArray && integrationsArray.length > 0) {
      resolve();
    } else {
      setTimeout(resolve, 100);
    }
  });
  progressBar(integrationsArray, integrationTitle);
});

function logParamApplication({
  domainFound,
  regionFound,
  deviceFound,
  integrationFound,
}) {
  console.group("🔍 Подстановка из URL-параметров");

  console.log(`Домен найден: ${domainFound ? "✅" : "❌"}`);
  console.log(`Регион найден: ${regionFound ? "✅" : "❌"}`);
  console.log(`Устройство найдено: ${deviceFound ? "✅" : "❌"}`);
  console.log(`Интеграция найдена: ${integrationFound ? "✅" : "❌"}`);

  console.groupEnd();
}

function getParamsFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return {
    name: params.get("name"), // domain name
    region_name: params.get("region_name"),
    is_mobile: params.get("is_mobile"),
    title: params.get("title"),
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = getParamsFromUrl(); // <--- получаем параметры

  try {
    const domains = await fetchDomains();
    renderDomains(domains);

    if (urlParams.name) {
      // debugger;
      // Ищем опцию с нужным текстом (домен)
      const optionToSelect = Array.from(selectDomain.options).find(
        (opt) => opt.textContent.trim() === urlParams.name
      );

      if (optionToSelect) {
        selectDomain.value = optionToSelect.value;

        // Имитируем изменение селекта, чтобы подгрузить регионы/устройства/интеграции
        const changeEvent = new Event("change", { bubbles: true });
        selectDomain.dispatchEvent(changeEvent);

        // Ждем завершения загрузки данных для всех селектов
        await waitForAllSelectsToLoad();

        // После того как все селекты загружены, подставляем значения из URL
        await setValuesFromUrlParams(urlParams);

        selectRegion.dispatchEvent(new Event("change", { bubbles: true }));
        selectDevice.dispatchEvent(new Event("change", { bubbles: true }));
        selectIntegration.dispatchEvent(new Event("change", { bubbles: true }));

        btnChoice.click();
      }

      logParamApplication({
        domainFound: !!optionToSelect,
        regionFound: !!selectRegion.value,
        deviceFound: !!selectDevice.value,
        integrationFound: !!selectIntegration.value,
      });

      const elementIntegration = document.querySelector("#integration__select");
    } else {
      console.warn(
        `❌ Домен "${urlParams.name}" не найден среди загруженных опций`
      );
    }
  } catch (error) {
    handleErrors(error);
  }
});

// Функция для ожидания завершения загрузки всех селектов (region, device, integration)
async function waitForAllSelectsToLoad() {
  // await waitForSelectOptions(selectTags);
  await waitForSelectOptions(selectRegion);
  await waitForSelectOptions(selectDevice);
  await waitForSelectOptions(selectIntegration);
}

// Функция для ожидания, что опции для конкретного селекта загрузятся
function waitForSelectOptions(select) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (select.options.length > 1) {
        // Проверяем, что есть хотя бы одна опция, помимо дефолтной
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}

// Функция для подстановки значений из URL в селекты
async function setValuesFromUrlParams(urlParams) {
  await setSelectValue(selectTags, urlParams.tag_value);
  await setSelectValue(selectRegion, urlParams.region_name);
  await setSelectValue(
    selectDevice,
    urlParams.is_mobile === "0" ? "ПК" : "Смартфоны"
  );
  await setSelectValueForIntegration(selectIntegration, urlParams.title);

  updateTablesStringVisibility();
}

// Функция для установки значения в селект для интеграции с учетом data-title
async function setSelectValueForIntegration(select, expectedTitle) {
  const option = Array.from(select.options).find(
    (opt) => opt.getAttribute("data-title") === expectedTitle
  );
  if (option) {
    select.value = option.value;
  }
}

// Функция для установки значения в селект, если оно существует
async function setSelectValue(select, expectedText) {
  const option = Array.from(select.options).find(
    (opt) => opt.textContent.trim() === expectedText
  );
  if (option) {
    select.value = option.value;
  }
}

// ---===-----------------------------===---

const progressBar = (integrationsArray, integrationTitle) => {
  const selectedItem = integrationsArray.find(
    (item) => item.title.trim() === integrationTitle.trim()
  );

  const progress = selectedItem ? Number(selectedItem.progress) : 0;

  progressNum.textContent = Math.round(progress);

  const progressBarElement = document.getElementById("progressBar");
  progressBarElement.style.width = `${progress}%`;
};

function getCharts() {
  const chart4 = document.querySelector(".tables-chart:nth-child(4)");
  const chart5 = document.querySelector(".tables-chart:nth-child(5)");
  return { chart4, chart5 };
}

btnChoice.addEventListener("click", async (event) => {
  showPreloader();
  tablesContainer.style.display = "flex";
  tablesPage.style.display = "block";
  // tablesText.style.display = "block";

  const { chart4, chart5 } = getCharts();
  if (chart4 || chart5) {
    if (chart4) chart4.style.display = "none";
    if (chart5) chart5.style.display = "none";
  }

  event.preventDefault();

  if (!selectedDate) {
    console.warn("Дата не выбрана!");
    return;
  }

  const domainid = selectDomain.value;
  const integrationTaskId = selectedIntegration.taskId;
  const nextsunday = selectedDate;
  const regionId = selectedRegion.regionId;
  const isMobile = selectDevice ? selectDevice.value === "1" : false;

  if (
    !domainid ||
    !integrationTaskId ||
    !nextsunday ||
    !regionId ||
    isMobile === undefined
  ) {
    console.warn("Не все данные выбраны!");
    return;
  }

  try {
    // debugger;
    const datesData = await fetchDates(selectedDate);

    const dates = datesData.data;
    renderDates(datesData);

    const aggData = await fetchDocumentsIntegrationsAgg(
      integrationTaskId,
      nextsunday,
      domainid,
      regionId,
      isMobile
    );
    showPreloader();
    const documentIntegrationAgg = aggData.data;
    if (aggData) {
      renderDocumentsIntegrationsAgg(aggData);
    }

    const responseDatafetchDatesOneIntegration = await fetchDatesOneIntegration(
      nextsunday,
      domainid,
      integrationTaskId
    );
    const datesOneIntegration = responseDatafetchDatesOneIntegration.data;

    renderDatesOneIntegration(responseDatafetchDatesOneIntegration);

    const responseDatafetchdocuments = await fetchDocuments(
      domainid,
      integrationTaskId
    );
    const documentsTable = responseDatafetchdocuments.data;
    renderDocuments(responseDatafetchdocuments);

    const datesIntegration = await fetchDatesIntegration(nextsunday, domainid);
    // console.log("Даты интеграций ", datesIntegration);

    const integrationTitle = btnChoice.getAttribute("data-integration-title");
    const integrationDataNextSunday =
      btnChoice.getAttribute("data-next-sunday");
    const integrationTitleDate =
      integrationTitle + " " + integrationDataNextSunday;

    await renderChart1(
      dates,
      documentIntegrationAgg,
      integrationTitleDate,
      datesOneIntegration,
      integrationTitle,
      integrationDataNextSunday,
      datesIntegration
    );

    await renderChart2(
      dates,
      documentIntegrationAgg,
      integrationTitleDate,
      datesOneIntegration,
      integrationTitle,
      integrationDataNextSunday,
      datesIntegration
    );

    await renderChart3(documentsTable, () =>
      pushSelectedSegment(
        domainid,
        regionId,
        isMobile,
        nextsunday,
        dates,
        integrationTitle,
        integrationDataNextSunday,
        datesOneIntegration,
        datesIntegration,
        documentsTable
      )
    );
  } catch (error) {
    handleErrors(error);
  } finally {
    hidePreloader();
  }
});

async function pushSelectedSegment(
  domainid,
  regionId,
  isMobile,
  nextsunday,
  dates,
  integrationTitle,
  integrationDataNextSunday,
  datesOneIntegration,
  datesIntegration,
  documentsTable
) {
  showPreloader();
  try {
    let responseCategoriesPosTable = null;
    let responseCategoriesPosCopyTable = null;

    if (selectedSegment) {
      // console.log(
      //   `Выбран сегмент: ${selectedSegment.selectedCategory} (${selectedSegment.selectedValue} документов)`
      // );

      const { chart4, chart5 } = getCharts();
      if (chart4 || chart5) {
        if (chart4) chart4.style.display = "block";
        if (chart5) chart5.style.display = "block";
      }

      const responseCategoriesPos = await fetchCategoriesPosService(
        domainid,
        regionId,
        isMobile,
        nextsunday,
        selectedSegment.selectedCategory
      );

      if (responseCategoriesPos) {
        responseCategoriesPosTable = responseCategoriesPos.data;
        renderCategoriesPos(responseCategoriesPosTable);
      } else {
        console.error("Не удалось получить данные");
      }

      const responseCategoriesPosCopy = await fetchCategoriesPosCopyService(
        domainid,
        regionId,
        isMobile,
        nextsunday,
        selectedSegment.selectedCategory
      );

      if (responseCategoriesPosCopy) {
        responseCategoriesPosCopyTable = responseCategoriesPosCopy.data;
        renderCategoriesPosCopy(responseCategoriesPosCopyTable);
      } else {
        console.error("Не удалось получить данные");
      }

      renderChart4(
        dates,
        integrationTitle,
        integrationDataNextSunday,
        datesOneIntegration,
        datesIntegration,
        responseCategoriesPosCopyTable,
        selectedSegment
      );

      renderChart5(
        dates,
        integrationTitle,
        integrationDataNextSunday,
        datesOneIntegration,
        datesIntegration,
        responseCategoriesPosCopyTable,
        documentsTable,
        selectedSegment
      );
    }
  } catch (error) {
    handleErrors(error);
  } finally {
    hidePreloader();
  }
}

const btnDown = document.getElementById("btn-down");

btnDown.addEventListener("click", async (event) => {
  event.preventDefault();
  const download = document.getElementById("download");

  if (download) {
    download.style.display = "block";
  }

  showPreloader();

  try {
    const existingRows = document.querySelectorAll(".tables-page__string");
    existingRows.forEach((row) => row.remove());

    const responseFetchNanDocuments = await fetchNanDocuments(
      selectedIntegration.taskId
    );
    const nanDocuments = responseFetchNanDocuments.data;

    if (Array.isArray(nanDocuments)) {
      const container = document.querySelector(".tables-page__links");
      const nameBlock = document.querySelector(".tables-page__name");

      // Добавляем новые строки
      nanDocuments.forEach((item) => {
        const row = document.createElement("div");
        row.classList.add("tables-page__string");

        const urlDiv = document.createElement("div");
        urlDiv.classList.add("tables-page__pole");
        urlDiv.textContent = item.url;

        const statusDiv = document.createElement("div");
        statusDiv.classList.add("tables-page__pole");
        statusDiv.textContent = item.status;

        row.appendChild(urlDiv);
        row.appendChild(statusDiv);

        container.insertBefore(row, nameBlock.nextSibling);
      });

      // const allRows = Array.from(
      //   document.querySelectorAll(".tables-page__string")
      // );
      // createPagination(allRows, 10);

      const allRows = Array.from(
        document.querySelectorAll(".tables-page__string")
      );

      if (allRows.length > 10) {
        createPagination(allRows, 10);
      } else {
        // Если строк 10 или меньше — показать все и очистить пагинацию
        allRows.forEach((row) => (row.style.display = "grid"));

        const paginationContainer = document.querySelector(
          ".tables-page__pagination"
        );
        paginationContainer.innerHTML = "";
      }
    } else {
      console.log("Данные не получены или не в правильном формате");
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  } finally {
    hidePreloader();
  }

  countingRecords();
});

function createPagination(rows, perPage) {
  const paginationContainer = document.querySelector(
    ".tables-page__pagination"
  );
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(rows.length / perPage);

  function showPage(page) {
    rows.forEach((row, index) => {
      row.style.display =
        index >= (page - 1) * perPage && index < page * perPage
          ? "grid"
          : "none";
    });

    const buttons = paginationContainer.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    const currentBtn = paginationContainer.querySelector(
      `button[data-page="${page}"]`
    );
    if (currentBtn) currentBtn.classList.add("active");
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.setAttribute("data-page", i);
    btn.classList.add("pagination-btn");

    btn.addEventListener("click", () => {
      showPage(i);
    });

    paginationContainer.appendChild(btn);
  }

  showPage(1);
}

// --------------------------------------

// сортировка по клике на статус
document.addEventListener("DOMContentLoaded", () => {
  let sortAsc = true;

  const statusHeader = document.querySelector(".tables-page__u.status");
  if (statusHeader) {
    statusHeader.style.cursor = "pointer";
    statusHeader.addEventListener("click", () => {
      const container = document.querySelector(".tables-page__links");
      const nameBlock = document.querySelector(".tables-page__name");
      const rows = Array.from(
        document.querySelectorAll(".tables-page__string")
      );

      rows.sort((a, b) => {
        const statusA = a
          .querySelectorAll(".tables-page__pole")[1]
          .textContent.trim();
        const statusB = b
          .querySelectorAll(".tables-page__pole")[1]
          .textContent.trim();

        if (sortAsc) {
          return statusA.localeCompare(statusB);
        } else {
          return statusB.localeCompare(statusA);
        }
      });

      rows.forEach((row) => {
        container.insertBefore(row, nameBlock.nextSibling);
      });

      sortAsc = !sortAsc;

      const allRows = Array.from(
        document.querySelectorAll(".tables-page__string")
      );
      if (allRows.length > 10) {
        createPagination(allRows, 10);
      } else {
        allRows.forEach((row) => (row.style.display = "grid"));
        const paginationContainer = document.querySelector(
          ".tables-page__pagination"
        );
        if (paginationContainer) paginationContainer.innerHTML = "";
      }
    });
  }
});

// ----------------------------

const clearAndRecreateCanvases = () => {
  const chartsContainer = document.querySelector(".tables-container");

  // Очищаем текущие канвасы
  if (chartsContainer) {
    chartsContainer.innerHTML = "";
  }

  const canvasIds = [
    "tables-chart__1",
    "tables-chart__2",
    "tables-chart__3",
    "tables-chart__4",
    "tables-chart__5",
  ];

  canvasIds.forEach((id) => {
    const chartDiv = document.createElement("div");
    chartDiv.classList.add("tables-chart");

    const chartCont = document.createElement("div");
    chartCont.classList.add("tables-chart__cont");

    const canvas = document.createElement("div");
    canvas.id = id;

    chartCont.appendChild(canvas);
    chartDiv.appendChild(chartCont);
    chartsContainer.appendChild(chartDiv);
  });

  document
    .querySelectorAll(".tables-page__string")
    .forEach((row) => row.remove());
};

// const clearAndRecreateCanvases = () => {
//   const chartsContainer = document.querySelector(".tables-container");

//   // Очищаем текущие канвасы
//   if (chartsContainer) {
//     chartsContainer.innerHTML = "";
//   }

//   // Создаем основной .tables-grid
//   const grid = document.createElement("div");
//   grid.classList.add("tables-grid");

//   const canvasIds = [
//     "tables-chart__1",
//     "tables-chart__2",
//     "tables-chart__3",
//     "tables-chart__4",
//     "tables-chart__5",
//   ];

//   // 1. Первый столбец с 2 блоками
//   const col1 = document.createElement("div");
//   col1.classList.add("tables-grid-col");

//   for (let i = 0; i < 2; i++) {
//     const chart = createChartBlock(canvasIds[i]);
//     col1.appendChild(chart);
//   }

//   // 2. Второй столбец с 1 блоком
//   const col2 = document.createElement("div");
//   col2.classList.add("tables-grid-col");

//   col2.appendChild(createChartBlock(canvasIds[2]));

//   // Добавляем оба столбца в .tables-grid
//   grid.appendChild(col1);
//   grid.appendChild(col2);

//   // 3. Отдельная строка с 2 блоками
//   const line = document.createElement("div");
//   line.classList.add("tables-grid-line");

//   for (let i = 3; i < 5; i++) {
//     const chart = createChartBlock(canvasIds[i]);
//     line.appendChild(chart);
//   }

//   // Добавляем .tables-grid и .tables-grid-line в основной контейнер
//   chartsContainer.appendChild(grid);
//   chartsContainer.appendChild(line);

//   // Удаляем строки
//   document
//     .querySelectorAll(".tables-page__string")
//     .forEach((row) => row.remove());
// };

// // Вспомогательная функция создания одного chart-блока
// const createChartBlock = (id) => {
//   const chartDiv = document.createElement("div");
//   chartDiv.classList.add("tables-chart");

//   const chartCont = document.createElement("div");
//   chartCont.classList.add("tables-chart__cont");

//   const canvas = document.createElement("div"); // Или canvas, если нужно
//   canvas.id = id;

//   chartCont.appendChild(canvas);
//   chartDiv.appendChild(chartCont);

//   return chartDiv;
// };
