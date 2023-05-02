const cnt = document.querySelector(".contentWithVariables");
loadProductDetail();
async function loadProductDetail() {
    const url = new URL(window.location.href);
    const model = url.searchParams.get("model");
    const response = await fetch(`/assets/products.json`);
    const products = (await response.json()).airplanes;

    const product = products.find((p) => p.model === model);
    if (!product) {
        window.location.href = "/index.html";
    }
    console.log(product);
    const replaced = replace(cnt.innerHTML, product);
    cnt.innerHTML = replaced;
    cnt.style.display = "block";
}
const cartContainerElement = document.querySelector(".cart-container");
const cartIcon = document.querySelector(".cart-icon-container");

cartOjbect.init(cartContainerElement, cartIcon);
const onCartItemAdd = cartOjbect.onCartItemAdd.bind(cartOjbect);
const onCartItemCountChange = cartOjbect.onCartItemCountChange.bind(cartOjbect);
