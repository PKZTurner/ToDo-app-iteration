// Data containers: forms, user inputs, list items, and clear button
const formField = document.querySelector("#user-todo");
const todoListItems = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-button");
const inputField = document.querySelector("#new-to-do");
let todosArray = [];

// Load existing todos from local storage or create an empty array
todosArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

// Event listener for the form element in HTML
formField.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputField.value.trim() !== "") {
    todosArray.push({ task: inputField.value.trim(), completed: false });
    // Updating local storage with todo items
    localStorage.setItem("todos", JSON.stringify(todosArray));
    todoMaker(inputField.value.trim(), todosArray.length - 1);
    inputField.value = ""; // Clear the input field after submitting
  }
});

// Function that creates a new todo item and appends it to the list
const todoMaker = function (todo, index) {
  const userToDoEntry = document.createElement("li");
  userToDoEntry.textContent = todo.task;
  if (todo.completed) {
    userToDoEntry.classList.add("completed");
  }
  userToDoEntry.addEventListener("click", function () {
    todo.completed = !todo.completed;
    localStorage.setItem("todos", JSON.stringify(todosArray));
    userToDoEntry.classList.toggle("completed");
  });
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    todosArray.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosArray));
    userToDoEntry.remove();
  });
  userToDoEntry.appendChild(deleteButton);
  todoListItems.appendChild(userToDoEntry);
};

// Clear button event listener
clearButton.addEventListener("click", function () {
  while (todoListItems.firstChild) {
    todoListItems.removeChild(todoListItems.firstChild);
  }
  // Clear local storage when clear button is clicked
  localStorage.removeItem("todos");
  todosArray = [];
});

// Load existing todos from local storage and create list items for them
for (let i = 0; i < todosArray.length; i++) {
  todoMaker(todosArray[i], i);
}
