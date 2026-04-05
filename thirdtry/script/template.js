function renderHeader(){
    return`
        <header>
            <div class="headerContainer">
                <div class="headerLogo">
                    <figure>
                        <img src="${imageMap.headerLogo}" alt="Mama'Afrika Logo">
                        <figcaption>Mama'Afrika</figcaption>
                    </figure>
                </div>
                <h1 class="headerTitle">Mama'Sambia</h1>
                <div class="headerIcon">
                <button id="basketIcon" class="basket-btn" title="Warenkorb öffnen">
                    <img src="${iconMap.menuIcon}" alt="Warenkorb">
                    <span class="basket-badge" id="basketBadge">0</span>
                </button>
            </div>
        </header>
    `;
};

function renderBannerSection(){
    return`
        <section class="headBanner" aria-label="Willkommensbanner">
            <div class="bannerContainer">
                <div class="bannerImage">
                    <img src="${imageMap.bannerLogo}" alt="Mama'Sambia Speisen">
                </div>
                <div class="bannerIcon">
                    <img src="${iconMap.bannerIcon2}" alt="Beste afrikanische Küche">
                </div>
            </div>
        </section>
    `;
};

function renderMainSection(){
    return`
    <section class="mainSection" aria-label="Hauptmenü">
            <div class="mainContainer">
                <div class="mainTitle">
                    <h2>Willkommen bei Mama'Sambia</h2>
                </div>
                
            </div>

    </section>
    `;
}