// services/zerocountRenderer.js

import { fetchZerocount } from "../api/zerocountService.js";

export async function zerocountRenderer(domainName) {
  try {
    const response = await fetchZerocount();
    const data = response.data;

    if (!Array.isArray(data)) {
      console.error("Ожидался массив в data, но получен:", data);
      return;
    }

    const filtered = data.filter((item) => item.project_name === domainName);

    // console.log("Найденные объекты:", filtered);

    const uniqueTaskIds = new Set(filtered.map((item) => item.task_id));
    const count = uniqueTaskIds.size;

    // console.log("count ", count);

    const tasks = filtered.map((item) => ({
      task_id: item.task_id,
      title: item.title,
      task_url: item.task_url,
      project_name: item.project_name,
      integration_date: item.integration_date,
      next_sunday: item.next_sunday,
      tag_value: item.tag_value,
    }));

    // console.log("count, tasks ", count, tasks);

    return { count, tasks };
  } catch (error) {
    console.error("Ошибка при получении zerocount:", error);
  }
}

// zerocountRenderer("alco-help.ru");
