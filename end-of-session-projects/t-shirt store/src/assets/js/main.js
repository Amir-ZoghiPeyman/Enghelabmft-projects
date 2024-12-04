// DOM NODES
const mainPageProductsContainer = document.getElementById("main-page-products");
const root = document.querySelector("main");
const menu = document.getElementById("categories-container");

// FUNCTIONS
async function getLimitedProducts(limitCount = 4) {
  return await fetch(`https://fakestoreapi.com/products?limit=${limitCount}`)
    .then((res) => res.json())
    .then((json) => json);
}
async function getAllProducts() {
  const result = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
  return result;
}
async function getSingleProduct(id) {
  const result = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => json);
  return result;
}
async function getInCategory() {
  const result = await fetch(
    `https://fakestoreapi.com/products/category/${catTitle}`
  )
    .then((res) => res.json())
    .then((json) => json);
  return result;
}
async function getAllCategories() {
  const result = await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => json);
  return result;
}

async function renderMainPageProducts() {
  const products = await getLimitedProducts(4);

  const template = products
    .map((product) => {
      const { title, image, price } = product;

      return `
      <div>
          <div class="flex flex-col justify-center items-center mb-4 w-full overflow-hidden">
            <img src="${image}" width="400px" class="rounded-2xl shadow-2xl w-full aspect-square object-cover" alt="" />
          </div>
          <p class="flex justify-center items-center font-bold">${title}</p>
          <p class="flex justify-center items-center">${price}</p>
        </div>
    `;
    })
    .join("");

  mainPageProductsContainer.innerHTML = template;
  console.log(renderMainPageProducts);
}

renderMainPageProducts();

async function renderAllProductsPage() {
  const skeleton = `
    `;
  let container = `
      ${skeleton}
  `;
  root.innerHTML = container;

  const allProducts = await getAllProducts();
  const template = allProducts
    .map((product) => {
      const { title, image, price, id } = product;
      return `
    `;
    })
    .join("");

  container = `
      ${template}
  `;
  root.innerHTML = container;
}

async function renderSingleProduct(id) {
  const data = await getSingleProduct(id);

  const template = `
  `;

  root.innerHTML = template;
}

async function renderProductsInCategory(catTitle) {
  const skeleton = `
  `;
  let container = `
    ${skeleton}
`;
  root.innerHTML = container;

  const products = await getInCategory(catTitle);
  const template = products
    .map((product) => {
      const { title, image, price, id } = product;
      return `
`;
    })
    .join("");

  container = `
    ${template}
`;
  root.innerHTML = container;
}

async function renderCategoriesInMenu() {
  const allCategories = await getAllCategories();
  const template = allCategories
    .map((cat) => {
      return `
    `;
    })
    .join("");

  const ui = `
  ${template}
  `;
  menu.innerHTML = ui;
}

function renderMainPage() {
  root.innerHTML = `
  `;
  mainPageProductsContainer = document.getElementById("main-page-products");
  renderMainPageProducts();
}

function handleAClick(event, element) {
  event.preventDefault();
  const href = element.getAttribute("href");
  history.pushState("", "", href);
  checkState();
}

function checkState() {
  const pathName = location.pathname;
  switch (true) {
    case pathName === "/index.html":
      renderAllProductsPage();
      break;
    case pathName === "/index.html":
      renderMainPage();
      break;
    case pathName.startsWith():
      let path = pathName.split();
      const pId = path.at(-1);
      renderSingleProduct(pId);
      break;
    case pathName.startsWith():
      let path2 = pathName.split();
      const catTitle = path2.at(-1);
      renderProductsInCategory(catTitle);
      break;
    default:
      break;
  }
}

//EVENTS
window.addEventListener("popstate", checkState);
