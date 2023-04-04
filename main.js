// Data containers: forms, user inputs, list items, and clear button
let formField = document.querySelector("#user-todo");
let todoListItems = document.querySelector("#todo-list");
let button = document.querySelector("#clear-button");
let listItem = document.querySelector("#new-to-do");
let todosArray = [];

// Load existing todos from local storage or create an empty array
todosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

// Event listener for the form element in HTML
formField.addEventListener("submit", function (e) {
  e.preventDefault();
  if (listItem.value !== "" && isNaN(listItem.value)) {
    todosArray.push(listItem.value);
    // Updating local storage with todo items
    localStorage.setItem("todos", JSON.stringify(todosArray));
    todoMaker(listItem.value);
    listItem.value = ""; // Clear the input field after submitting
  }
});

// Function that creates a new todo item and appends it to the list
let todoMaker = function (todos) {
  let userToDoEntry = document.createElement("li");
  userToDoEntry.textContent = todos;
  todoListItems.appendChild(userToDoEntry);
};

// Clear button event listener
button.addEventListener("click", function () {
  while (todoListItems.firstChild) {
    todoListItems.removeChild(todoListItems.firstChild);
  }
  // Clear local storage when clear button is clicked
  localStorage.removeItem("todos");
});

// Load existing todos from local storage and create list items for them
for (let i = 0; i < todosArray.length; i++) {
  todoMaker(todosArray[i]);
}
