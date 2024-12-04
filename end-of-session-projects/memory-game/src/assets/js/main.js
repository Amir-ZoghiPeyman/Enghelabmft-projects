// DOM NODES
let boxes = [...document.querySelectorAll(".box")];
const container = document.getElementById("container");

const boxHistory = [];

function hideAll() {
  for (const box of boxes) {
    box.classList.add("hidden-content");
  }
}

setTimeout(() => {
  hideAll();
}, 3000);

function handleClick(evt) {
  evt.target.classList.remove("hidden-content");
  evt.target.classList.add("freeze");
  if (boxHistory.length === 0) {
    boxHistory.push(evt.target);
  } else {
    boxHistory.push(evt.target);

    if (
      boxHistory[0].firstElementChild.getAttribute("class") ===
      boxHistory[1].firstElementChild.getAttribute("class")
    ) {
      matchCards();
    } else {
      unmatchCards();
    }
  }
}

function matchCards() {
  boxHistory[0].classList.add("matched");
  boxHistory[1].classList.add("matched");
  boxHistory.length = 0;
}

const unmatchCards = () => {
  freezeAll();
  boxHistory[0].classList.add("unmatched");
  boxHistory[1].classList.add("unmatched");

  setTimeout(() => {
    boxHistory[0].classList.add("hidden-content");
    boxHistory[1].classList.add("hidden-content");
    boxHistory[0].classList.remove("unmatched");
    boxHistory[1].classList.remove("unmatched");
    unfreezeAll();
    boxHistory.length = 0;
  }, 1000);
};

function freezeAll() {
  for (const box of boxes) {
    box.classList.add("freeze");
  }
}

function unfreezeAll() {
  for (const box of boxes) {
    box.classList.remove("freeze");
  }
}

function shuffleCards() {
  for (let i = 0; i < boxes.length; i++) {
    const rnd = Math.floor(Math.random() * boxes.length);

    const temp = boxes[rnd];
    boxes[rnd] = boxes[i];
    boxes[i] = temp;
  }

  const template = boxes
    .map((item) => {
      return item.outerHTML;
    })
    .join("");

  container.innerHTML = template;
  boxes = document.querySelectorAll(".box");
}

shuffleCards();

// EVENTS
for (const box of boxes) {
  box.addEventListener("click", handleClick);
}
