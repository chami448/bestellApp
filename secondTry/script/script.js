


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

function setStickyHeader(header, spacer) {
  spacer.style.height = `${header.offsetHeight}px`;
  header.before(spacer);
  Object.assign(header.style, {
    position: "fixed", top: "0", left: "50%",
    transform: "translateX(-50%)",
    width: "min(calc(100% - 24px), 1440px)", zIndex: "1500"
  });
}

function unsetStickyHeader(header, spacer) {
  header.removeAttribute("style");
  spacer.remove();
}

function setupProjectStickyHeader() {
  const header = document.querySelector("header");
  if (!header) return;
  const startOffset = header.getBoundingClientRect().top + window.scrollY;
  const spacer = document.createElement("div");
  let fixed = false;

  const onScroll = () => {
    const shouldFix = window.scrollY >= startOffset;
    if (shouldFix && !fixed) { setStickyHeader(header, spacer); fixed = true; }
    if (!shouldFix && fixed) { unsetStickyHeader(header, spacer); fixed = false; }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}


document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    const startCartegory = getInitialCategory();
    renderPage();
    setupProjectStickyHeader();
    renderMenuItems(startCartegory);
    setActiveTab(startCartegory);
    setupMenuTabs();
    setupMenuItemActions();
    updateBasketUI();
    updateCartBadge();
    setupBasketPanelToggle();
    setupBasketItemActions(); 
    setupBasketSummaryActions();
    setupCheckoutDialog();
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
