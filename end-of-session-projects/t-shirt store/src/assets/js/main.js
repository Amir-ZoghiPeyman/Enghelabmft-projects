const mainPageProductsContainer = document.getElementById("main-page-products");

async function getLimitedProducts(limitCount = 4) {
  return await fetch(`https://fakestoreapi.com/products?limit=${limitCount}`)
    .then((res) => res.json())
    .then((json) => json);
}

renderMainPageProducts();

async function renderMainPageProducts() {
  const products = await getLimitedProducts(4);

  const template = products
    .map((product) => {
      const { title, image, price } = product;

      return `
      <div>
          <div class="flex justify-center items-center mb-4">
            <img src="${image}" class="rounded-2xl shadow-2xl" alt="" />
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
