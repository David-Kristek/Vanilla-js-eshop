class Products {
  products = [];
  productsContainerElement = null;
  productTemplate = () => {};
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
    this.productsContainerElement.innerHTML = templateArray(
      products,
      this.productTemplate
    );
  }
}

class filteredProducts extends Products {
  filteredProducts = [];
  priceFilter = {};
  searchFilter = "";
  constructor(productTemplate, productsContainerElement) {
    super(productTemplate, productsContainerElement);
  }

  filterProductsByPrice({ minPrice, maxPrice }) {
    this.priceFilter = {
      min: minPrice ?? this.priceFilter.min,
      max: maxPrice ?? this.priceFilter.max,
    };
    this.runFilters();
  }
  filterProductsByName(name) {
    this.searchFilter = name;
    this.runFilters();
  }
  runFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const priceFiltered =
        (!this.priceFilter.min || product.price >= this.priceFilter.min) &&
        (!this.priceFilter.max || product.price <= this.priceFilter.max);

      const productName = `${product.brand} ${product.model}`;
      const nameFiltered = productName
        .toLowerCase()
        .includes(this.searchFilter.toLowerCase());
      return priceFiltered && nameFiltered;
    });
    console.log("displaying new");
    this.displayProducts(this.filteredProducts);
  }
}

const products = new filteredProducts(
  productTemplate,
  document.querySelector(".content")
);

window.addEventListener("load", async () => {
  const fetchProducts = await fetch("/assets/products.json");
  const data = await fetchProducts.json();
  products.setProducts(data.airplanes);
});

document.getElementById("search").addEventListener("keyup", (event) => {
  products.filterProductsByName(event.target.value);
});

const maxPriceElement = document.getElementById("max-price");
const minPriceElement = document.getElementById("min-price");

maxPriceElement.addEventListener("keyup", (event) => {
  products.filterProductsByPrice({ maxPrice: event.target.value });
});
minPriceElement.addEventListener("keyup", (event) => {
  products.filterProductsByPrice({ minPrice: event.target.value });
});

//  Kosik
const cartContainerElement = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart-icon-container");
const cart = new Cart(cartIcon, cartContainerElement);

const onCartItemAdd = cart.onCartItemAdd.bind(cart);
const onCartItemCountChange = cart.onCartItemCountChange.bind(cart);
