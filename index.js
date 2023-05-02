window.addEventListener("load", async () => {
  const products = await fetch("/assets/products.json");
  const data = await products.json();
  displayProducts(data.airplanes);
});

function templateArray(array, template) {
  return array.reduce((html, item) => {
    return html + template(item);
  }, "");
}
const productsContainerElement = document.querySelector(".content");
function displayProducts(products) {
  productsContainerElement.innerHTML = templateArray(products, productTemplate);
}

const cartContainerElement = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart-icon-container");

cartOjbect.init(cartContainerElement, cartIcon);
const onCartItemAdd = cartOjbect.onCartItemAdd.bind(cartOjbect);
const onCartItemCountChange = cartOjbect.onCartItemCountChange.bind(cartOjbect);

document.getElementById("search")