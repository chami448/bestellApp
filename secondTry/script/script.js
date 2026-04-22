document.addEventListener("DOMContentLoaded", () => {
    renderPage();
    renderMenuItems("dishes");
    setupMenuTabs();
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
        const itemCard = createMenuItemCard(item, category, index);
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