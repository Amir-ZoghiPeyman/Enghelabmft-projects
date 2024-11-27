

function getLimitedProducts(limitCount = 4) {
  fetch(`https://fakestoreapi.com/products?limit=$(limitCount)`)
    .then((res) => res.json())
    .then((json) => console.log(json));
}
