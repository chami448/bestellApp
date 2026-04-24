


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
