// ===== DATA =====
let cart = {};

const products = [
  { image: { thumbnail: "./assets/images/image-waffle-thumbnail.jpg", mobile: "./assets/images/image-waffle-mobile.jpg", tablet: "./assets/images/image-waffle-tablet.jpg", desktop: "./assets/images/image-waffle-desktop.jpg" }, name: "Waffle with Berries", category: "Waffle", price: 6.50 },
  { image: { thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg", mobile: "./assets/images/image-creme-brulee-mobile.jpg", tablet: "./assets/images/image-creme-brulee-tablet.jpg", desktop: "./assets/images/image-creme-brulee-desktop.jpg" }, name: "Vanilla Bean Crème Brûlée", category: "Crème Brûlée", price: 7.00 },
  { image: { thumbnail: "./assets/images/image-macaron-thumbnail.jpg", mobile: "./assets/images/image-macaron-mobile.jpg", tablet: "./assets/images/image-macaron-tablet.jpg", desktop: "./assets/images/image-macaron-desktop.jpg" }, name: "Macaron Mix of Five", category: "Macaron", price: 8.00 },
  { image: { thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg", mobile: "./assets/images/image-tiramisu-mobile.jpg", tablet: "./assets/images/image-tiramisu-tablet.jpg", desktop: "./assets/images/image-tiramisu-desktop.jpg" }, name: "Classic Tiramisu", category: "Tiramisu", price: 5.50 },
  { image: { thumbnail: "./assets/images/image-baklava-thumbnail.jpg", mobile: "./assets/images/image-baklava-mobile.jpg", tablet: "./assets/images/image-baklava-tablet.jpg", desktop: "./assets/images/image-baklava-desktop.jpg" }, name: "Pistachio Baklava", category: "Baklava", price: 4.00 },
  { image: { thumbnail: "./assets/images/image-meringue-thumbnail.jpg", mobile: "./assets/images/image-meringue-mobile.jpg", tablet: "./assets/images/image-meringue-tablet.jpg", desktop: "./assets/images/image-meringue-desktop.jpg" }, name: "Lemon Meringue Pie", category: "Pie", price: 5.00 },
  { image: { thumbnail: "./assets/images/image-cake-thumbnail.jpg", mobile: "./assets/images/image-cake-mobile.jpg", tablet: "./assets/images/image-cake-tablet.jpg", desktop: "./assets/images/image-cake-desktop.jpg" }, name: "Red Velvet Cake", category: "Cake", price: 4.50 },
  { image: { thumbnail: "./assets/images/image-brownie-thumbnail.jpg", mobile: "./assets/images/image-brownie-mobile.jpg", tablet: "./assets/images/image-brownie-tablet.jpg", desktop: "./assets/images/image-brownie-desktop.jpg" }, name: "Salted Caramel Brownie", category: "Brownie", price: 4.50 },
  { image: { thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg", mobile: "./assets/images/image-panna-cotta-mobile.jpg", tablet: "./assets/images/image-panna-cotta-tablet.jpg", desktop: "./assets/images/image-panna-cotta-desktop.jpg" }, name: "Vanilla Panna Cotta", category: "Panna Cotta", price: 6.50 }
];

function loadProducts() {
  products.sort(() => Math.random() - 0.5);
  renderProducts();
}
// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  products.forEach(product => {
    const qty = cart[product.name] || 0;
    const isInCart = qty > 0;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrapper ${isInCart ? 'selected' : ''}" id="img-wrapper-${sanitizeId(product.name)}">
        <picture>
          <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
          <source media="(min-width: 600px)" srcset="${product.image.tablet}">
          <img src="${product.image.mobile}" alt="${product.name}">
        </picture>

        <button class="add-to-cart-btn ${isInCart ? 'hidden' : ''}" 
          id="add-btn-${sanitizeId(product.name)}"
          onclick="addToCart('${product.name}')"
          aria-label="Add ${product.name} to cart">
          <img src="./assets/images/icon-add-to-cart.svg" alt="">
          Add to Cart
        </button>

        <div class="quantity-controls ${isInCart ? 'visible' : ''}" id="qty-ctrl-${sanitizeId(product.name)}">
          <button class="qty-btn" onclick="decreaseQty('${product.name}')" aria-label="Decrease quantity">
            <img src="./assets/images/icon-decrement-quantity.svg" alt="">
          </button>
          <span class="qty-count" id="qty-${sanitizeId(product.name)}">${qty}</span>
          <button class="qty-btn" onclick="increaseQty('${product.name}')" aria-label="Increase quantity">
            <img src="./assets/images/icon-increment-quantity.svg" alt="">
          </button>
        </div>
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ===== CART FUNCTIONS =====
function addToCart(name) {
  cart[name] = 1;
  updateProductUI(name);
  renderCart();
}

function increaseQty(name) {
  cart[name] = (cart[name] || 0) + 1;
  updateProductUI(name);
  renderCart();
}

function decreaseQty(name) {
  cart[name] = (cart[name] || 0) - 1;
  if (cart[name] <= 0) {
    delete cart[name];
  }
  updateProductUI(name);
  renderCart();
}

function removeFromCart(name) {
  delete cart[name];
  updateProductUI(name);
  renderCart();
}

// ===== UPDATE PRODUCT UI =====
function updateProductUI(name) {
  const id = sanitizeId(name);
  const qty = cart[name] || 0;
  const isInCart = qty > 0;

  const wrapper = document.getElementById(`img-wrapper-${id}`);
  const addBtn = document.getElementById(`add-btn-${id}`);
  const qtyCtrl = document.getElementById(`qty-ctrl-${id}`);
  const qtyCount = document.getElementById(`qty-${id}`);

  if (!wrapper) return;

  if (isInCart) {
    wrapper.classList.add('selected');
    addBtn.classList.add('hidden');
    qtyCtrl.classList.add('visible');
    qtyCount.textContent = qty;
  } else {
    wrapper.classList.remove('selected');
    addBtn.classList.remove('hidden');
    qtyCtrl.classList.remove('visible');
    qtyCount.textContent = 0;
  }
}

// ===== RENDER CART =====
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartCount = document.getElementById('cart-count');
  const totalPrice = document.getElementById('total-price');

  const entries = Object.entries(cart);
  const totalQty = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const totalCost = entries.reduce((sum, [name, qty]) => {
    const product = products.find(p => p.name === name);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  cartCount.textContent = totalQty;
  totalPrice.textContent = `$${totalCost.toFixed(2)}`;

  if (entries.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.innerHTML = '';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'flex';

  cartItems.innerHTML = entries.map(([name, qty]) => {
    const product = products.find(p => p.name === name);
    if (!product) return '';
    const itemTotal = product.price * qty;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-name">${name}</p>
          <div class="cart-item-details">
            <span class="cart-item-qty">${qty}x</span>
            <span class="cart-item-unit-price">@ $${product.price.toFixed(2)}</span>
            <span class="cart-item-total-price">$${itemTotal.toFixed(2)}</span>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${name}')" aria-label="Remove ${name} from cart">
          <img src="./assets/images/icon-remove-item.svg" alt="">
        </button>
      </div>
    `;
  }).join('');
}

// ===== CONFIRM ORDER =====
document.getElementById('confirm-btn').addEventListener('click', () => {
  const modal = document.getElementById('modal-overlay');
  const modalItems = document.getElementById('modal-items');
  const modalTotal = document.getElementById('modal-total-price');

  const entries = Object.entries(cart);
  const totalCost = entries.reduce((sum, [name, qty]) => {
    const product = products.find(p => p.name === name);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  modalTotal.textContent = `$${totalCost.toFixed(2)}`;

  modalItems.innerHTML = entries.map(([name, qty]) => {
    const product = products.find(p => p.name === name);
    if (!product) return '';
    return `
      <div class="modal-item">
        <img src="${product.image.thumbnail}" alt="${name}">
        <div class="modal-item-info">
          <p class="modal-item-name">${name}</p>
          <div class="modal-item-details">
            <span class="modal-item-qty">${qty}x</span>
            <span class="modal-item-price">@ $${product.price.toFixed(2)}</span>
          </div>
        </div>
        <span class="modal-item-total">$${(product.price * qty).toFixed(2)}</span>
      </div>
    `;
  }).join('');

  modal.classList.add('active');
});

// ===== START NEW ORDER =====
document.getElementById('new-order-btn').addEventListener('click', () => {
  cart = {};
  document.getElementById('modal-overlay').classList.remove('active');
  renderProducts();
  renderCart();
});

// ===== CLOSE MODAL ON OVERLAY CLICK =====
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('active');
  }
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal-overlay').classList.remove('active');
  }
});

// ===== HELPER =====
function sanitizeId(name) {
  return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

// Add hidden class to CSS dynamically
const style = document.createElement('style');
style.textContent = `.hidden { display: none !important; }`;
document.head.appendChild(style);

// ===== INIT =====
loadProducts();
