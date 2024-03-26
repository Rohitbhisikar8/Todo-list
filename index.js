var todoArray = [];

function saveTodos() {
    var title = document.getElementById("title").value;
    todoArray.push(title);
    localStorage.setItem("todos", todoArray.toString());
    fetchTodos();
    document.getElementById("title").value = "";
}

function fetchTodos() {
    var str = localStorage.getItem("todos");
    todoArray = str ? str.split(",") : [];
    var htmlString = `
    <tr>
        <th>sr.no.</th>
        <th>Title</th>
        <th>Actions</th>
    </tr>
    `;

    for (var i = 0; i < todoArray.length; i++) {
        htmlString += `
        <tr>
            <td>${i + 1}</td>
            <td>${todoArray[i]}</td>
            <td>
                <button class="btn btn-outline-warning" onclick="editTodo(${i})">Edit</button>
                <button class="btn btn-outline-danger" onclick="deleteTodo(${i})">Delete</button>
            </td>
        </tr>
        `;
    }

    document.getElementById("todo-table").innerHTML = htmlString;
}

function editTodo(index) {
    var newValue = prompt("Do you want to change?", todoArray[index]);
    if (newValue !== null && newValue !== "") {
        todoArray[index] = newValue;
        localStorage.setItem("todos", todoArray.toString());
        fetchTodos();
    }
}

function deleteTodo(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        todoArray.splice(index, 1);
        localStorage.setItem("todos", todoArray.toString());
        fetchTodos();
    }
}

function removeAllTodos() {
    localStorage.removeItem("todos");
    todoArray = [];
    document.getElementById("todo-table").innerHTML = "";
}

fetchTodos(); // Fetch todos on page load
