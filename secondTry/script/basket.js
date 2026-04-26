

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

  itemsContainer.innerHTML = basketItems.map(createBasketItemCard).join("");

  const subtotal = getBasketSubtotal();
  subtotalNode.textContent = formatEuro(subtotal);
  totalNode.textContent = formatEuro(subtotal);
  checkoutButton.disabled = subtotal <= 0;
}

function getBasketPanel() {
  return document.getElementById("basketSection");
}

function isBasketPanelOpen(panel) {
  return panel.classList.contains("isOpen");
}

function openBasketPanel() {
  const panel = getBasketPanel();
  if (!panel) return;

  panel.classList.remove("isClosed");
  panel.classList.add("isOpen");
  panel.setAttribute("aria-hidden", "false");
}

function closeBasketPanel() {
  const panel = getBasketPanel();
  if (!panel) return;

  panel.classList.remove("isOpen");
  panel.classList.add("isClosed");
  panel.setAttribute("aria-hidden", "true");
}

function toggleBasketPanel() {
  const panel = getBasketPanel();
  if (!panel) return;

  if (isBasketPanelOpen(panel)) {
    closeBasketPanel();
  } else {
    openBasketPanel();
  }
}

function handleBasketToggleKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  toggleBasketPanel();
}

function handleBasketEscape(event) {
  if (event.key !== "Escape") return;
  closeBasketPanel();
}

function setupBasketPanelToggle() {
  const toggleBtn = document.querySelector(".headBasketIcon");
  const panel = getBasketPanel();
  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener("click", toggleBasketPanel);
  toggleBtn.addEventListener("keydown", handleBasketToggleKeydown);
  document.addEventListener("keydown", handleBasketEscape);
}