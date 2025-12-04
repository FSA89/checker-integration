// services/usersRenderer.js

export function renderUsers(users) {
  if (!users || !Array.isArray(users.data)) {
    console.error("Ожидался массив командой внутри data, но получен:", users);
    return;
  }

  const list1 = document.getElementById("list1");
  list1.innerHTML =
    '<li class="dropdown-item disabled" disabled>Ответственный</li>';

  users.data.forEach((user) => {
    const liUser = document.createElement("li");
    liUser.textContent = user.name;
    liUser.classList.add("dropdown-item");
    liUser.setAttribute("data-user-id", user.id_user);
    liUser.setAttribute("data-user-name", user.name);
    liUser.setAttribute("data-command", user.department);
    selectElement.appendChild(liUser);
  });
}
