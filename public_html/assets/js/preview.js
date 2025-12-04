// preview.js

import { selectedUsers } from "./components/selectedUsers.js";
import "./components/date-choise.js";
import "./components/search-tag.js";
import "./components/back-to-top.js";
import { colorTag } from "./components/color-tag.js";

import { fetchUsers } from "./api/usersService.js";
import { fetchWeeklymetricsService } from "./api/weeklymetricsService.js";

import { handleErrors } from "./services/handleErrors.js";
import { showPreloader, hidePreloader } from "./components/preloader.js";
import { renderGraph } from "./services/graphRenderer.js";
import { zerocountRenderer } from "./services/zerocountRenderer.js";

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

const tag = document.querySelector(".tag");
tag.style.display = "none";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const users = await fetchUsers();
    // console.log("users ", users);

    selectedUsers(users);
  } catch (error) {
    handleErrors(error);
  }
});

let button1UserId = null;
let button1UserName = null;
let button1Usercommand = null;
let button2Usercommand = null;
let datePeriodStart = null;
let datePeriodEnd = null;

async function loadWeeklyMetrics() {
  button1UserId = button1.getAttribute("data-user-id");
  button1UserName = button1.getAttribute("data-user-name");
  button1Usercommand = button1.getAttribute("data-command");
  button2Usercommand = button2.getAttribute("data-command");
  datePeriodStart = datePeriod.getAttribute("data-date-start");
  datePeriodEnd = datePeriod.getAttribute("data-date-end");

  const username = button1UserId ? button1UserName : null;
  const department = button1UserId ? button1Usercommand : button2Usercommand;
  const tagvalue = null;
  const startdate = datePeriodStart;
  const enddate = datePeriodEnd;

  if ((button1UserId && !username) || !department || !startdate || !enddate) {
    // console.log("Не хватает данных для загрузки. Пропускаем.");
    return;
  }

  // console.log("button1Usercommand:", button1Usercommand);
  // console.log("button2Usercommand:", button2Usercommand);

  // console.log("username " + username);
  // console.log("department " + department);
  // console.log("startdate " + startdate);
  // console.log("enddate " + enddate);

  showPreloader();
  tag.style.display = "block";

  try {
    const response = await fetchWeeklymetricsService(
      username,
      department,
      tagvalue,
      startdate,
      enddate
    );
    hidePreloader();

    renderGraph(response);
    colorTag();
    zerocountRenderer();
  } catch (error) {
    console.error("Ошибка при fetchWeeklymetricsService:", error);
    hidePreloader();
  }
}

function observeChanges(button) {
  const observer = new MutationObserver(() => {
    loadWeeklyMetrics();
  });

  observer.observe(button, {
    attributes: true,
    attributeFilter: ["data-user-id", "data-user-name", "data-command"],
  });
}

function observeDatePeriodChanges() {
  const observer = new MutationObserver(() => {
    loadWeeklyMetrics();
  });

  observer.observe(datePeriod, {
    attributes: true,
    attributeFilter: ["data-date-start", "data-date-end"],
  });
}

const datePeriod = document.querySelector(".date-range-container");

observeChanges(button1);
observeChanges(button2);
observeDatePeriodChanges();
