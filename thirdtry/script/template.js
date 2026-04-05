function renderHeader(){
    return`
        <header>
            <div class="headerContainer">
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
            </div>
        </header>
    `;
}