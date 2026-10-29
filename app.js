
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const filters = document.querySelectorAll("[data-filter]");

let tasks = JSON.parse(localStorage.getItem("todo-tasks") || "[]");
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "done") return task.done;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Complete task");

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.flex = "1";

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.style.background = "#dc2626";

    remove.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, span, remove);
    list.appendChild(li);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    done: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
});

filters.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

renderTasks();
      
