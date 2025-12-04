// services/devicesRenderer.js

export function renderDevices(devices) {
  if (!devices || !Array.isArray(devices.data)) {
    console.error(
      "Ожидался массив устройств внутри data, но получен:",
      devices
    );
    return;
  }

  const selectElement = document.getElementById("device__select");
  selectElement.innerHTML =
    '<option value="" selected disabled>Выберите устройство</option>';

  devices.data.forEach((device) => {
    const option = document.createElement("option");
    option.value = device.is_mobile;
    option.textContent = device.is_mobile === 0 ? "ПК" : "Смартфоны";
    selectElement.appendChild(option);
  });
}
