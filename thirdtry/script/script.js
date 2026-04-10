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


document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    renderPage();
    setupMenuTabs();
    renderMenuByCategory(initialCategory);
});

function getInitialCategory(){
  return favoriteDishes.length > 0 ? "favorites" : "mealOfTheDay";
}

function getCategoryItems(category) {
  switch (category) {
    case "dishes":
      return myDishes;
    case "supplements":
      return mySupplements;
    case "alcoholicDrinks":
      return myalcoholicDrinks;
    case "drinks":
      return myDrinks;
    case "mealOfTheDay":
      return [mealOfTheDay];
    case "favorites":
      return favoriteDishes;
    default:
      return [];
  }
}

function setActiveTab(category){
  const tabs = document.querySelectorAll(".menuTabItem");
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === category);
  })
}

function renderMenuByCategory(category){
  const menuContent = document.getElementById("menuContent");
  if  (!menuContent) return;
  menuContent.innerHTML = "";
  const items = getCategoryItems(category);
  const favoriteSet = new Set(favoriteDishes.map((fav) => fav.name));
  items.forEach((item, index) => {
    const isFavorite = favoriteSet.has(item.name);
    createMenuItemCard(item, category, index, isFavorite);
  });
  setActiveTab(category);
}

function setupMenuTabs() {
  const tabList = document.querySelector(".menuTabList");
  if (!tabList) return;
  tabList.addEventListener("click", (event) => {
    const tabItem = event.target.closest(".menuTabItem");
    if (!tabItem) return;
    const category = tabItem.dataset.category;
    if (!category) return;
    renderMenuByCategory(category);
  });
}

const initialCategory = getInitialCategory();