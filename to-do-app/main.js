// DOM NODES
const input = document.getElementById("input");
const btn = document.getElementById("add-btn");
const root = document.getElementById("root");
let editableItemId = null;

TODOS = [
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
  const inputVal = input.value;
  const newId = Math.floor(Math.random() * 10000000);
  const newTodo = {
    id: newId,
    text: inputVal,
    isDone: false,
  };
  TODOS.push(newTodo);
  input.value = "";
  render();
}
