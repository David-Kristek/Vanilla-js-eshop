function productTemplate(product) {
  return `
    <div class="shop-item">
    <img src=${product.image_url} alt=${product.model} />
    <a class="item-name" href="/detail.html?model=${product.model}">
      <h2 class="item-name">${product.brand} ${product.model}</h2>
    </a>
    <p class="item-price">$${product.price}M</p>
    <button class="btn add-to-cart" onclick="onCartItemAdd('${product.brand} ${product.model}', ${product.price})">Add to Cart</button>
    </div>
    `;
}

function cartItemTemplate(item) {
  return `
    <div class="cart-item">
    <p class="item-name">${item.name}</p>
    <div class="item-right">
      <p class="item-price">$${item.price}M</p>
      <input type="number" class="item-count" value="${item.count}" oninput="onCartItemCountChange(this, '${item.name}')" id="${item.name}-count-input"/>
    </div>
    </div>
    `;
}
function emptyCartTemplate() {
  return `
      <p>Your shopping cart is empty</p>
    `;
}
function cartFooterTemplate() {
  return `
    <div class="cart-item">
      <hr />
      <p class="item-name">Total</p>
      <div class="item-right">
        <p class="item-total-price"></p>
      </div>
    </div>
    `;
}
