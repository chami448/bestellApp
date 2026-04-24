


const KEY_FAVORITES = "favoriteDishes";



function loadFromLocalStorage() {
  const stored = localStorage.getItem(KEY_FAVORITES);
  if (!stored) return;

  try {
    const loaded = JSON.parse(stored);
    if (!Array.isArray(loaded)) return;
    favoriteDishes.length = 0;
    favoriteDishes.push(...loaded);
  } catch (e) {
    console.error("Fehler beim Laden von LocalStorage:", e);
  }
}


function saveFavoritesToLocalStorage(){
  localStorage.setItem(KEY_FAVORITES, JSON.stringify(favoriteDishes));
}

function getInitialCategory() {
  return favoriteDishes.length > 0 ? "favorites" : "dishes";
}


document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    const startCartegory = getInitialCategory();
    renderPage();
    renderMenuItems(startCartegory);
    setActiveTab(startCartegory);
    setupMenuTabs();
    setupMenuItemActions();
})

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

function renderMenuItems(category){
    const container = document.querySelector(".menuItemsContainer");
    if (!container) return;
    const items = getCategoryItems(category);
    container.innerHTML = "";
    if (items.length === 0) {
        container.innerHTML = `<p class="noItemsMessage" aria-label="Keine Artikel in dieser Kategorie">Keine Artikel in dieser Kategorie</p>`;
        return;
    }
    items.forEach((item, index) => {
        const isFavorite = favoriteDishes.some((fav) => fav.name === item.name);
        const itemCard = createMenuItemCard(item, category, index, isFavorite);
        container.appendChild(itemCard);
    });
}

function setupMenuTabs() {
  const tabs = document.querySelectorAll(".menuTab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateCategory(tab.dataset.category));
    tab.addEventListener("keydown", (event) => handleTabKeydown(event, tab.dataset.category));
  });
}

function handleTabKeydown(event, category) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  activateCategory(category);
}

function activateCategory(category) {
  if (!category) return;
  setActiveTab(category);
  renderMenuItems(category);
}

function setActiveTab(activeCategory) {
  const tabs = document.querySelectorAll(".menuTab");
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === activeCategory);
  });
}

function getItemFromCardData(card) {
  const itemName = card.dataset.itemName;
  const category = card.dataset.category;
  const itemIndex = Number(card.dataset.itemIndex);
  const sourceItems = getCategoryItems(category);
  const item = sourceItems[itemIndex];

  return { itemName, category, item };
}

function toggleLikeButtonState(likeBtn) {
  const card = likeBtn.closest(".menuItemCard");
  if (!card) return;

  const { itemName, category, item } = getItemFromCardData(card);
  if (!item) return;

  const existingIndex = favoriteDishes.findIndex((fav) => fav.name === itemName);
  const isNowFavorite = existingIndex === -1;

  if (isNowFavorite) {
    favoriteDishes.push({ ...item, category });
  } else {
    favoriteDishes.splice(existingIndex, 1);
  }

  saveFavoritesToLocalStorage();
  updateLikeButtonUI(likeBtn, isNowFavorite, itemName);
  refreshFavoritesIfActiveTab();
}

function updateLikeButtonUI(likeBtn, isFavorite, itemName) {
  const likeIcon = likeBtn.querySelector(".likeIcon");
  const likedIcon = likeBtn.querySelector(".likedIcon");
  if (!likeIcon || !likedIcon) return;

  likeBtn.setAttribute("aria-pressed", String(isFavorite));
  likeBtn.setAttribute(
    "aria-label",
    isFavorite
      ? `Aus Favoriten entfernen ${itemName}?`
      : `Zu Favoriten hinzufügen ${itemName}?`
  );
  likeBtn.setAttribute(
    "title",
    isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"
  );

  likeIcon.hidden = isFavorite;
  likedIcon.hidden = !isFavorite;
}

function refreshFavoritesIfActiveTab() {
  const activeTab = document.querySelector(".menuTab.active");
  const activeCategory = activeTab ? activeTab.dataset.category : "dishes";

  if (activeCategory === "favorites") {
    renderMenuItems("favorites");
  }
}

function setupMenuItemActions() {
  const container = document.querySelector(".menuItemsContainer");
  if (!container) return;

  container.addEventListener("click", handleMenuItemClick);
  container.addEventListener("keydown", handleMenuItemKeydown);
}

function handleMenuItemClick(event) {
  const likeBtn = event.target.closest(".likeBtn");
  if (likeBtn) {
    toggleLikeButtonState(likeBtn);
    return;
  }
  const addBtn = event.target.closest(".addBtn");
  if (addBtn) {
      //TODO: Funktionalität für "In den Warenkorb" hinzufügen
  }
  
}

function handleMenuItemKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;

  const likeBtn = event.target.closest(".likeBtn");
  if (!likeBtn) return;

  event.preventDefault();
  toggleLikeButtonState(likeBtn);
}

