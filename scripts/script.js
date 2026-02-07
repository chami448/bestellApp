function loadFromLocalStorage() {
    const stored = localStorage.getItem('favoriteDishes');
    if (stored) {
        try {
            const loaded = JSON.parse(stored);
            favoriteDishes.length = 0;
            favoriteDishes.push(...loaded);
        } catch (e) {
            console.error('Fehler beim Laden von LocalStorage:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    loadFromLocalStorage();
    
    renderPage();
    

    renderPageMainOnly();



    const startCategory = getInitialCategory();
    renderMenuWithFavoriteStatus(startCategory);
    

    setActiveTab(startCategory);
    setupMenuTabs();
    
    setupMenuActions();
});

function buildFavoriteSet() {
    return new Set(favoriteDishes.map(f => f.name));
}

function renderMenuWithFavoriteStatus(category) {
    const items = categoryMap[category] || [];
    const favoriteSet = buildFavoriteSet();

    const menuList = document.querySelector('.menuList');
    menuList.innerHTML = '';

    items.forEach((item, index) => {
        const isFavorite = favoriteSet.has(item.name);
        const menuItem = createMenuItem(item, category, index, isFavorite);
        menuList.appendChild(menuItem);
    });
}

function getInitialCategory() {
    const stored = localStorage.getItem('favoriteDishes');
    if (!stored) return 'dishes';
    
    try {
        const favorites = JSON.parse(stored);
        return favorites.length > 0 ? 'favorites' : 'dishes';
    } catch (e) {
        return 'dishes';
    }
}

function setActiveTab(category) {
    const tabs = document.querySelectorAll('.menuTab');
    tabs.forEach(t => t.classList.remove('active'));
    const active = document.querySelector(`.menuTab[data-category="${category}"]`);
    if (active) active.classList.add('active');
}

function setupMenuTabs() {
    const tabs = document.querySelectorAll('.menuTab');

    tabs.forEach(tab => {
        if (!tab.hasAttribute('tabindex')) {
            tab.setAttribute('tabindex', '0');
        }
    });

    function activateTab(tab) {
        const category = tab.dataset.category;
        setActiveTab(category);
        renderMenuWithFavoriteStatus(category);
        setupMenuActions();
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));

        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateTab(tab);
            }
        });
    });
}


function renderPageMainOnly() {
    const main = document.querySelector('main');
    if (!main) return;
    main.outerHTML = renderMain(); 
}








function setupMenuActions() {
    const menuList = document.querySelector('.menuList');
    
    menuList.addEventListener('click', (e) => {
        if (e.target.closest('.addBtn')) {
            const menuItem = e.target.closest('.menuItem');
            const itemName = menuItem.dataset.itemName;
            const category = menuItem.dataset.category;
            
            handleAddToBasket(itemName, category);
        }
        
        if (e.target.closest('.likeBtn')) {
            const menuItem = e.target.closest('.menuItem');
            const itemName = menuItem.dataset.itemName;
            const category = menuItem.dataset.category;
            const itemIndex = menuItem.dataset.itemIndex;
            
            handleToggleFavorite(menuItem, itemName, category, itemIndex);
        }
    });
}


/**
 * @param {string} itemName - Name des Items
 * @param {string} category - Kategorie des Items
 */
function handleAddToBasket(itemName, category) {
    console.log(`✅ ${itemName} wurde zum Korb hinzugefügt`);
    // TODO: Implementierung des Basket-Systems
    alert(`${itemName} wurde zum Korb hinzugefügt!`);
}

/**
 * Verarbeitet das Hinzufügen/Entfernen eines Items aus Favoriten
 * @param {Element} menuItem - Das Menu-Item DOM-Element
 * @param {string} itemName - Name des Items
 * @param {string} category - Kategorie des Items
 * @param {number} itemIndex - Index im Array
 */
function handleToggleFavorite(menuItem, itemName, category, itemIndex) {
    // Hole das komplette Item-Objekt aus der Datenbank
    const items = categoryMap[category];
    const item = items[itemIndex];
    
    // Toggle in favoriteDishes
    toggleFavorite(itemName, item, category);
    
    // Visuelles Feedback: Like-Button Toggle
    const likeBtn = menuItem.querySelector('.likeBtn');
    const likedIcon = menuItem.querySelector('.likedIcon');
    
    const isFavorite = favoriteDishes.some(fav => fav.name === itemName);
    
    if (isFavorite) {
        likeBtn.classList.add('liked');
        likedIcon.classList.add('active');
        console.log(`❤️ ${itemName} zu Favoriten hinzugefügt`);
    } else {
        likeBtn.classList.remove('liked');
        likedIcon.classList.remove('active');
        console.log(`🤍 ${itemName} aus Favoriten entfernt`);
    }
}

function toggleFavorite(itemName, item, category) {
    const existingIndex = favoriteDishes.findIndex(fav => fav.name === itemName);

    if (existingIndex > -1) {
        favoriteDishes.splice(existingIndex, 1);
    } else {
        const favoriteItem = { ...item, category };
        favoriteDishes.push(favoriteItem);
    }

    localStorage.setItem('favoriteDishes', JSON.stringify(favoriteDishes));
}