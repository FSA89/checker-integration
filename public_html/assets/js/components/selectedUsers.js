// components/selectedUsersClass.js

class Dropdown {
  constructor({ buttonId, menuId, inputId, listId, data, onSelect }) {
    this.button = document.getElementById(buttonId);
    this.menu = document.getElementById(menuId);
    this.input = document.getElementById(inputId);
    this.list = document.getElementById(listId);
    this.data = data;
    this.onSelect = onSelect;

    this.init();
  }

  init() {
    this.renderList(this.data);
    this.setupFilter();
    this.setupToggle();
    this.setupSelection();
  }

  renderList(data) {
    this.list.innerHTML = "";
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.classList.add("dropdown-item");
      li.setAttribute("data-user-id", item.id_user || "");
      li.setAttribute("data-user-name", item.name);
      li.setAttribute("data-command", item.department);
      this.list.appendChild(li);
    });
  }

  setupFilter() {
    this.input.addEventListener("input", () => {
      const searchTerm = this.input.value.trim().toLowerCase();
      Array.from(this.list.getElementsByTagName("li")).forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(searchTerm)
          ? "block"
          : "none";
      });
    });
  }

  setupToggle() {
    this.button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.button.classList.toggle("active");

      if (this.menu.style.display === "block") {
        this.menu.style.display = "none";
      } else {
        this.menu.style.display = "block";
        this.input.value = "";
        Array.from(this.list.getElementsByTagName("li")).forEach(
          (item) => (item.style.display = "block")
        );
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !this.button.contains(event.target) &&
        !this.menu.contains(event.target)
      ) {
        this.menu.style.display = "none";
        this.button.classList.remove("active");
      }
    });
  }

  setupSelection() {
    this.list.addEventListener("click", (event) => {
      if (event.target && event.target.matches("li")) {
        const item = event.target;
        this.button.textContent = item.textContent;
        this.button.setAttribute(
          "data-user-id",
          item.getAttribute("data-user-id") || ""
        );
        this.button.setAttribute(
          "data-user-name",
          item.getAttribute("data-user-name")
        );
        this.button.setAttribute(
          "data-command",
          item.getAttribute("data-command")
        );
        this.menu.style.display = "none";
        this.button.classList.remove("active");

        if (this.onSelect) {
          this.onSelect(item);
        }
      }
    });
  }

  reset(label = "Выбрать") {
    this.button.textContent = label;
    this.button.removeAttribute("data-user-id");
    this.button.removeAttribute("data-user-name");
    this.button.removeAttribute("data-command");
    this.renderList(this.data);
  }
}

export function selectedUsers(users) {
  const userArray = users.data || [];
  if (!Array.isArray(userArray)) {
    console.error("Некорректный формат данных пользователей:", users);
    return;
  }

  const data1 = userArray.map((user) => ({
    id_user: user.id_user,
    name: user.name,
    department: user.department,
  }));

  const departments = [...new Set(userArray.map((u) => u.department))];
  const data2 = departments.map((dep) => ({
    id_user: "",
    name: dep,
    department: dep,
  }));

  const userDropdown = new Dropdown({
    buttonId: "button1",
    menuId: "menu1",
    inputId: "searchInput1",
    listId: "list1",
    data: data1,
  });

  const departmentDropdown = new Dropdown({
    buttonId: "button2",
    menuId: "menu2",
    inputId: "searchInput2",
    listId: "list2",
    data: data2,
    onSelect: (item) => {
      const selectedDep = item.getAttribute("data-command");
      const filteredUsers = data1.filter((u) => u.department === selectedDep);

      const responsibleButton = document.getElementById("button1");
      const responsibleDep = responsibleButton.getAttribute("data-command");

      if (responsibleDep !== selectedDep) {
        userDropdown.reset("Ответственный");
      }

      userDropdown.renderList(filteredUsers);
    },
  });

  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => {
    userDropdown.reset("Ответственный");
    departmentDropdown.reset("Команда");

    document.getElementById("tag").value = "";
    document.getElementById("graphContainer").innerHTML = "";

    // Очистка дат
    // document.getElementById("startDate").value = "";
    // document.getElementById("endDate").value = "";
  });
}
