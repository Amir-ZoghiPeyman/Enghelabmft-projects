// DOM NODES
const input = document.getElementById("input");
const btn = document.getElementById("add-btn");
const root = document.getElementById("root");

let editableItemId = null;

let TODOS = [
  {
    id: 0,
    text: "running",
    isDone: false,
  },
  {
    id: 1,
    text: "shopping",
    isDone: false,
  },
];

function addTodo() {
  debugger;
  const inputVal = input.value;
  const newId = Math.floor(Math.random() * 1000000000000);

  const newTodo = {
    id: newId,
    text: inputVal,
    isDone: false,
  };

  TODOS.push(newTodo);

  input.value = "";

  render();
}

function render() {
  const template = TODOS.map((todo) => {
    if (todo.id === editableItemId) {
      return `
        <li>
            <input id="editInput" type="text" value="${todo.text}">
            <i class="fa-solid fa-check" onclick="submitEdit(${todo.id})"></i>
        </li>
    `;
    }

    return `
            <li>
                ${todo.text}
                <i class="fa-solid fa-trash" onclick="deleteTodo(${todo.id})"></i>
                <i class="fa-solid fa-pen-to-square" onclick="editTodo(${todo.id})"></i>
            </li>
        `;
  }).join("");

  root.innerHTML = template;
}

render();

function submitEdit(todoId) {
  const editInput = document.getElementById("editInput");

  const newTodos = TODOS.map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        text: editInput.value,
      };
    } else {
      return todo;
    }
  });

  TODOS = newTodos;

  editableItemId = null;

  render();
}

function editTodo(todoId) {
  editableItemId = todoId;

  render();
}

function deleteTodo(todoId) {
  const newTodos = TODOS.filter((todo) => todo.id != todoId);

  TODOS = newTodos;

  render();
}

// EVENTS
input.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    addTodo();
  }
});
