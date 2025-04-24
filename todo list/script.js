let todoList = [];

const addButton = document.getElementById("add-button");
const todoInput = document.getElementById("todo-input");
const deleteAllButton = document.getElementById("delete-all");
const deleteSelectedButton = document.getElementById("delete-selected");
const allTodos = document.getElementById("all-todos");

const rCount = document.getElementById("r-count");
const cCount = document.getElementById("c-count");

addButton.addEventListener("click", add);
todoInput.addEventListener("keypress", e => {
  if (e.key === "Enter") add();
});
deleteAllButton.addEventListener("click", deleteAll);
deleteSelectedButton.addEventListener("click", deleteCompleted);

document.addEventListener("click", e => {
  const cls = e.target.classList[0];
  if (cls === "complete" || cls === "ci") toggleComplete(e);
  if (cls === "delete" || cls === "di") deleteTodo(e);
  if (["all", "rem", "com"].includes(e.target.id)) filterTasks(e.target.id);
});

function updateCounts() {
  const completed = todoList.filter(t => t.complete).length;
  rCount.textContent = todoList.length;
  cCount.textContent = completed;
}

function add() {
  const value = todoInput.value.trim();
  if (!value) {
    alert("Please enter a valid task.");
    return;
  }

  todoList.push({ id: Date.now().toString(), task: value, complete: false });
  todoInput.value = "";
  render(todoList);
}

function render(list) {
  allTodos.innerHTML = "";
  list.forEach(({ id, task, complete }) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.id = id;

    li.innerHTML = `
      <p id="task">${complete ? `<strike>${task}</strike>` : task}</p>
      <div class="todo-actions">
        <button class="complete"><i class="ci bx bx-check bx-sm"></i></button>
        <button class="delete"><i class="di bx bx-trash bx-sm"></i></button>
      </div>
    `;
    allTodos.appendChild(li);
  });
  updateCounts();
}

function deleteTodo(e) {
  const id = e.target.closest("li").id;
  todoList = todoList.filter(t => t.id !== id);
  render(todoList);
}

function toggleComplete(e) {
  const id = e.target.closest("li").id;
  todoList = todoList.map(t =>
    t.id === id ? { ...t, complete: !t.complete } : t
  );
  render(todoList);
}

function deleteAll() {
  todoList = [];
  render(todoList);
}

function deleteCompleted() {
  todoList = todoList.filter(t => !t.complete);
  render(todoList);
}

function filterTasks(type) {
  if (type === "all") render(todoList);
  else if (type === "rem") render(todoList.filter(t => !t.complete));
  else if (type === "com") render(todoList.filter(t => t.complete));
}
