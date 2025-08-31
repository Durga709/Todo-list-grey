// Select elements
const taskField = document.getElementById("taskField");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Event: Add new task
addBtn.addEventListener("click", addTask);
taskField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Function to add task
function addTask() {
  const taskText = taskField.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskField.value = "";
  saveTasks();
}

// Save tasks in local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (!saved) return;
  const tasks = JSON.parse(saved);

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");  
    span.textContent = task.text;  
    span.addEventListener("click", () => {  
      li.classList.toggle("completed");  
      saveTasks();  
    });  

    if (task.completed) {  
      li.classList.add("completed");  
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(span);  
    li.appendChild(delBtn);  
    taskList.appendChild(li);
  });
}

// Initialize app
loadTasks();
