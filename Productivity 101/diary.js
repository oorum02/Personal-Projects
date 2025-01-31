// 🎨 Set up a cozy theme with user-selected color
const colour = prompt("Pick a cozy theme color (e.g., pink, blue, green)");
localStorage.setItem("theme-color", colour || "#FCE4EC"); // Default soft pink

// 📝 Retrieve todos from local storage
const storedTodos = localStorage.getItem("diaryTodos");
let todos = storedTodos ? JSON.parse(storedTodos) : [];

// 🌟 Motivational messages
const messages = [
  "You're doing great! Keep going! 🌟",
  "One step at a time. You got this! 💪",
  "Every little effort counts! 🎯",
  "Write it down, make it happen! ✨",
];

// Request notification permission
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Save todos
function saveTodos() {
  localStorage.setItem("diaryTodos", JSON.stringify(todos));
}

// Render todos beautifully
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("diary-entry");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodoCompleted(index));

    const text = document.createElement("span");
    text.innerText = todo.text;
    if (todo.completed) text.classList.add("completed");

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = todo.dueDate || "";
    dateInput.addEventListener("change", (e) => updateDueDate(index, e.target.value));

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerText = "❌";
    removeBtn.addEventListener("click", () => removeTodo(index));

    listItem.appendChild(checkbox);
    listItem.appendChild(text);
    listItem.appendChild(dateInput);
    listItem.appendChild(removeBtn);
    todoList.appendChild(listItem);
  });

  // Show a random motivational message
  document.getElementById("motivation").innerText =
    messages[Math.floor(Math.random() * messages.length)];
}

// Add a new task like writing in a diary 📖
function addTodo() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();

  if (text !== "") {
    todos.push({ text, completed: false, dueDate: null });
    input.value = "";
    saveTodos();
    renderTodos();
  }
}

// Update due date
function updateDueDate(index, date) {
  todos[index].dueDate = date;
  saveTodos();
  checkReminders();
}

// Toggle task completion with animation
function toggleTodoCompleted(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();

  if (todos[index].completed) {
    const completedMsg = document.createElement("p");
    completedMsg.innerText = "✅ Well done!";
    completedMsg.classList.add("task-done");
    document.body.appendChild(completedMsg);
    setTimeout(() => completedMsg.remove(), 1500);
  }
}

// Remove a task
function removeTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Check reminders for upcoming tasks
function checkReminders() {
  const today = new Date().toISOString().split("T")[0];

  todos.forEach((todo) => {
    if (todo.dueDate === today) {
      new Notification("⏰ Reminder!", { body: `Task due today: ${todo.text}` });
    }
  });
}

// Event listener for pressing "Enter"
document.getElementById("todo-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Load tasks on page load
renderTodos();
setInterval(checkReminders, 60000); // Check every minute
