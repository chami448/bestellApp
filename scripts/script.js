function loadFromLocalStorage() {
  const stored = localStorage.getItem("favoriteDishes");
  if (stored) {
    try {
      const loaded = JSON.parse(stored);
      favoriteDishes.length = 0;
      favoriteDishes.push(...loaded);
    } catch (e) {
      console.error("Fehler beim Laden von LocalStorage:", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderPage();

  const startCategory = getInitialCategory();
  renderMenuWithFavoriteStatus(startCategory);

  setActiveTab(startCategory);
  setupMenuTabs();
  setupMenuActions();
  setupBasketToggle();
  setupBasketActions();
  setupDeliveryOptions();
  updateTotals();
  setupOrderDialog();
});

function buildFavoriteSet() {
  return new Set(favoriteDishes.map((f) => f.name));
}

function renderMenuWithFavoriteStatus(category) {
  const items = categoryMap[category] || [];
  const favoriteSet = buildFavoriteSet();

  const menuList = document.querySelector(".menuList");
  menuList.innerHTML = "";

  items.forEach((item, index) => {
    const isFavorite = favoriteSet.has(item.name);
    const menuItem = createMenuItem(item, category, index, isFavorite);
    menuList.appendChild(menuItem);
  });
}

function getInitialCategory() {
  const stored = localStorage.getItem("favoriteDishes");
  if (!stored) return "dishes";

  try {
    const favorites = JSON.parse(stored);
    return favorites.length > 0 ? "favorites" : "dishes";//Genauerer Untersuchen
  } catch (e) {
    return "dishes";
  }
}

function setActiveTab(category) {
  const tabs = document.querySelectorAll(".menuTab");
  tabs.forEach((t) => t.classList.remove("active"));
  const active = document.querySelector(
    `.menuTab[data-category="${category}"]`,
  );
  if (active) active.classList.add("active");
}

function setupMenuTabs() {
  const tabs = document.querySelectorAll(".menuTab");

  tabs.forEach(makeTabFocusable);
  tabs.forEach(bindTabEvents);
}

function makeTabFocusable(tab) {
  if (!tab.hasAttribute("tabindex")) {
    tab.setAttribute("tabindex", "0");
  }
}

function bindTabEvents(tab) {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateTab(tab);
    }
  });
}

function activateTab(tab) {
  const category = tab.dataset.category;
  setActiveTab(category);
  renderMenuWithFavoriteStatus(category);
  setupMenuActions();
}

function setupMenuActions() {
  const menuList = document.querySelector(".menuList");

  if (menuList.dataset.bound === "true") return;
  menuList.dataset.bound = "true";

  menuList.addEventListener("click", handleMenuListClick);
}

function handleMenuListClick(e) {
  const menuItem = e.target.closest(".menuItem");
  if (!menuItem) return;

  if (e.target.closest(".addBtn")) {
    handleAddToBasket(menuItem.dataset.itemName, menuItem.dataset.category);
  }

  if (e.target.closest(".likeBtn")) {
    handleToggleFavorite(
      menuItem,
      menuItem.dataset.itemName,
      menuItem.dataset.category,
      menuItem.dataset.itemIndex,
    );
  }
}

function handleAddToBasket(itemName, category) {//Genauer Untersuchen , stop bei der korrektur
  const items = categoryMap[category] || [];
  const item = items.find((i) => i.name === itemName);
  if (!item) return;

  addToCart(item, category);
}

function handleToggleFavorite(menuItem, itemName, category, itemIndex) {
  const item = getItemByCategoryIndex(category, itemIndex);
  if (!item) return;

  toggleFavorite(itemName, item, category);
  updateLikeUI(menuItem, itemName);
}

function getItemByCategoryIndex(category, itemIndex) {
  const items = categoryMap[category] || [];
  return items[itemIndex];
}

function updateLikeUI(menuItem, itemName) {
  const likeBtn = menuItem.querySelector(".likeBtn");
  const likedIcon = menuItem.querySelector(".likedIcon");
  const isFavorite = favoriteDishes.some((fav) => fav.name === itemName);

  if (isFavorite) {
    likeBtn.classList.add("liked");
    likedIcon.classList.add("active");
    console.log(`❤️ ${itemName} zu Favoriten hinzugefügt`);
  } else {
    likeBtn.classList.remove("liked");
    likedIcon.classList.remove("active");
    console.log(`🤍 ${itemName} aus Favoriten entfernt`);
  }
}

function toggleFavorite(itemName, item, category) {
  const existingIndex = favoriteDishes.findIndex(
    (fav) => fav.name === itemName,
  );

  if (existingIndex > -1) {
    favoriteDishes.splice(existingIndex, 1);
  } else {
    const favoriteItem = { ...item, category };
    favoriteDishes.push(favoriteItem);
  }

  localStorage.setItem("favoriteDishes", JSON.stringify(favoriteDishes));
}

function setupBasketToggle() {
  const cartButton = document.getElementById("cartIcon");
  const basket = document.getElementById("basketWrapper");

  if (!cartButton || !basket) return;

  basket.classList.add("is-closed");

  cartButton.addEventListener("click", () => {
    basket.classList.toggle("is-closed");
  });
}

function setupBasketActions() {
  const basketContent = document.getElementById("basketContent");
  if (!basketContent) return;

  if (basketContent.dataset.bound === "true") return;
  basketContent.dataset.bound = "true";

  basketContent.addEventListener("click", handleBasketClick);
}

function handleBasketClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const itemName = btn.dataset.itemName;
  if (!action || !itemName) return;

  if (action === "increase") changeQuantity(itemName, 1);
  if (action === "decrease") changeQuantity(itemName, -1);
  if (action === "remove") removeFromCart(itemName);
}

function setupDeliveryOptions() {
  const btnDelivery = document.getElementById("btnDelivery");
  const btnPickup = document.getElementById("btnPickup");

  if (!btnDelivery || !btnPickup) return;

  btnDelivery.addEventListener("click", () => {
    deliveryMode = "delivery";
    btnDelivery.classList.add("active");
    btnPickup.classList.remove("active");
    updateTotals();
  });

  btnPickup.addEventListener("click", () => {
    deliveryMode = "pickup";
    btnPickup.classList.add("active");
    btnDelivery.classList.remove("active");
    updateTotals();
  });
}

function addToCart(item, category) {
  const existing = cartItems.find((ci) => ci.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({
      name: item.name,
      price: item.price,
      category,
      quantity: 1,
    });
  }

  updateCartUI();
  updateTotals();
}

function changeQuantity(itemName, delta) {
  const item = cartItems.find((ci) => ci.name === itemName);
  if (!item) return;

  if (delta < 0 && item.quantity === 1) {
    alert("Menge kann nicht weiter reduziert werden.");
    return;
  }

  item.quantity += delta;
  updateCartUI();
  updateTotals();
}

function removeFromCart(itemName) {
  cartItems = cartItems.filter((ci) => ci.name !== itemName);
  updateCartUI();
  updateTotals();
}

function updateCartUI() {
  const basketContent = document.getElementById("basketContent");
  if (!basketContent) return;

  if (cartItems.length === 0) {
    renderEmptyCart(basketContent);
    return;
  }

  basketContent.innerHTML = cartItems.map(buildCartItemHtml).join("");
  updateCartBadge();
}

function renderEmptyCart(container) {
  container.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
  updateCartBadge();
}

function buildCartItemHtml(item) {
  const lineTotal = (item.price * item.quantity).toFixed(2);
  return `
            <div class="basket-item" data-item-name="${item.name}">
                <div class="basket-item-info">
                    <span class="basket-item-name">${item.name}</span>
                    <span class="basket-item-price">${lineTotal} €</span>
                </div>
                <div class="basket-item-actions">
                    <button class="qty-btn" data-action="decrease" data-item-name="${item.name}">−</button>
                    <span class="basket-item-qty">${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-item-name="${item.name}">+</button>
                    <button class="remove-btn" data-action="remove" data-item-name="${item.name}" aria-label="Entfernen">🗑</button>
                </div>
            </div>
        `;
}

function calculateSubtotal() {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateDeliveryCost() {
  if (deliveryMode === "pickup") return 0;
  return deliveryCost || 0;
}

function updateTotals() {
  const subtotal = calculateSubtotal();
  const delivery = calculateDeliveryCost();
  const total = subtotal + delivery;

  const subtotalEl = document.getElementById("subtotalPrice");
  const deliveryEl = document.getElementById("deliveryPrice");
  const totalEl = document.getElementById("totalPrice");

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} €`;
  if (deliveryEl) deliveryEl.textContent = `${delivery.toFixed(2)} €`;
  if (totalEl) totalEl.textContent = `${total.toFixed(2)} €`;

  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = String(count);
}

function setupOrderDialog() {
  const orderButton = document.getElementById("orderButton");
  if (!orderButton) return;

  orderButton.addEventListener("click", () => {
    openConfirmDialog();
  });
}

function openConfirmDialog() {
  const dialog = document.getElementById("confirmDialog");
  const yesBtn = document.getElementById("confirmYesBtn");
  const noBtn = document.getElementById("confirmNoBtn");

  if (!dialog || !yesBtn || !noBtn) return;

  showDialog(dialog);

  yesBtn.onclick = () => {
    dialog.close();
    clearCart();
    openOrderDialog(deliveryMode);
  };

  noBtn.onclick = () => {
    dialog.close();
  };
}

function openOrderDialog(mode) {
  const dialog = document.getElementById("orderDialog");
  const title = document.getElementById("dialogTitle");
  const message = document.getElementById("dialogMessage");
  const closeBtn = document.getElementById("dialogCloseBtn");

  if (!dialog || !title || !message || !closeBtn) return;

  setOrderDialogContent(mode, title, message);
  showDialog(dialog);

  closeBtn.onclick = () => dialog.close();
}

function setOrderDialogContent(mode, title, message) {
  title.textContent = "Probe-Bestellung bestaetigt";
  if (mode === "delivery") {
    message.textContent = "Ihre Probe-Bestellung kommt in ca. 45 Minuten.";
  } else {
    message.textContent = "Sie koennen Ihre Probe-Bestellung in ca. 15 Minuten abholen.";
  }
}

function showDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "true");
  }
}

function clearCart() {
  cartItems = [];
  updateCartUI();
  updateTotals();
}
