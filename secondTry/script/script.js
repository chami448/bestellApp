


const KEY_FAVORITES = "favoriteDishes";

function saveFavoritesToLocalStorage(){
  localStorage.setItem(KEY_FAVORITES, JSON.stringify(favoriteDishes));
}


function loadFromLocalStorage() {
  const stored = localStorage.getItem(KEY_FAVORITES);
  if (!stored) return;

  try {
    const loaded = JSON.parse(stored);
    favoriteDishes.length = 0;
    favoriteDishes.push(...loaded);
  } catch (e) {
    console.error("Fehler beim Laden von LocalStorage:", e);
  }
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
    setupLikeButtons();
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
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;
      if (!category) return;
      setActiveTab(category);
      renderMenuItems(category);
    });
  });
}

function setActiveTab(activeCategory) {
  const tabs = document.querySelectorAll(".menuTab");
  tabs.forEach((tab) => {
    const isActive = tab.dataset.category === activeCategory;
    tab.classList.toggle("active", isActive);
  });
}

function toggleLikeButtonState(likeBtn){
  const isPressed = likeBtn.getAttribute("aria-pressed") === "true";
  const nextPressed = !isPressed;
  likeBtn.setAttribute("aria-pressed", String(nextPressed));
  const likeIcon = likeBtn.querySelector(".likeIcon");
  const likedIcon = likeBtn.querySelector(".likedIcon");
  likeIcon.hidden = nextPressed;
  likedIcon.hidden = !nextPressed;
}

function setupLikeButtons() {
  const container = document.querySelector(".menuItemsContainer");
  if (!container) return;

  container.addEventListener("click", handleLikeClick);
  container.addEventListener("keydown", handleLikeKeydown);
}

function handleLikeClick(event) {
  const likeBtn = event.target.closest(".likeBtn");
  if (!likeBtn) return;

  toggleLikeButtonState(likeBtn);
}

function handleLikeKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;

  const likeBtn = event.target.closest(".likeBtn");
  if (!likeBtn) return;

  event.preventDefault();
  toggleLikeButtonState(likeBtn);
}


//localstorage speichern der favoriten liste kommt als nächstes 