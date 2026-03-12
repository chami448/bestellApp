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
}