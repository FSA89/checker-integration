// serbvices/graphRenderer.js

import { zerocountRenderer } from "../services/zerocountRenderer.js";

export class GraphRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(response) {
    if (!response || response.status !== "success") {
      console.log("Нет данных для построения графика.");
      return;
    }
    // console.log(response);

    const dataByUser = this.groupBy(response.data, "user_name");
    this.container.innerHTML = "";

    const getInitials = (name) =>
      name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    for (const [user, userItems] of Object.entries(dataByUser)) {
      const userBlock = new UserBlock(user, userItems);
      this.container.appendChild(userBlock.render());
    }

    if (Object.keys(dataByUser).length > 1) {
      const fixedWrapper = document.createElement("div");
      fixedWrapper.className = "graff-fixed";

      let currentlyActiveUser = null;

      const updateActiveUser = (user) => {
        currentlyActiveUser = user;

        fixedWrapper.querySelectorAll(".graff-fixed-name").forEach((el) => {
          el.classList.remove("active");
          el.textContent = el.dataset.short;
        });

        const fixedEl = fixedWrapper.querySelector(`[data-user="${user}"]`);
        if (fixedEl) {
          fixedEl.classList.add("active");
          fixedEl.textContent = fixedEl.dataset.full;
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          let maxRatio = 0;
          let mostVisibleEntry = null;

          entries.forEach((entry) => {
            if (entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              mostVisibleEntry = entry;
            }
          });

          if (mostVisibleEntry) {
            const id = mostVisibleEntry.target.id;
            const user = id.replace("user-block-", "").replace(/-/g, " ");

            if (currentlyActiveUser !== user) {
              updateActiveUser(user);
            }
          }
        },
        {
          threshold: Array.from({ length: 11 }, (_, i) => i / 10),
          rootMargin: "-20% 0px -60% 0px",
        }
      );

      for (const user of Object.keys(dataByUser)) {
        const fixedHeader = document.createElement("div");
        fixedHeader.className = "graff-fixed-header";

        const fixedName = document.createElement("div");
        fixedName.className = "graff-fixed-name";
        fixedName.textContent = getInitials(user);
        fixedName.dataset.user = user;
        fixedName.dataset.full = user;
        fixedName.dataset.short = getInitials(user);

        // Клик: скролл к началу блока и обновление активного
        fixedName.addEventListener("click", () => {
          const targetId = `user-block-${user.replace(/\s+/g, "-")}`;
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

            // Задержка, чтобы дать время скроллу, можно уменьшить
            setTimeout(() => {
              updateActiveUser(user);
            }, 500);
          }
        });

        fixedHeader.appendChild(fixedName);
        fixedWrapper.appendChild(fixedHeader);

        const targetBlock = document.getElementById(
          `user-block-${user.replace(/\s+/g, "-")}`
        );
        if (targetBlock) {
          observer.observe(targetBlock);
        }
      }

      this.container.prepend(fixedWrapper);
    }
  }

  groupBy(array, key) {
    return array.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});
  }
}

class UserBlock {
  constructor(user, userItems) {
    this.user = user;
    this.userItems = userItems;
    this.department = userItems[0].department;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "graff";
    wrapper.id = `user-block-${this.user.replace(/\s+/g, "-")}`;
    wrapper.innerHTML = `
      <div class="graff-header">
        <div class="graff-name">${this.user}</div>
        <div class="graff-command">${this.department}</div>
      </div>
    `;

    // === СВОДКА ПЕРЕД КОНТЕНТОМ ===
    const sites = this.groupBy(this.userItems, "name");
    const projectsCount = Object.keys(sites).length;

    const summary = document.createElement("div");
    summary.className = "graff-summary";
    summary.innerHTML = `
      <div class="summary-item">Проекты: <span class="summary-projects">${projectsCount}</span></div>
      <div class="summary-item">Внедрения: <span class="summary-impl">0</span></div>
      <div class="summary-item">Не отслеживаемых внедрений: <span class="summary-notimpl">0</span></div>
      <button class="summary-toggle" type="button" aria-expanded="false">Развернуть</button>
    `;

    const summaryProjectsEl = summary.querySelector(".summary-projects");
    const summaryImplEl = summary.querySelector(".summary-impl");
    const summaryNotImplEl = summary.querySelector(".summary-notimpl");
    const summaryToggleBtn = summary.querySelector(".summary-toggle");

    // Контейнер контента (сайты, задачи)
    const content = document.createElement("div");
    content.className = "graff-content";
    content.style.display = "none"; // по умолчанию свёрнуто

    // Аккордеон — переключатель
    const toggle = () => {
      const willOpen = !wrapper.classList.contains("open");

      // Закрываем соседей, если открываем этот
      if (willOpen) {
        wrapper.parentElement?.querySelectorAll(".graff.open").forEach((el) => {
          if (el !== wrapper) {
            el.classList.remove("open");
            const c = el.querySelector(".graff-content");
            if (c) collapse(c);
            const b = el.querySelector(".summary-toggle");
            if (b) {
              b.setAttribute("aria-expanded", "false");
              b.textContent = "Развернуть";
            }
          }
        });
      }

      wrapper.classList.toggle("open");
      if (willOpen) expand(content);
      else collapse(content);

      summaryToggleBtn.setAttribute(
        "aria-expanded",
        willOpen ? "true" : "false"
      );
      summaryToggleBtn.textContent = willOpen ? "Свернуть" : "Развернуть";
      summaryToggleBtn.textContent = willOpen ? "Свернуть" : "Развернуть";
    };

    function expand(el) {
      if (el.dataset.animating === "true") return;
      el.dataset.animating = "true";

      el.style.removeProperty("display");
      if (window.getComputedStyle(el).display === "none")
        el.style.display = "flex";

      const height = el.scrollHeight + "px";
      el.style.height = "0px";
      el.style.overflow = "hidden";
      el.style.transition = "height 0.3s ease";

      requestAnimationFrame(() => {
        el.style.height = height;
      });

      el.addEventListener(
        "transitionend",
        () => {
          el.style.height = "auto";
          el.style.overflow = "";
          el.style.transition = "";
          el.dataset.animating = "false";
        },
        { once: true }
      );
    }

    function collapse(el) {
      if (el.dataset.animating === "true") return;
      el.dataset.animating = "true";

      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
      el.style.transition = "height 0.3s ease";

      requestAnimationFrame(() => {
        el.style.height = "0px";
      });

      el.addEventListener(
        "transitionend",
        () => {
          el.style.display = "none";
          el.style.height = "";
          el.style.overflow = "";
          el.style.transition = "";
          el.dataset.animating = "false";
        },
        { once: true }
      );
    }

    // wrapper.querySelector(".graff-header").addEventListener("click", toggle);
    summary.addEventListener("click", (e) => {
      // кликабельна вся панель сводки, включая кнопку
      e.preventDefault();
      toggle();
    });

    // Подсчёт «Внедрения» (сумма по всем проектам)
    let implTotal = 0;

    for (const [site, siteItems] of Object.entries(sites)) {
      // количество уникальных task_id для сайта = то же число, что в .graff-col__implementation
      const uniqTasksCount = new Set(siteItems.map((i) => i.task_id)).size;
      implTotal += uniqTasksCount;

      const siteBlock = new SiteBlock(site, siteItems);
      content.appendChild(siteBlock.render());
    }
    summaryImplEl.textContent = implTotal;

    // Асинхронное накопление «Не отслеживаемых внедрений»
    let notImplTotal = 0;
    wrapper.addEventListener("notimpl:loaded", (e) => {
      const add = Number(e.detail?.count || 0);
      notImplTotal += add;
      summaryNotImplEl.textContent = notImplTotal;
    });

    // Вставляем сводку и контент
    wrapper.appendChild(summary);
    wrapper.appendChild(content);

    return wrapper;
  }

  groupBy(array, key) {
    return array.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});
  }
}

function getVnedrenieWord(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "внедрений";
  }

  if (lastDigit === 1) {
    return "внедрение";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "внедрения";
  }

  return "внедрений";
}

class SiteBlock {
  constructor(site, siteItems) {
    this.site = site;
    this.siteItems = siteItems;
    this.taskGroups = this.groupBy(siteItems, "task_id");
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "graff-group";

    const count = Object.keys(this.taskGroups).length;
    const word = getVnedrenieWord(count);

    wrapper.innerHTML = `
      <div class="graff-top">
        <div class="graff-top__item"><div class="graff-site">${this.site}</div></div>
        <div class="graff-top__item"><div class="graff-col__implementation">${count} - ${word}</div></div>
        <div class="graff-top__item">
          <div class="graff-col__notimplementation">
            Не отслеживаемых внедрений<span class="not-count"></span>
          </div>
        </div>
        <button class="graff-top-toggle" type="button" aria-expanded="false">Развернуть</button>
      </div>
    `;

    const graffTop = wrapper.querySelector(".graff-top");
    const topToggleBtn = graffTop.querySelector(".graff-top-toggle");
    const notImplSpan = wrapper.querySelector(".not-count");

    // === считаем "Не отслеживаемые внедрения" ===
    setTimeout(() => {
      const domain = this.site;

      zerocountRenderer(domain).then((result) => {
        if (result) {
          const { count, tasks } = result;

          if (notImplSpan) {
            notImplSpan.textContent = count;

            const imgDownload = document.createElement("img");
            imgDownload.src = "/assets/img/icons/download1.png";
            imgDownload.alt = "Download";
            imgDownload.className = "graff-col__icon";
            notImplSpan.appendChild(imgDownload);

            imgDownload.addEventListener("click", (e) => {
              e.stopPropagation();

              const data = tasks.map((task) => [
                task.title,
                task.task_url,
                task.project_name,
                task.tag_value,
                task.integration_date,
              ]);

              const headers = [
                "Title",
                "Task url",
                "Project Name",
                "Tag value",
                "Integration date",
              ];
              const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

              worksheet["!cols"] = [
                { wch: 80 },
                { wch: 60 },
                { wch: 30 },
                { wch: 40 },
                { wch: 30 },
              ];

              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");
              XLSX.writeFile(
                workbook,
                `Не отслеживаемые внедрения для ${domain}.xlsx`
              );
            });
          }

          // красим в красный, если есть неотслеживаемые
          if (Number(count) > 0) {
            notImplSpan.classList.add("red");
          } else {
            notImplSpan.classList.remove("red");
          }

          // Сообщаем наверх (для UserBlock), чтобы обновилась сводка
          wrapper.dispatchEvent(
            new CustomEvent("notimpl:loaded", {
              bubbles: true,
              detail: { count: Number(count) || 0 },
            })
          );
        }
      });
    }, 0);

    // === контент ===
    const contContainer = document.createElement("div");
    contContainer.className = "graff-cont-wrapper";

    const sortedGroups = Object.values(this.taskGroups).sort((a, b) => {
      const dateA = new Date(a[0].date || a[0].updated_at || a[0].created_at);
      const dateB = new Date(b[0].date || b[0].updated_at || b[0].created_at);
      return dateB - dateA;
    });

    const graffContBlocks = sortedGroups.map((taskItems) => {
      const block = new TaskBlock(taskItems);
      return block.render();
    });

    graffContBlocks.forEach((block, index) => {
      if (index >= 3) block.style.display = "none";
      contContainer.appendChild(block);
    });

    wrapper.appendChild(contContainer);

    // === load more ===
    let loadMoreBtn = null;
    if (graffContBlocks.length > 3) {
      loadMoreBtn = document.createElement("button");
      loadMoreBtn.textContent = "Загрузить ещё";
      loadMoreBtn.className = "graff-load-more";

      // изначально скрываем, если аккордеон свернут
      loadMoreBtn.style.display = wrapper.classList.contains("open")
        ? "block"
        : "none";

      wrapper.appendChild(loadMoreBtn);

      let visibleCount = 3;
      loadMoreBtn.addEventListener("click", () => {
        const toShow = graffContBlocks.slice(visibleCount, visibleCount + 3);
        toShow.forEach((el) => (el.style.display = ""));
        visibleCount += 3;

        if (visibleCount >= graffContBlocks.length) {
          loadMoreBtn.style.display = "none";
        }
      });
    }

    // === аккордеон ===
    topToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.toggle("open");
      contContainer.style.display = isOpen ? "block" : "none";
      topToggleBtn.textContent = isOpen ? "Свернуть" : "Развернуть";
      topToggleBtn.setAttribute("aria-expanded", isOpen);

      if (loadMoreBtn) {
        if (!isOpen) {
          loadMoreBtn.style.display = "none";
        } else {
          const hiddenBlocks = graffContBlocks.filter(
            (el) => el.style.display === "none"
          );
          loadMoreBtn.style.display =
            hiddenBlocks.length > 0 ? "block" : "none";
        }
      }
    });

    return wrapper;
  }

  groupBy(array, key) {
    return array.reduce((acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});
  }
}

class TaskBlock {
  constructor(taskItems) {
    this.taskItems = taskItems;
  }

  render() {
    const container = document.createElement("div");
    container.className = "graff-cont";

    const tagGroup = {};
    for (const item of this.taskItems) {
      const key = `${item.tag_value || "null"}::${item.title}`;
      if (!tagGroup[key]) tagGroup[key] = item;
    }

    const center = document.createElement("div");
    center.className = "graff-center";

    for (const item of Object.values(tagGroup)) {
      const progress = Math.round(parseFloat(item.progress || 0));
      const tag = item.tag_value
        ? `<div class="graff-tag__text">${item.tag_value}</div>`
        : `<div class="graff-tag__text"><span class="triangle-icon">⚠️ Без тега </span></div>`;

      center.innerHTML += `
        <div class="graff-tag">
          <div class="graff-tag__inner">
            <div class="graff-tag__item">
              ${tag}
              <div class="graff-tag__implementation">${item.title} ${
        item.integration_date
      }</div>
              <div class="graff-tag__vned">Страниц с внедрением: <strong>${
                Number(item.nan_id) + Number(item.not_nan_id)
              }</strong></div>
            </div>
            <div class="graff-tag__item">
              <div class="graff-progress">
                <div class="progress-block">
                  <div class="progress-circle-wrapper">
                    <svg class="progress-svg" viewBox="0 0 36 36">
                      <path class="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="#e6e6e6" stroke-width="3" fill="none" />
                      <path class="progress-circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke="#0b507d" stroke-width="3" fill="none" stroke-dasharray="100, 100" stroke-dashoffset="100" />
                    </svg>
                    <div class="progress-num-circle">
                      <span>${progress}</span>%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const current = center.lastElementChild;
      const circle = current.querySelector(".progress-circle");
      if (circle) {
        const r = 15.9155;
        const circ = 2 * Math.PI * r;
        const offset = circ - (progress / 100) * circ;
        circle.style.strokeDasharray = `${circ} ${circ}`;
        circle.style.strokeDashoffset = offset;
      }
    }

    container.appendChild(center);

    const regionGroups = {};
    for (const item of this.taskItems) {
      const region = item.region_name || "Без региона";
      const key = `${item.search_engine}::${item.is_mobile}`;
      if (!regionGroups[region]) regionGroups[region] = {};
      if (!regionGroups[region][key]) regionGroups[region][key] = [];
      regionGroups[region][key].push(item);
    }

    for (const [region, devices] of Object.entries(regionGroups)) {
      const regionDiv = document.createElement("div");
      regionDiv.className = "graff-region";
      regionDiv.textContent = region;
      container.appendChild(regionDiv);

      const inner = document.createElement("div");
      inner.className = "graff-inner";

      for (const [deviceKey, items] of Object.entries(devices)) {
        const [searchEngine, isMobile] = deviceKey.split("::");
        const deviceName = isMobile === "0" ? "ПК" : "Мобила";

        const positions = items
          .map((i) => parseFloat(i.avg_position))
          .filter((v) => !isNaN(v));
        const visits = items
          .map((i) => parseFloat(i.avg_visits))
          .filter((v) => !isNaN(v));

        const maxPosition = positions.length
          ? Math.max(...positions).toFixed(2)
          : "-";
        const maxVisits = visits.length ? Math.max(...visits).toFixed(0) : "-";

        const searchIcon =
          searchEngine === "google"
            ? '<img src="/assets/img/logo/Google.webp" alt="Google" class="graff-icon" />'
            : searchEngine === "yandex"
            ? '<img src="/assets/img/logo/Yandex.png" alt="Yandex" class="graff-icon" />'
            : `<span class="graff-text">${searchEngine}</span>`;

        const deviceIcon =
          isMobile === "0"
            ? '<img src="/assets/img/logo/laptop.avif" alt="ПК" class="graff-icon" />'
            : '<img src="/assets/img/logo/phone.svg" alt="Мобила" class="graff-icon" />';

        const domain = extractDomain(items[0].name);

        const params = new URLSearchParams({
          name: domain,
          region_name: items[0].region_name,
          is_mobile: items[0].is_mobile,
          title: items[0].title,
        });

        // console.log(params.toString());

        const link = document.createElement("a");
        link.href = `/checker?${params.toString()}`;
        link.className = "graff-item";

        link.innerHTML = `
        <div class="graff-item__top">
          <div class="graff-search">${searchIcon}</div>
          <div class="graff-devais">${deviceIcon}</div>
        </div>
        <div class="graff-item__group">
          <div class="graff-item__position">
            <div class="graff-item__title">Позиция</div>
            <div class="graff-task__group">
              <div class="graff-item__task">
              <div class="graff-item__max">${maxPosition}</div>
                <div class="graff-item__rost"></div>
              </div>
              <div class="graff-echart"></div>
            </div>
          </div>
          <div class="graff-item__traffic">
            <div class="graff-item__title">Трафик</div>
            <div class="graff-task__group">
              <div class="graff-item__task">
                <div class="graff-item__max">${maxVisits}</div>
                <div class="graff-item__rost"></div>
              </div>
              <div class="graff-echart"></div>
            </div>
          </div>
        </div>
      `;

        inner.appendChild(link);

        const [positionEl, trafficEl] = link.querySelectorAll(".graff-echart");

        const [positionRostEl, trafficRostEl] =
          link.querySelectorAll(".graff-item__rost");

        const firstPosition = positions[0];
        const lastPosition = positions[positions.length - 1];

        const firstTraffic = visits[0];
        const lastTraffic = visits[visits.length - 1];

        // --- Позиция ---
        if (!isNaN(firstPosition) && !isNaN(lastPosition)) {
          let delta = ((firstPosition - lastPosition) / firstPosition) * 100;
          let percentChange = Math.abs(delta).toFixed(1) + "%";

          if (firstPosition > lastPosition) {
            // Улучшение
            positionRostEl.textContent = "+" + percentChange;
            positionRostEl.classList.add("green");
          } else if (firstPosition < lastPosition) {
            // Ухудшение
            positionRostEl.textContent = "-" + percentChange;
            positionRostEl.classList.add("red");
          } else {
            // Стагнация
            positionRostEl.textContent = "0%";
            positionRostEl.classList.add("grey");
          }
        }

        // --- Трафик ---
        if (!isNaN(firstTraffic) && !isNaN(lastTraffic)) {
          let delta = ((lastTraffic - firstTraffic) / firstTraffic) * 100;
          let percentChange = Math.abs(delta).toFixed(1) + "%";

          if (lastTraffic > firstTraffic) {
            // Рост
            trafficRostEl.textContent = "+" + percentChange;
            trafficRostEl.classList.add("green");
          } else if (lastTraffic < firstTraffic) {
            // Падение
            trafficRostEl.textContent = "-" + percentChange;
            trafficRostEl.classList.add("red");
          } else {
            // Стагнация
            trafficRostEl.textContent = "0%";
            trafficRostEl.classList.add("grey");
          }
        }

        setTimeout(() => {
          renderSparkline(positionEl, positions, "position");
          renderSparkline(trafficEl, visits, "traffic");
        }, 0);
      }

      container.appendChild(inner);
    }

    return container;
  }
}

function extractDomain(rawName) {
  const domainRegex = /([a-zA-Z0-9.-]+\.[a-z]{2,})/g;

  const matches = rawName.match(domainRegex);
  if (matches && matches.length > 0) {
    return matches[matches.length - 1];
  }

  let cleaned = rawName.split(" ")[0].trim();
  cleaned = cleaned.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return cleaned;
}

export function renderGraph(response) {
  const renderer = new GraphRenderer("graphContainer");
  renderer.render(response);
}

function renderSparkline(container, data, type = "position") {
  if (!container || !Array.isArray(data) || data.length === 0) return;

  const first = data[0];
  const last = data[data.length - 1];
  let color = "#8c8c8c";
  let trend = "стагнация";

  if (Math.abs(first - last) < 0.0001) {
    color = "#8c8c8c";
    trend = "стагнация"; // Стагнация
    data = [first, first, first, first]; // если вдруг одно значение приходит за данный период, пихаем сюда еще для построения графика
  } else {
    if (type === "position") {
      if (first > last) {
        color = "#52c41a"; // 🔻 позиция улучшилась (меньше — лучше)
        trend = "позиция упала";
      } else {
        color = "#ff4d4f"; // 🔺 позиция ухудшилась
        trend = "позиция выросла";
      }
    } else if (type === "traffic") {
      if (first > last) {
        color = "#ff4d4f"; // 🔻 трафик упал
        trend = "трафик упал";
      } else {
        color = "#52c41a"; // 🔺 трафик вырос
        trend = "трафик вырос";
      }
    }
  }

  const chart = echarts.init(container);
  const option = {
    animation: true,
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
    xAxis: {
      type: "category",
      show: false,
      data: data.map((_, i) => i),
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data,
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { color, width: 2 },
        areaStyle: { color, opacity: 0.2 },
      },
    ],
  };
  chart.setOption(option);
}
