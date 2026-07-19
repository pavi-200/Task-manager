let tasks = [];

function addTask() {

    let title =
    document.getElementById("taskTitle").value;

    let priority =
    document.getElementById("priority").value;

    if(title === "") {
        alert("Enter Task Title");
        return;
    }

    tasks.push({
        title: title,
        priority: priority,
        status: "Pending"
    });

    displayTasks();

    document.getElementById("taskTitle").value = "";
}

function displayTasks() {

    let taskList =
    document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        taskList.innerHTML += `
        <tr>
            <td>${task.title}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>
                <button
                class="btn btn-success btn-sm"
                onclick="completeTask(${index})">
                Complete
                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteTask(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    updateStats();
}

function completeTask(index) {

    tasks[index].status = "Completed";

    displayTasks();
}

function deleteTask(index) {

    tasks.splice(index,1);

    displayTasks();
}

function updateStats() {

    document.getElementById("totalTasks").innerText =
    tasks.length;

    document.getElementById("completedTasks").innerText =
    tasks.filter(task =>
    task.status === "Completed").length;

    document.getElementById("pendingTasks").innerText =
    tasks.filter(task =>
    task.status === "Pending").length;
}

function searchTasks() {

    let search =
    document.getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll("#taskList tr");

    rows.forEach(row => {

        if(row.innerText
        .toLowerCase()
        .includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";
        }
    });
}