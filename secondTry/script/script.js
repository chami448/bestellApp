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
};


//bundle of functions
document.addEventListener("DOMContentLoaded", ()=>{
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
  updateCartUI();
  updateTotals();
});

//connect function and localStorage
function buildFavoriteSet() {
  return new Set(favoriteDishes.map((f) => f.name));
};

//helper function to get the right category
function getCategoryItems(category) {
  switch (category) {
    case "dishes":
    case "supplements":
    case "alcoholicDrinks":
    case "drinks":
    case "mealOfTheDay":
    case "favorites":
      return categoryMap[category] || [];
    default:
      return [];
  }
};

//fundamental function to render the menu with the right category and favorite status
function renderMenuWithFavoriteStatus(category) {
  const items = getCategoryItems(category);
  const favoriteSet = buildFavoriteSet();

  const menuList = document.querySelector(".menuList");
  menuList.innerHTML = "";

  items.forEach((item, index) => {
    const isFavorite = favoriteSet.has(item.name);
    const menuItem = createMenuItem(item, category, index, isFavorite);
    menuList.appendChild(menuItem);
  });
};

//start function to render the page with the right category
function getInitialCategory() {
  const stored = localStorage.getItem("favoriteDishes");
  if (!stored) return "dishes";

  try {
    const favorites = JSON.parse(stored);
    return favorites.length > 0 ? "favorites" : "dishes";
  } catch (e) {
    return "dishes";
  }
};

//functions for menu tabs and active status

function setActiveTab(category) {
  const tabs = document.querySelectorAll(".menuTab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const activeTab = document.querySelector(
    `.menuTab[data-category="${category}"]`,
  );
  if (activeTab) activeTab.classList.add("active");
};

function setupMenuTabs() {
  const tabs = document.querySelectorAll(".menuTab");
  tabs.forEach(bindTabEvents);
};

function bindTabEvents(tab) {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateTab(tab);
    }
  });
};

function activateTab(tab) {
  const category = tab.dataset.category;
  if (!category) return;

  setActiveTab(category);
  renderMenuWithFavoriteStatus(category);
  setupMenuActions();
};

//bind menu actions 
function setupMenuActions() {
  const menuList = document.querySelector(".menuList");
  if (!menuList) return;

  menuList.removeEventListener("click", handleMenuListClick);
  menuList.addEventListener("click", handleMenuListClick);
};



function handleMenuListClick(event){
  const menuItem = event.target.closest(".menuItem");
  if (!menuItem) return;

  if(event.target.closest(".addBtn")){
    handleAddToBasket(menuItem.dataset.itemName, menuItem.dataset.category);
  }

  if(event.target.closest(".likeBtn")){
    handleToggleFavorite(
      menuItem,
      menuItem.dataset.itemName,
      menuItem.dataset.category,
      menuItem.dataset.itemIndex,
    );
  }
};

function handleAddToBasket(itemName, category){
  const items = categoryMap[category] || [];
  const item = items.find((i) => i.name === itemName);
  if(!item) return;

  addToCart (item, category);
};

function handleToggleFavorite(menuItem, itemName, category, itemIndex) {
  const item = getItemByCategoryIndex(category, itemIndex);
  if (!item) return;

  toggleFavorite(itemName, item, category);
  updateLikeUI(menuItem, itemName);
};

function getItemByCategoryIndex(category, itemIndex) {
  const items = categoryMap[category] || [];
  return items[itemIndex];
};

function updateLikeUI(menuItem, itemName) {
  const likeBtn = menuItem.querySelector(".likeBtn");
  const likedIcon = menuItem.querySelector(".likedIcon");
  const isFavorite = favoriteDishes.some((fav) => fav.name === itemName);

  if (isFavorite) {
    likeBtn.classList.add("liked");
    likedIcon.classList.add("active");
    console.log(` ${itemName} zu Favoriten hinzugefügt`);
  } else {
    likeBtn.classList.remove("liked");
    likedIcon.classList.remove("active");
    console.log(` ${itemName} aus Favoriten entfernt`);
  }
};


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
};

//basket functions
function setupBasketToggle(){
  const cartButton = document.getElementById("cartIcon");
  const basket = document.getElementById("basketWrapper");

  if(!cartButton || !basket) return;
  basket.classList.add("is-closed");
  cartButton.addEventListener("click", () => {
    basket.classList.toggle("is-closed")
  })
};

function setupBasketActions() {
  const basketContent = document.getElementById("basketContent");
  if (!basketContent) return;

  if (basketContent.dataset.bound === "true") return;
  basketContent.dataset.bound = "true";

  basketContent.addEventListener("click", handleBasketClick);
};

function handleBasketClick(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const itemName = btn.dataset.itemName;
  if (!action || !itemName) return;

  switch (action) {
    case "increase":
      changeQuantity(itemName, 1);
      break;
    case "decrease":
      changeQuantity(itemName, -1);
      break;
    case "remove":
      removeFromCart(itemName);
      break;
    default:
      break;
  }
};

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
};

function addToCart(item, category) {
  const existing = basketItems.find((ci) => ci.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    basketItems.push({
      name: item.name,
      price: item.price,
      category,
      quantity: 1,
    });
  }

  updateCartUI();
  updateTotals();
};

function changeQuantity(itemName, delta) {
  const item = basketItems.find((ci) => ci.name === itemName);
  if (!item) return;

  if (delta < 0 && item.quantity === 1) {
    alert("Menge kann nicht weiter reduziert werden.");
    return;
  }

  item.quantity += delta;
  updateCartUI();
  updateTotals();
};

function removeFromCart(itemName) {
  basketItems = basketItems.filter((ci) => ci.name !== itemName);
  updateCartUI();
  updateTotals();
};

function updateCartUI() {
  const basketContent = document.getElementById("basketContent");
  if (!basketContent) return;

  switch (basketItems.length) {
    case 0:
      renderEmptyCart(basketContent);
      break;
    default:
      basketContent.innerHTML = basketItems.map(buildCartItemHtml).join("");
      updateCartBadge();
      break;
  }
};

function renderEmptyCart(container) {
  container.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
  updateCartBadge();
};

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
};

function calculateSubtotal() {
  return basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

function calculateDeliveryCost() {
  if (deliveryMode === "pickup") return 0;
  return deliveryCost || 0;
};

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
};

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const count = basketItems.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = String(count);
};


//dialog part

