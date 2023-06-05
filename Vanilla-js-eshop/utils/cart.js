const cartOjbect = {
  cartItems: [],
  totalPrice: 0,
  cartElemenet: undefined,
  cartIconElement: undefined,

  init(cartElement, cartIconElement) {
    this.cartItems = [];
    this.cartElemenet = cartElement;
    this.cartIconElement = cartIconElement;
    this.rerender({ items: true });
  },
  onCartItemAdd(name, price) {
    const foundItem = this.cartItems.find((item) => item.name === name);
    if (foundItem) {
      console.log(foundItem, "foundItem");
      this.changeCartItemInput(name, foundItem.count + 1);
      this.cartItems = this.cartItems.map((item) =>
        item.name === name ? { ...item, count: item.count + 1 } : item
      );
      this.rerender();
      return;
    }
    this.cartItems.push({ name, price, count: 1 });
    this.rerender({ items: true });
  },
  onCartItemCountChange(input, name) {
    const value = Number(input.value);
    if (!value) {
      this.cartItems = this.cartItems.filter((item) => item.name !== name);
      this.rerender({ items: true });
      return;
    }
    this.cartItems = this.cartItems.map((item) =>
      item.name === name ? { ...item, count: value } : item
    );
    this.rerender();
  },
  rerender(obj = { items: false }) {
    if (obj?.items) {
      this.displayCart();
    }
    this.displayCartTotalItems();
    this.cartItemsTotalPrice();
  },
  displayCart() {
    if (this.cartItems.length === 0) {
      this.cartElemenet.innerHTML = emptyCartTemplate();
      return;
    }
    this.cartElemenet.innerHTML = templateArray(
      this.cartItems,
      cartItemTemplate
    );
    this.cartElemenet.innerHTML += cartFooterTemplate();
  },
  displayCartTotalItems() {
    const totalItems = this.cartItems.reduce((total, item) => {
      return total + Number(item.count);
    }, 0);

    this.cartIconElement.setAttribute("data-count", totalItems);
  },
  cartItemsTotalPrice() {
    const element = document.querySelector(".item-total-price");
    if (!element) return;
    const totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    element.innerHTML = `$${totalPrice}M`;
  },
  changeCartItemInput(name, text) {
    const input = document.getElementById(`${name}-count-input`);
    input.value = text;
  },
};
