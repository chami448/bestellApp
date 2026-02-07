





function createMenuItem(item, category, index, isFavorite) {
    const div = document.createElement('div');
    div.className = 'menuItem';
    div.dataset.itemName = item.name;
    div.dataset.category = category;
    div.dataset.itemIndex = index;
    

    
    div.innerHTML = `
        <div class="menuItemContent">
            <div class="menuItemHeader">
                <h3>${item.name}</h3>
                <span class="price">${item.price.toFixed(2)} €</span>
            </div>
            <p class="description">${item.description || 'Keine Beschreibung vorhanden'}</p>
            
            <div class="menuItemActions">
                <button class="addBtn" title="Zum Korb hinzufügen">
                    <img src="./image/icon/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Hinzufügen">
                </button>
                
                <button class="likeBtn ${isFavorite ? 'liked' : ''}" title="Zu Favoriten hinzufügen">
                    <img class="likeIcon" src="./image/icon/favorite_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Favorit">
                    <img class="likedIcon ${isFavorite ? 'active' : ''}" src="./image/icon/heart_check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Ist Favorit">
                </button>
            </div>
        </div>
    `;
    
    return div;
}












function renderPage() {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = renderHeader() + renderMain() + renderFooter();
}


function renderHeader() {
    return `
        <header>
            <div class="headerImage">
                <figure>
                    <img src="./image/img/suggabearsclub-africa-9904843_640.png" alt="Mama'Afrika Logo">
                    <figcaption>Mama'Afrika</figcaption>
                </figure>
            </div>
            <div class="headerIcon">
                <button id="cartIcon" class="cart-btn" title="Warenkorb öffnen">
                    <img src="./image/icon/menu_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Warenkorb">
                    <span class="cart-badge" id="cartBadge">0</span>
                </button>
            </div>
        </header>
    `;
}



function renderMain() {
    return `
        <main id="mainContent">
            ${renderBannerSection()}
            ${renderInfoSection()}
            ${renderMenuSection()}
            ${renderPromoSection()}
        </main>
    `;
}






function renderBannerSection() {
    return `
        <section class="headSection" aria-label="Willkommensbanner">
            <div class="mainBanner">
                <img src="./image/img/buffetcrush-christmas-wallpaper-2009590_640.jpg" alt="Mama'Afrika Speisen">
                <img class="banner-icon" src="./image/icon/clker-free-vector-images-place-setting-309980_640.png" alt="">
            </div>
        </section>
    `;
}

function renderInfoSection() {
    return `
        <section class="mainTitleSection" aria-label="Informationen">
            <div class="mainSectionHeader">
                <h1>Mama'Afrika Menü</h1>
                <p>Hier kannst du deine Bestellung überprüfen und anpassen.</p>
                <p>
                    <span class="highlight">Hinweis:</span> Es gibt nur zwei Hauptgerichte — 
                    <span class="highlight">Fufu</span> und <span class="highlight">Jollofreis</span>. 
                    Alle weiteren Optionen sind Beilagen, die Sie nach Wunsch auswählen können.
                </p>
            </div>
        </section>
    `;
}

function renderMenuSection() {
    return `
        <section class="mainContentSection" aria-label="Menü und Warenkorb">
            <aside id="basketWrapper" class="basket-sidebar" aria-label="Warenkorb">
                <div id="basketContent" class="basket-items">
                    <!-- Dynamisch gefüllt -->
                </div>
                <div id="basketFooter" class="basket-footer">
                    <div id="totalPriceContainer">
                        <div class="price-row">
                            <span>Zwischensumme:</span>
                            <span id="subtotalPrice">0,00 €</span>
                        </div>
                        <div class="price-row">
                            <span>Lieferkosten:</span>
                            <span id="deliveryPrice">2,99 €</span>
                        </div>
                        <div class="price-row total">
                            <span>Gesamtpreis:</span>
                            <span id="totalPrice">0,00 €</span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <button id="btnDelivery" class="delivery-btn active">🚗 Lieferung</button>
                        <button id="btnPickup" class="delivery-btn">🏪 Abholung</button>
                    </div>
                    <button id="orderButton" class="order-btn">Bestellung abschicken</button>
                </div>
            </aside>
            <div id="mainContentWrapper" class="menu-area">
                <nav class="menuTitle" aria-label="Menü-Kategorien">
                    <span class="menuTab" data-category="dishes">Hauptgerichte</span>
                    <span class="menuTab" data-category="supplements">Beilagen</span>
                    <span class="menuTab" data-category="alcoholicDrinks">Alkoholische Getränke</span>
                    <span class="menuTab" data-category="drinks">Soft-Getränke</span>
                    <span class="menuTab" data-category="mealOfTheDay">Speise des Tages</span>
                    <span class="menuTab" data-category="favorites">❤️ Favoriten</span>
                </nav>
                <div class="menuList" aria-label="Menü-Items">
                    <!-- Dynamisch gefüllt von renderMenu() -->
                </div>
            </div>
        </section>
    `;
}


function renderPromoSection() {
    return `
        <section class="footerSection" aria-label="Werbebanner">
            <div class="footerSectionBanner">
                <img src="./image/img/luk1004-food-3083223_640.jpg" alt="Spezialgerichte von Mama'Afrika">
            </div>
        </section>
    `;
}


function renderFooter() {
    return `
        <footer>
            <div class="footerContent">
                <div class="footer-section">
                    <span>&copy; Mama'Afrika 2024. Alle Rechte vorbehalten.</span>
                </div>
                <div class="footer-section">
                    <span>Bewertung: 4,2 ⭐ von 5 Sternen</span>
                </div>
                <div class="footer-section">
                    <nav class="footer-links">
                        <a href="#">Kontakt</a>
                        <a href="#">Impressum</a>
                        <a href="#">Datenschutz</a>
                    </nav>
                </div>
            </div>
        </footer>
    `;
}