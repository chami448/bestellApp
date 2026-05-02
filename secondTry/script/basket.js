

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
    (entry) => entry.id === item.id
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

    const subtotal = 0;
    subtotalNode.textContent = formatEuro(subtotal);

    updateSummaryRows(subtotal);
    updateModeButtonsUI();
    updateTipButtonsUI();
    updateMinimumOrderUI(subtotal);
    return;
  }

  itemsContainer.innerHTML = basketItems.map(createBasketItemCard).join("");

  const subtotal = getBasketSubtotal();
  subtotalNode.textContent = formatEuro(subtotal);

  updateSummaryRows(subtotal);
  updateModeButtonsUI();
  updateTipButtonsUI();
  updateMinimumOrderUI(subtotal);
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


const BASKET_MIN_QTY = 1;
const BASKET_MAX_QTY = 30;

function setupBasketItemActions() {
  const container = document.getElementById("basketItemsContainer");
  if (!container) return;
  container.addEventListener("click", handleBasketItemClick);
}

function handleBasketItemClick(event) {
  const plusBtn = event.target.closest(".qtyPlusBtn");
  if (plusBtn) return increaseBasketItem(plusBtn);

  const minusBtn = event.target.closest(".qtyMinusBtn");
  if (minusBtn) return decreaseBasketItem(minusBtn);

  const removeBtn = event.target.closest(".removeItemBtn");
  if (removeBtn) return removeBasketItem(removeBtn);
}

function getBasketItemIdentity(btn) {
  return {
    id: btn.dataset.itemId
  };
}

function findBasketItemIndex(id) {
  return basketItems.findIndex(
    (entry) => entry.id === id  
  );
}

function increaseBasketItem(btn) {
  const { id } = getBasketItemIdentity(btn);
  const index = findBasketItemIndex(id);
  if (index === -1) return;

  if (basketItems[index].quantity >= BASKET_MAX_QTY) {
    alert("Maximale Menge pro Artikel ist " + BASKET_MAX_QTY + ".");
    return;
  }

  basketItems[index].quantity += 1;
  updateBasketUI();
  updateCartBadge();
}

function decreaseBasketItem(btn) {
  const { id } = getBasketItemIdentity(btn);
  const index = findBasketItemIndex(id);
  if (index === -1) return;

  if (basketItems[index].quantity <= BASKET_MIN_QTY) {
    alert("Mindestmenge ist 1. Nutze X zum Entfernen.");
    return;
  }

  basketItems[index].quantity -= 1;
  updateBasketUI();
  updateCartBadge();
}

function removeBasketItem(btn) {
  const { id } = getBasketItemIdentity(btn);
  const index = findBasketItemIndex(id);
  if (index === -1) return;

  basketItems.splice(index, 1);
  updateBasketUI();
  updateCartBadge();
}




function setupBasketSummaryActions() {
  const deliveryBtn = document.getElementById("btnDeliveryMode");
  const pickupBtn = document.getElementById("btnPickupMode");
  const tipContainer = document.querySelector(".tipOptionsContainer");

  if (deliveryBtn) deliveryBtn.addEventListener("click", () => setDeliveryMode("deliveryMode"));
  if (pickupBtn) pickupBtn.addEventListener("click", () => setDeliveryMode("pickupMode"));
  if (tipContainer) tipContainer.addEventListener("click", handleTipClick);
}

function setDeliveryMode(modeKey) {
  selectedDeliveryMode = modeKey;
  updateBasketUI();
}

function handleTipClick(event) {
  const tipBtn = event.target.closest(".tipOptionButton");
  if (!tipBtn) return;
  selectedTipRate = Number(tipBtn.dataset.tip) || 0;
  updateBasketUI();
}


function getDepositTotal() {
  return basketItems.reduce((sum, entry) => {
    const deposit = entry.deposit || 0;
    return sum + deposit * entry.quantity;
  }, 0);
}

function getDeliveryCost() {
  const mode = pickOrDeliveryMode[selectedDeliveryMode];
  return mode ? mode.cost : 0;
}

function getTipAmount(subtotal) {
  return subtotal * selectedTipRate;
}

function getGrandTotal() {
  const subtotal = getBasketSubtotal();
  const deposit = getDepositTotal();
  const delivery = getDeliveryCost();
  const tipAmount = getTipAmount(subtotal);
  return subtotal + deposit + delivery + tipAmount;
}


function updateSummaryRows(subtotal) {
  const depositNode = document.getElementById("summaryDeposit");
  const deliveryNode = document.getElementById("summaryDelivery");
  const tipNode = document.getElementById("summaryTip");
  const totalNode = document.getElementById("summaryTotal");

  if (depositNode) depositNode.textContent = formatEuro(getDepositTotal());
  if (deliveryNode) deliveryNode.textContent = formatEuro(getDeliveryCost());
  if (tipNode) tipNode.textContent = formatEuro(getTipAmount(subtotal));
  if (totalNode) totalNode.textContent = formatEuro(getGrandTotal());
}

function updateModeButtonsUI() {
  const deliveryBtn = document.getElementById("btnDeliveryMode");
  const pickupBtn = document.getElementById("btnPickupMode");
  if (deliveryBtn) deliveryBtn.classList.toggle("isActive", selectedDeliveryMode === "deliveryMode");
  if (pickupBtn) pickupBtn.classList.toggle("isActive", selectedDeliveryMode === "pickupMode");
}

function updateTipButtonsUI() {
  const tipButtons = document.querySelectorAll(".tipOptionButton");
  tipButtons.forEach((btn) => {
    const value = Number(btn.dataset.tip) || 0;
    btn.classList.toggle("isActive", value === selectedTipRate);
  });
}

function updateMinimumOrderUI(subtotal) {
  const minimumOrderInfo = document.getElementById("minimumOrderInfo");
  const checkoutButton = document.getElementById("checkoutButton");
  if (!minimumOrderInfo || !checkoutButton) return;

  if (selectedDeliveryMode === "pickupMode") {
    minimumOrderInfo.hidden = true;
    checkoutButton.disabled = subtotal <= 0;
    return;
  }

  minimumOrderInfo.hidden = false;
  const missing = Math.max(0, minimumOrderValue - subtotal);
  minimumOrderInfo.textContent =
    missing > 0
      ? `Es fehlen noch ${formatEuro(missing)} bis zum Mindestbestellwert.`
      : `Mindestbestellwert erreicht.`;
  checkoutButton.disabled = subtotal < minimumOrderValue;
}