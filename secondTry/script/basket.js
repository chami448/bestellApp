

function formatEuro(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function getBasketSubtotal() {
  return basketItems.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
}

function addItemToBasketFromCard(addBtn) {
  const card = addBtn.closest(".menuItemCard");
  if (!card) return;

  const { item, category } = getItemFromCardData(card);
  if (!item) return;

  addToBasket(item, category);
}

function addToBasket(item, category) {
  const existingIndex = basketItems.findIndex(
    (entry) => entry.name === item.name && entry.category === category
  );

  if (existingIndex !== -1) {
    basketItems[existingIndex].quantity += 1;
  } else {
    basketItems.push({ ...item, category, quantity: 1 });
  }

  updateBasketUI();
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  const totalQuantity = basketItems.reduce((sum, entry) => sum + entry.quantity, 0);
  badge.textContent = String(totalQuantity);
}

function updateBasketUI() {
  const itemsContainer = document.getElementById("basketItemsContainer");
  const subtotalNode = document.getElementById("summarySubtotal");
  const totalNode = document.getElementById("summaryTotal");
  const checkoutButton = document.getElementById("checkoutButton");

  if (!itemsContainer || !subtotalNode || !totalNode || !checkoutButton) return;

  if (basketItems.length === 0) {
    itemsContainer.innerHTML = '<p class="emptyBasketText">Ihr Warenkorb ist noch leer.</p>';
    subtotalNode.textContent = "0,00 €";
    totalNode.textContent = "0,00 €";
    checkoutButton.disabled = true;
    return;
  }

  itemsContainer.innerHTML = basketItems
    .map(
      (entry) => `
        <div class="basketItemRow" aria-label="Warenkorb-Item ${entry.name}">
          <span class="basketItemName">${entry.name}</span>
          <span class="basketItemQuantity">x${entry.quantity}</span>
          <span class="basketItemPrice">${formatEuro(entry.price * entry.quantity)}</span>
        </div>
      `
    )
    .join("");

  const subtotal = getBasketSubtotal();
  subtotalNode.textContent = formatEuro(subtotal);
  totalNode.textContent = formatEuro(subtotal);
  checkoutButton.disabled = subtotal <= 0;
}