function getCheckoutDialogElements(){
    const dialog = document.querySelector("#checkoutDialog");
    const checkoutButton = document.getElementById("checkoutButton");
    const messageText = document.getElementById("checkoutMessageText");
    const closeIconButton = document.getElementById("closeDialogIcon");
    const closeOkButton = document.getElementById("closeDialogBtn");
    if(!dialog || !checkoutButton || !messageText || !closeIconButton || !closeOkButton){
        return null;
    }
    return {
        dialog,
        checkoutButton,
        messageText,
        closeIconButton,
        closeOkButton
    };
};

function isCheckoutValid() {
  if (!Array.isArray(basketItems) || basketItems.length === 0) {
    return false;
  }

  if (selectedDeliveryMode === "pickupMode") {
    return true;
  }

  if (selectedDeliveryMode === "deliveryMode") {
    const subtotal = getBasketSubtotal();
    return subtotal >= minimumOrderValue;
  }

  return false;
};

function getCheckoutMessage() {
  const mode = pickOrDeliveryMode[selectedDeliveryMode];
  if (!mode || !mode.message) {
    return "Ihre Probebestellung wurde aufgenommen.";
  }
  return mode.message;
};


function clearBasketAfterCheckout() {
  basketItems.length = 0;
  updateBasketUI();
  updateCartBadge();
};

function openCheckoutDialog() {
  const elements = getCheckoutDialogElements();
  if (!elements) return;
  if (!isCheckoutValid()) return;

  const message = getCheckoutMessage();
  elements.messageText.textContent = message;

  if (!elements.dialog.open) {
    elements.dialog.showModal();
  }

  clearBasketAfterCheckout();
};

function closeCheckoutDialog() {
  const elements = getCheckoutDialogElements();
  if (!elements) return;

  if (elements.dialog.open) {
    elements.dialog.close();
  }
};

function setupCheckoutDialog() {
  const elements = getCheckoutDialogElements();
  if (!elements) return;

  elements.checkoutButton.addEventListener("click", openCheckoutDialog);
  elements.closeIconButton.addEventListener("click", closeCheckoutDialog);
  elements.closeOkButton.addEventListener("click", closeCheckoutDialog);
};