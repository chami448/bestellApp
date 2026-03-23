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


function setupBasketToggle(){
  const cartButton = document.getElementById("cartIcon");
  const basket = document.getElementById("basketWrapper");

  if(!cartButton || !basket) return;
  basket.classList.add("is-closed");
  cartButton.addEventListener("click", () => {
    basket.classList.toggle("is-closed")
  })
};