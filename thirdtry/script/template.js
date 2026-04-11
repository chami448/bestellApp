function createMenuItemCard(item, category, index, isFavorite){
    const menuContent = document.getElementById("menuContent");
    if (!menuContent) return null;
    const div = document.createElement("div");
    div.className = "menuItem";
    div.dataset.itemName = item.name;
    div.dataset.category = category;
    div.dataset.itemIndex = index;
    div.innerHTML = `
    <div class="menuItemContent">
        <div class="menuItemHeader">
            <h3>${item.name}</h3>
            <span class="price">${item.price.toFixed(2)}€</span>
        </div>
        <div class="menuItemDescription">
            <p>${item.description || ""}</p>
        </div>
        <div class="menuItemActions">
            <button class="addBtn" title="Zum Korb hinzufügen">
                <img src="${iconMap.addIcon}" alt="Hinzufügen">
            </button>
            <button class="likeBtn ${isFavorite ? "liked" : ""}" title="Zu Favoriten hinzufügen">
                <img class="likeIcon" src="${iconMap.likeIcon}" alt="Favorit">
                <img class="likedIcon ${isFavorite ? "active" : ""}" src="${iconMap.likedIcon}" alt="Ist Favorit">
            </button>
        </div>
    </div>
    `;
    menuContent.appendChild(div);
}

function renderPage() {
  const app = document.getElementById("app");
  if (!app) return;
    app.innerHTML =
        renderHeader() + renderMain() + renderFooter() + renderDialogs();
}

function renderHeader() {
  return `
        <header id="header">
            ${renderHeaderSection()}
            ${renderBannerSection()}
        </header>
    `;
}

function renderHeaderSection() {
  return `
        <section class="headerSection">
            <div class="headerContainer">
                <div class="headerLogo">
                    
                        <img id="headerLogo" src="${imageMap.headerLogo}" alt="Mama'Afrika Logo">
                        
                    
                </div>
                <h1 class="headerTitle">Mama'Sambia</h1>
                <div class="headerIcon">
                <button id="basketIcon" class="basket-btn" title="Warenkorb geschlossen">
                    <img class="headerIcon" src="${iconMap.menuCloseIcon}" alt="Warenkorb">
                    <span class="basketBadge" id="basketBadge">0</span>
                </button>
            </div>
        
    </section>
    `;
}

function renderBannerSection() {
  return `
        <section class="headBanner" aria-label="Willkommensbanner">
            <div class="bannerContainer">
                <div class="bannerImageContainer">
                    <img class="bannerImage" src="${imageMap.bannerLogo}" alt="Mama'Sambia Speisen">
                </div>
                <div class="bannerIconContainer">
                    <img class="bannerIcon" src="${iconMap.bannerIcon2}" alt="Beste afrikanische Küche">
                </div>
            </div>
        </section>
    `;
}

function renderMain() {
  return `
        <main id="mainContent">
            ${renderMainInfoSection()}
            ${renderMenuSection()}
            ${renderBasketSection()}
        </main>
    `;
}

function renderMainInfoSection() {
  return `
    <section class="mainInfoSection" aria-label="Hauptmenü">
            <div class="mainInfoContainer">
                <div class="mainTitle">
                    <h2 class="title">Willkommen bei Mama'Sambia</h2>
                </div>
                <div class="mainDescription">
                    <p>
                    <span class="highlight">Hinweis:</span> Es gibt nur zwei Hauptgerichte — 
                    <span class="highlight">Fufu</span> und <span class="highlight">Jollofreis</span>. 
                    Alle weiteren Optionen sind Beilagen, die Sie nach Wunsch auswählen können.
                </p>
                </div>
            </div>
    </section>
    `;
}

function renderMenuSection() {
  return `
        <section class="menuSection" aria-label="Menü">
            <div class="menuContainer">
                <div class="menuTabs">
                    <nav aria-label="Menü-Kategorien">
                        <ul class="menuTabList">
                            <li class="menuTabItem" data-category="dishes"><button class="menuTabButton">Hauptgerichte</button></li>
                            <li class="menuTabItem" data-category="supplements"><button class="menuTabButton">Beilagen</button></li>
                            <li class="menuTabItem" data-category="alcoholicDrinks"><button class="menuTabButton">Alkoholische Getränke</button></li>
                            <li class="menuTabItem" data-category="drinks"><button class="menuTabButton">Getränke</button></li>
                            <li class="menuTabItem" data-category="mealOfTheDay"><button class="menuTabButton">Gericht des Tages</button></li>
                            <li class="menuTabItem active" data-category="favorites"><button class="menuTabButton">Favoriten</button></li>
                        </ul>
                    </nav>
                </div>
                <div class="menuContent" id="menuContent">
                    <!-- Dynamisch gefüllt -->
                </div>
            </div>
        </section>
    `;
}

function renderBasketSection() {
  return `
        <aside class="basketSection hidden" aria-label="Warenkorb">
            <div class="basketContainer">
                <h2>Warenkorb</h2>
                <div class="basketItems" id="basketItems">
                    <!-- Dynamisch gefüllt -->
                </div>
            </div>
        </aside>
    `;
}

function renderFooter() {
  return `
        <footer id="footer">
            ${renderPromoSection()}
            ${renderFooterSection()}
        </footer>
    `;
}

function renderPromoSection() {
  return `
        <section class="footerSection" aria-label="Werbebanner">
            <div class="footerSectionBanner">
                <img class="footerBanner" src="${imageMap.footerLogo}" alt="Spezialgerichte von Mama'Sambia">
            </div>
        </section>
    `;
}

function renderFooterSection() {
  return `
    
            <div class="footerContainer">
                <div class="footerSectionLaw">
                    <span>&copy; Mama'Sambia 2024. Alle Rechte vorbehalten.</span>
                </div>
                <div class="footerSectionRate">
                    <span>Bewertung: 4,2 ⭐ von 5 Sternen</span>
                </div>
                
            </div>
            <div class="footerSectionLinks">
                    <nav class="footerLinks">
                        <a href="#">Kontakt</a>
                        <a href="#">Impressum</a>
                        <a href="#">Datenschutz</a>
                    </nav>
                </div>
    
    `;
}

function renderDialogs() {
  return `
       <dialog id="dialogContainer">
        ${renderDialog()}
        ${renderSendedDialog()}
        </dialog> 
    `;
}

function renderDialog() {
  return `
        <dialog id="dialog" class="dialogSection">
            <div class="dialogContent">
                <h2 id="dialogTitle">Probe Bestellung abschliessen?</h2>
                <p id="dialogMessage">Bist du sicher, dass du fertig bist und bestellen moechtest?</p>
            </div>
            <div class="dialogActions">
                <button id="confirmYesBtn" class="dialogBtn">ja, ich will!</button>
                <button id="confirmNoBtn" class="dialogBtn">nein, not sure!</button>
            </div>
        </dialog>
    `;
}

function renderSendedDialog() {
  return `
        <dialog id="orderDialog" class="dialogSection">
            <div class="dialogContent">
                <p id="orderDialogMessage">Probe-Bestellung erfolgreich gesendet!</p>
            </div>
        </dialog>
    `;
}
