class Cart {
  cartItems = [];
  totalPrice = 0;
  cartElement = undefined;
  cartIconElement = undefined;

  constructor(cartIconElement, cartElement) {
    this.cartIconElement = cartIconElement;
    this.cartElement = cartElement;
    this.cartItems = loadCart();
    this.render();
  }
  onCartItemAdd(name, price, imageUrl) {
    const itemInCart = this.cartItems.find((item) => item.name === name);
    if (itemInCart) {
      this.changeCartItemInput(name, itemInCart.count + 1);
      this.cartItems = this.cartItems.map((item) =>
        item.name === name ? { ...item, count: item.count + 1 } : item
      );
      this.render();
    } else {
      this.cartItems.push({ name, price, count: 1, imageUrl });
      this.render();
    }
  }

  onCartItemCountChange(input, name) {
    const value = Number(input.value);
    if (!value) {
      this.cartItems = this.cartItems.filter((item) => item.name !== name);
      this.render();
    } else {
      this.cartItems = this.cartItems.map((item) =>
        item.name === name ? { ...item, count: value } : item
      );
      this.render();
    }
  }
  render() {
    this.countTotalPrice();
    this.displayCart();
    this.displayCartTotalItems();
    saveCart(this.cartItems);
  }

  displayCart() {
    if (!this.cartElement) return;
    if (this.cartItems.length === 0) {
      this.cartElement.innerHTML = emptyCartTemplate();
      return;
    }
    this.cartElement.innerHTML = templateArray(
      this.cartItems,
      cartItemTemplate
    );
    this.cartElement.innerHTML += cartFooterTemplate(this.totalPrice);
  }

  displayCartTotalItems() {
    const totalItems = this.cartItems.reduce((total, item) => {
      return total + Number(item.count);
    }, 0);
    if (!this.cartIconElement) return;
    this.cartIconElement.setAttribute("data-count", totalItems);
  }

  countTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  }

  changeCartItemInput(name, text) {
    const input = document.getElementById(`${name}-count-input`);
    input.value = text;
  }
}

function saveCart(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  return cartItems || [];
}
