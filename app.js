const STORAGE_KEY = 'tasks';
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
const PRIORITY_LABELS = { high: 'High', medium: 'Medium', low: 'Low' };

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

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
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

  sortTasks(tasks).forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`);
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks(tasks);
      renderTasks(tasks);
    });

    const span = document.createElement('span');
    span.className = 'task-title';
    span.textContent = task.title;

    const badge = document.createElement('span');
    badge.className = `priority-badge priority-${task.priority}`;
    badge.textContent = PRIORITY_LABELS[task.priority];

    const prioritySelect = document.createElement('select');
    prioritySelect.className = 'inline-priority';
    prioritySelect.setAttribute('aria-label', `Change priority for "${task.title}"`);
    ['high', 'medium', 'low'].forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = PRIORITY_LABELS[p];
      opt.selected = p === task.priority;
      prioritySelect.appendChild(opt);
    });
    prioritySelect.addEventListener('change', () => {
      task.priority = prioritySelect.value;
      saveTasks(tasks);
      renderTasks(tasks);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(badge);
    li.appendChild(prioritySelect);
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
  const prioritySelect = document.getElementById('priority-select');
  let tasks = loadTasks();

  renderTasks(tasks);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = input.value.trim();
    const priority = prioritySelect.value;

    if (!title) {
      showError('Task title cannot be empty.');
      input.focus();
      return;
    }

    if (!priority) {
      showError('Please select a priority.');
      prioritySelect.focus();
      return;
    }

    clearError();

    tasks.push({ id: Date.now(), title, priority, completed: false });
    saveTasks(tasks);
    renderTasks(tasks);

    input.value = '';
    prioritySelect.value = '';
    input.focus();
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      clearError();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
