




function renderHeader(){
    return `
            <header>
                   <div class="headerContainer">
                        <div class = "headLogo">
                        <img src="${imageMap.headerLogo}" alt="Header Logo" class="headerLogo">
                        </div>
                        <div class = "headerTitle">
                        <h1>Mama Sambia</h1>
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
    <div class="bannerHeaderContainer">
        <img src="${imageMap.headerBanner}" alt="Header Banner" class="headerBanner">
        <img src="${iconMap.bannerIcon2}" alt="Banner Icon 2" class="bannerIcon2">
    </div>
    `;
};


function renderBannerFooter(){
    return`
    <div class="bannerFooterContainer">
        <img src="${imageMap.footerBanner}" alt="Footer Banner" class="footerBanner">
    </div>
    `;
}