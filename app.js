const STORAGE_KEY = 'tasks';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-state');

  list.innerHTML = '';

  if (tasks.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`);

    const span = document.createElement('span');
    span.textContent = task.title;

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
  });
}

function showError(message) {
  const el = document.getElementById('validation-error');
  el.textContent = message;
}

function clearError() {
  document.getElementById('validation-error').textContent = '';
}

function init() {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  let tasks = loadTasks();

  renderTasks(tasks);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();

    if (!title) {
      showError('Task title cannot be empty.');
      input.focus();
      return;
    }

    clearError();

    tasks.push({ id: Date.now(), title, completed: false });
    saveTasks(tasks);
    renderTasks(tasks);

    input.value = '';
    input.focus();
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      clearError();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
