// services/domainsRenderer.js

export function renderDomains(domains) {
    if (!domains || !Array.isArray(domains.data)) {
        console.error('Ожидался массив доменов внутри data, но получен:', domains);
        return;
    }

    const selectElement = document.getElementById('name__select');
    selectElement.innerHTML = '<option value="" selected disabled>Выберите сайт</option>';

    domains.data.forEach(domain => {
        const option = document.createElement('option');
        option.value = domain.domain_id;
        option.textContent = domain.domain_name;
        option.setAttribute('data-domain-id', domain.domain_id);
        option.setAttribute('data-ws-project-id', domain.ws_project_id);
        selectElement.appendChild(option);
    });
}
