
function renderPage(){
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = renderHeader() + renderBannerHeader() + renderBannerFooter(); 
}



function renderHeader(){
    return `
            <header aria-label="Main Header">
                   <div class="headerContainer">
                        <div class = "headLogo">
                        <img src="${imageMap.headerLogo}" alt="Header Logo" class="headerLogo">
                        </div>
                        <div class = "headerTitle">
                        <h1 class="headerTitleText">Mama Sambia</h1>
                        </div>
                        <div class = "headBasketIcon">
                        <img src="${iconMap.menuCloseIcon}" alt="Menu Icon" class="menuCloseIcon">
                        </div>
                   </div>
            </header>
    `;
};


function renderBannerHeader(){
    return`
    <div class="bannerHeaderContainer" aria-label="Banner Header">
        <img src="${imageMap.headerBanner}" alt="Header Banner" class="headerBanner">
        <img src="${iconMap.bannerIcon2}" alt="Banner Icon 2" class="bannerIcon2">
    </div>
    `;
};


function renderBannerFooter(){
    return`
    <div class="bannerFooterContainer" aria-label="Banner Footer">
        <img src="${imageMap.footerBanner}" alt="Footer Banner" class="footerBanner">
    </div>
    `;
};