
function renderPage(){
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = renderHeader() + renderBannerHeader() + renderMainInfoSection() + renderBannerFooter(); 
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
                        <img src="${iconMap.menuCloseIcon}" alt="Menü Symbol" class="menuCloseIcon">
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


function renderBannerFooter(){
    return`
    <div class="bannerFooterContainer" aria-label="Banner Footer">
        <img src="${imageMap.footerBanner}" alt="Footer Banner" class="footerBanner">
    </div>
    `;
};