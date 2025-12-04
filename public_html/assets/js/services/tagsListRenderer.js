// services/tagsListRenderer.js
export function renderTagsList(tagsList) {
  if (!tagsList || !Array.isArray(tagsList.data)) {
    console.error(
      "Ожидался массив регионов внутри data, но получен:",
      tagsList
    );
    return;
  }

  const selectElement = document.getElementById("tags__select");
  selectElement.innerHTML =
    '<option value="" selected disabled>Выберите тег (не обязательно)</option>';

  tagsList.data.forEach((tag) => {
    const option = document.createElement("option");
    option.textContent = tag.tag_value;
    option.setAttribute("data-tags-value", tag.tag_value);
    option.setAttribute("data-tags-domain-id", tag.domain_id);
    selectElement.appendChild(option);
  });

  // console.log("tagsList ", tagsList);
}
