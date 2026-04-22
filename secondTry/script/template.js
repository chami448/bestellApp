function createMenuItemCard(item, category, index){
    const div = document.createElement("div");
    div.className = "menuItemCard";
    div.dataset.itemName = item.name;
    div.dataset.category = category;
    div.dataset.itemIndex = index;
    div.innerHTML = `
    <div class="menuItemHeader">
        <h3 aria-label="${item.name}">${item.name}</h3>
        <span aria-label="Preis: ${item.price.toFixed(2)} Euro" class="price">${item.price.toFixed(2)} €</span>
    </div>
    <div class="menuItemText">
        <p aria-label="Beschreibung: ${item.description || "Keine Beschreibung vorhanden"}">${item.description || "Keine Beschreibung vorhanden"}</p>
    </div>
    <div class="menuItemActions">
        <button class="addBtn" aria-label="Zum Korb hinzufügen ${item.name}?" title="Zum Korb hinzufügen">
            <img src="${iconMap.addIcon}" alt="Hinzufügen">
        </button>
        <button class="likeBtn" aria-label="Zu Favoriten hinzufügen ${item.name}?" title="Zu Favoriten hinzufügen" aria-pressed="false">
            <img class="likeIcon actionIcon" src="${iconMap.likeIcon}" alt="Zu Favoriten hinzufügen">
            <img class="likedIcon actionIcon" src="${iconMap.likedIcon}" alt="Ist Favorit">
        </button>
    </div>
    `;
    return div;
}


function renderPage(){
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = renderHeader() + renderBannerHeader() + renderMainInfoSection() + renderMenuTabs() + renderBannerFooter() + renderFooterLinks(); 
}



function renderHeader(){
    return `
            <header aria-label="Main Header">
                   <div class="headerContainer">
                        <div class = "headLogo">
                        <img src="${imageMap.headerLogo}" alt="Kopfzeilen Logo" class="headerLogo">
                        </div>
                        <div class = "headerTitle">
                        <h1 class="headerTitleText">Mama Sambia</h1>
                        </div>
                        <button class = "headBasketIcon">
                        <img src="${iconMap.menuCloseIcon}" alt="Menü Symbol" class="menuCloseIcon" tabindex="0">
                        <span class="cartBadge" id="cartBadge">0</span>
                        </button>
                   </div>
            </header>
    `;
};


function renderBannerHeader(){
    return`
    <div class="bannerHeaderContainer" aria-label="Kopfzeilen Banner">
        <img src="${imageMap.headerBanner}" alt="Kopfzeilen Banner" class="headerBanner">
        <img src="${iconMap.bannerIcon2}" alt="Kopfzeilen Symbol 2" class="bannerIcon2">
    </div>
    `;
};

function renderMainInfoSection(){
    return`
            <section class="mainInfoSection" aria-label="Informationen">
               <div class="mainInfoContainer">
                <div class="mainInfoTitleContainer">
                <h2 class="mainInfoTitle">Willkommen bei Mama Sambia</h2>
                </div>
                <div class="mainInfoTextContainer">
                <p class="mainInfoText">
                    Entdecken Sie die authentischen Aromen Sambias mit unserem vielfältigen Menü, 
                    das traditionelle Gerichte und moderne Interpretationen bietet. 
                    Genießen Sie die reiche Kultur und die köstlichen Geschmäcker, 
                    die wir mit Liebe zubereiten.
                </p>
                </div>
                <div class="mainInfoHighlightContainer">
                <p class="mainInfoNote">
                    <span class="highlight">Hinweis:</span> 
                    Es gibt nur zwei Hauptgerichte — 
                    <span class="highlight">Fufu</span> und 
                    <span class="highlight">Jollofreis</span>. 
                    Alle weiteren Optionen sind Beilagen, die Sie nach Wunsch auswählen können.
                </p>
                </div>

            </div>
            </section>
    
    `;
}

function renderBasket(){
    return`
        <aside class="basketSection" id="basketSection" aria-label="Warenkorb">
                <div class="basketContainer">
                    <div class="basketTitleContainer">
                        <h2 class="basketTitle">Warenkorb</h2>
                    </div>
                    <div class="basketItemsContainer" >
                        <!-- Hier werden die Warenkorb-Items dynamisch eingefügt -->
                    </div>
                    <div class="basketTotalContainer">
                        <p class="basketTotalText">Gesamt: <span id="basketTotalPrice">0,00 €</span></p>
                    </div>
                    <div class="deliveryOptionsContainer">
                        <button class="deliveryOptionButton" id="delivery" tabindex="0">Lieferung</button>
                        <button class="deliveryOptionButton" id="pickup" tabindex="0">Abholung</button>
                    </div>
                    <div class="tipContainer">
                        <p class="tipText">Trinkgeld:</p>
                        <div class="tipOptionsContainer">
                            <button class="tipOptionButton" data-tip="0.05" tabindex="0">5%</button>
                            <button class="tipOptionButton" data-tip="0.1" tabindex="0">10%</button>
                            <button class="tipOptionButton" data-tip="0.15" tabindex="0">15%</button>
                        </div>
                    </div>
                    <div class="checkoutContainer">
                    <button class="checkoutButton" id="checkoutButton" tabindex="0">Zur Kasse</button>
                    <p class="minimumOrderNote">Mindestbestellwert: 15,00 €</p>
                    </div>
                </div>
        </aside>
    
    `;
}

function renderMenuTabs(){
    return`
    <section class="menuTabsSection" aria-label="Menü Tabs">
        <div class="menuTabsContainer">
            <nav class="menuTabsNav">
                <span class="menuTab" data-category="dishes" tabindex="0">Hauptgerichte</span>
                <span class="menuTab" data-category="supplements" tabindex="0">Beilagen</span>
                <span class="menuTab" data-category="alcoholicDrinks" tabindex="0">Alkoholische Getränke</span>
                <span class="menuTab" data-category="drinks" tabindex="0">Soft-Getränke</span>
                <span class="menuTab" data-category="mealOfTheDay" tabindex="0">Speise des Tages</span>
                <span class="menuTab" data-category="favorites" tabindex="0"> Favoriten</span>
            </nav>
            <div class="menuItemsContainer" aria-label="Menü Items">
                <!-- Hier werden die Menü-Items dynamisch eingefügt -->
            </div>
        </div>
    </section>
    
    `;
}
/*
function renderMenuItemCard(item, category, index){
    return`
        <div class="menuItemCard" aria-label="Menü Item Karten">
            <div class="menuItemHeader">
        <h3 aria-label="${item.name}">${item.name}</h3>
        <span aria-label="Preis: ${item.price.toFixed(2)} Euro" class="price">${item.price.toFixed(2)} €</span>
    </div>
    <div class="menuItemText">
        <p aria-label="Beschreibung: ${item.description || "Keine Beschreibung vorhanden"}">${item.description || "Keine Beschreibung vorhanden"}</p>
    </div>
    <div class="menuItemActions">
        <button class="addBtn" aria-label="Zum Korb hinzufügen ${item.name}?" title="Zum Korb hinzufügen">
            <img src="${iconMap.addIcon}" alt="Hinzufügen">
        </button>
        <button class="likeBtn" aria-label="Zu Favoriten hinzufügen ${item.name}?" title="Zu Favoriten hinzufügen">
            <img class="likeIcon" src="${iconMap.likeIcon}" alt="Zu Favoriten hinzufügen">
            <img class="likedIcon" src="${iconMap.likedIcon}" alt="Ist Favorit">
        </button>
    </div>
    `;
}*/




function renderBannerFooter(){
    return`
    <div class="bannerFooterContainer" aria-label="Banner Footer">
        <img src="${imageMap.footerBanner}" alt="Footer Banner" class="footerBanner">
    </div>
    `;
};


function renderFooterLinks(){
    return`
    <div class="footerLinksContainer" aria-label="Footer Links">
        <a href="#" class="footerLink" tabindex="0">Impressum</a>
        <a href="#" class="footerLink" tabindex="0">Datenschutz</a>
        <a href="#" class="footerLink" tabindex="0">AGB</a>  
    </div>
    
    `;
}