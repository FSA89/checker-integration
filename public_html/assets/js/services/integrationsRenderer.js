// services/integrationsRenderer.js
export function renderIntegrations(integrations) {
  let integrationsArray = [];

  if (Array.isArray(integrations)) {
    integrationsArray = integrations;
  } else if (integrations && Array.isArray(integrations.data)) {
    integrationsArray = integrations.data;
  } else {
    console.error("Ожидался массив интеграций, но получен:", integrations);
    return;
  }

  const selectElement = document.getElementById("integration__select");
  selectElement.innerHTML =
    '<option value="" selected disabled>Выберите интеграцию</option>';

  integrationsArray.forEach((integration) => {
    const option = document.createElement("option");
    option.value = integration.task_id;
    option.textContent = `${integration.title} ${integration.next_sunday}`;
    option.setAttribute("data-next-sunday", integration.next_sunday); // ✅ Передаем next_sunday
    option.setAttribute("data-task-id", integration.task_id); // ✅ Передаем task_id
    option.setAttribute("data-title", integration.title);
    selectElement.appendChild(option);
  });

  // console.log("Интеграции ", integrationsArray);
  return integrationsArray;
}
