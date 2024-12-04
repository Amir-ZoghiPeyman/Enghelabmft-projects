// DOM NODES
const input = document.getElementById("input");
const btn = document.getElementById("add-btn");
const root = document.getElementById("root");

let editableItemId = null;
let TODOS = [];

function addTodo() {
  const inputVal = input.value;

  if (inputVal) {
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
}

function render() {
  const template = TODOS.map((todo) => {
    if (todo.id === editableItemId) {
      return `
      <div>
        <li>
            <input class="bg-slate-100 rounded-md px-2" id="editInput" type="text" value="${todo.text}">
            <i class="ri-corner-down-left-fill text-xl bg-green-200 rounded-3xl p-1" onclick="submitEdit(${todo.id})"></i>
        </li>
      </div>
    `;
    }

    return `
    <div class="flex flex-col items-end">
      <li>
        <span class="bg-white flex-1 rounded-3xl font-bold w-10 px-6 p-1"
          >${todo.text}</span
        >
        <i
          class="ri-delete-bin-fill text-xl bg-red-400 rounded-3xl p-1"
          onclick="deleteTodo(${todo.id})"
        ></i>
        <i
          class="ri-pencil-fill text-xl bg-blue-400 rounded-3xl p-1"
          onclick="editTodo(${todo.id})"
        ></i>
      </li>
    </div>
    `; }).join("");
    

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
