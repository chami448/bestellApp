function renderPage() {
  const app = document.getElementById("app");
  if (!app) return;
    app.innerHTML =
        renderHeader() + renderMain() + renderFooter() + renderDialogs();
}

function renderHeader() {
  return `
        <header>
            <div class="headerImage">
                <figure>
                    <img src="${iconMap.logoImage}" alt="Mama'Afrika Logo">
                    <figcaption>Mama'Afrika</figcaption>
                </figure>
            </div>
            <div class="headerIcon">
                <button id="cartIcon" class="cart-btn" title="Warenkorb öffnen">
                    <img src="${iconMap.menuIcon}" alt="Warenkorb">
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
                <img src="${iconMap.heroImage}" alt="Mama'Afrika Speisen">
                <img class="banner-icon" src="${iconMap.bannerIcon}" alt="">
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
                    <span class="menuTab" data-category="dishes" tabindex="0">Hauptgerichte</span>
                    <span class="menuTab" data-category="supplements" tabindex="0">Beilagen</span>
                    <span class="menuTab" data-category="alcoholicDrinks" tabindex="0">Alkoholische Getränke</span>
                    <span class="menuTab" data-category="drinks" tabindex="0">Soft-Getränke</span>
                    <span class="menuTab" data-category="mealOfTheDay" tabindex="0">Speise des Tages</span>
                    <span class="menuTab" data-category="favorites" tabindex="0">❤️ Favoriten</span>
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
                <img src="${iconMap.promoImage}" alt="Spezialgerichte von Mama'Afrika">
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

function renderDialogs() {
  return `
        <dialog id="confirmDialog" class="order-dialog">
            <div class="dialog-content">
                <h2>Bestellung abschliessen?</h2>
                <p>Bist du sicher, dass du fertig bist und bestellen moechtest?</p>
                <div class="dialog-actions">
                    <button id="confirmYesBtn" class="dialog-btn">ja, ich will!</button>
                    <button id="confirmNoBtn" class="dialog-btn secondary">nein, not sure!</button>
                </div>
            </div>
        </dialog>
        <dialog id="orderDialog" class="order-dialog">
            <div class="dialog-content">
                <h2 id="dialogTitle">Probe-Bestellung</h2>
                <p id="dialogMessage"></p>
                <div class="dialog-actions">
                    <button id="dialogCloseBtn" class="dialog-btn">OK</button>
                </div>
            </div>
        </dialog>
    `;
}