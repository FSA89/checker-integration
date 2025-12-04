// services/regionsRenderer.js
export function renderRegions(regions) {
  if (!regions || !Array.isArray(regions.data)) {
    console.error("Ожидался массив регионов внутри data, но получен:", regions);
    return;
  }

  const selectElement = document.getElementById("region__select");
  selectElement.innerHTML =
    '<option value="" selected disabled>Выберите регион</option>';

  regions.data.forEach((region) => {
    const option = document.createElement("option");
    option.value = region.region_id;
    option.textContent = region.region_name;
    option.setAttribute("data-region-id", region.region_id);
    selectElement.appendChild(option);
  });
}
