class Products {
  products = [];
  productsContainerElement = null;
  productTemplate = () => { };
  constructor(productTemplate, productsContainerElement) {
    this.productTemplate = productTemplate;
    this.productsContainerElement = productsContainerElement;
  }
  getProucts() {
    return this.products;
  }
  setProducts(products) {
    this.products = products;
    this.displayProducts(products);
  }
  displayProducts(products) {
    this.productsContainerElement.innerHTML = templateArray(products, this.productTemplate);
  }
}
const products = new Products(productTemplate, document.querySelector(".content"));


window.addEventListener("load", async () => {
  const fetchProducts = await fetch("/assets/products.json");
  const data = await fetchProducts.json();

  products.setProducts(data.airplanes);
});



const cartContainerElement = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart-icon-container");

cartOjbect.init(cartContainerElement, cartIcon);
const onCartItemAdd = cartOjbect.onCartItemAdd.bind(cartOjbect);
const onCartItemCountChange = cartOjbect.onCartItemCountChange.bind(cartOjbect);

let searchValue = "";

document.getElementById("search").addEventListener("keyup", (event) => {
  searchValue = event.target.value;
  filterProducts();
});


function filterProducts() {
  console.log(searchValue, "searchValue", minPriceValue, "minPriceValue", maxPriceValue, "maxPriceValue");
  const filteredProductsNames = products.getProucts().filter((product) => {
    const productName = `${product.model} ${product.model} ${product.brand}`;
    return productName.toLowerCase().includes(searchValue.toLowerCase());
  });
  const filteredProducts = filteredProductsNames.filter((product) => {
    return product.price >= minPriceValue && product.price <= maxPriceValue;
  });
  console.log(filteredProducts, "filteredProducts");
  products.displayProducts(filteredProducts);
}


function templateArray(array, template) {
  return array.reduce((html, item) => {
    return html + template(item);
  }, "");
}

const maxPrice = document.getElementById("max-price");
const minPrice = document.getElementById("min-price");


let maxPriceValue = 0;
let minPriceValue = 0;

maxPrice.addEventListener("change", (event) => {
  maxPriceValue = event.target.value;
  filterProducts();
});
minPrice.addEventListener("change", (event) => {
  minPriceValue = event.target.value;
  filterProducts();
})