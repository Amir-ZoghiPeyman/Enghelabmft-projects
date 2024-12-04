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
