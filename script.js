const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
window.onload = loadTasks;

addBtn.addEventListener("click", addTask);

function addTask() {

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    createTask(text);

    saveTask(text);

    taskInput.value = "";
}

function createTask(text){

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = text;

    span.addEventListener("click", function(){
        span.classList.toggle("completed");
        updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", function(){
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = task.text;

        if(task.completed){
            span.classList.add("completed");
        }

        span.addEventListener("click", function(){
            span.classList.toggle("completed");
            updateLocalStorage();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click", function(){
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

}

function updateLocalStorage(){

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}