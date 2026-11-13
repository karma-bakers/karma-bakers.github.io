/**
 * KARMA WALA SWEETS AND BAKERS - WHATSAPP CHECKOUT SYSTEM
 * 
 * Validates checkout form, generates WhatsApp message,
 * and initiates direct ordering via WhatsApp (+923327512031).
 */

const Checkout = {
  whatsappNumber: "923327512031",

  init() {
    this.bindEvents();
    this.initDefaultDates();
  },

  initDefaultDates() {
    const dateInput = document.getElementById('checkoutDate');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  },

  bindEvents() {
    // Delivery vs Pickup toggle
    const deliveryRadio = document.getElementById('orderTypeDelivery');
    const pickupRadio = document.getElementById('orderTypePickup');
    const addressGroup = document.getElementById('deliveryAddressGroup');

    if (deliveryRadio && pickupRadio && addressGroup) {
      const handleToggle = () => {
        if (deliveryRadio.checked) {
          addressGroup.classList.remove('hidden');
          const addressInput = document.getElementById('checkoutAddress');
          if (addressInput) addressInput.setAttribute('required', 'required');
        } else {
          addressGroup.classList.add('hidden');
          const addressInput = document.getElementById('checkoutAddress');
          if (addressInput) addressInput.removeAttribute('required');
        }
      };

      deliveryRadio.addEventListener('change', handleToggle);
      pickupRadio.addEventListener('change', handleToggle);
    }

    // Checkout form submission
    const form = document.getElementById('checkoutForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processCheckout();
      });
    }
  },

  openCheckoutModal() {
    const items = Cart.getItems();
    if (items.length === 0) {
      alert('Your shopping cart is empty. Please add items to proceed.');
      return;
    }

    this.renderOrderReview();

    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  },

  renderOrderReview() {
    const container = document.getElementById('checkoutOrderReview');
    if (!container) return;

    const items = Cart.getItems();
    const summary = Cart.getSummary();

    let html = `
      <div class="checkout-review-card">
        <div class="checkout-review-header">
          <h4>Order Summary (${summary.totalItems} ${summary.totalItems === 1 ? 'item' : 'items'})</h4>
          <span class="review-total-badge">${summary.formattedTotal}</span>
        </div>
        <div class="checkout-review-items">
    `;

    items.forEach((item, index) => {
      const itemPriceStr = item.isPriceOnRequest
        ? 'Price on Request'
        : `Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}`;

      // Customization tags
      const customPills = [];
      if (item.customization) {
        Object.entries(item.customization).forEach(([k, v]) => {
          if (v) {
            const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            customPills.push(`<span><strong>${label}:</strong> ${v}</span>`);
          }
        });
      }

      html += `
        <div class="review-item-row">
          <div class="review-item-col-main">
            <div class="review-item-title">
              <span class="review-item-num">${index + 1}.</span> <strong>${item.name}</strong> × ${item.quantity}
            </div>
            ${customPills.length > 0 ? `<div class="review-item-custom-tags">${customPills.join(' • ')}</div>` : ''}
            ${item.specialNotes ? `<div class="review-item-notes">📝 <em>"${item.specialNotes}"</em></div>` : ''}
          </div>
          <div class="review-item-col-price">
            ${itemPriceStr}
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  formatWhatsAppMessage(formData) {
    const items = Cart.getItems();
    const summary = Cart.getSummary();

    let orderLines = [];

    items.forEach((item, index) => {
      let lines = [];
      lines.push(`${index + 1}. ${item.name}`);
      lines.push(`Quantity: ${item.quantity}`);

      if (item.customization) {
        if (item.customization.size) lines.push(`Size: ${item.customization.size}`);
        if (item.customization.flavor) lines.push(`Flavor: ${item.customization.flavor}`);
        if (item.customization.creamType) lines.push(`Cream: ${item.customization.creamType}`);
        if (item.customization.eggless) lines.push(`Eggless: ${item.customization.eggless}`);
        if (item.customization.messageOnCake) lines.push(`Cake Message: ${item.customization.messageOnCake}`);
        if (item.customization.weight) lines.push(`Weight: ${item.customization.weight}`);
        if (item.customization.sweetness) lines.push(`Sugar Level: ${item.customization.sweetness}`);
        if (item.customization.packaging) lines.push(`Packaging: ${item.customization.packaging}`);
        if (item.customization.servingTemp) lines.push(`Serving: ${item.customization.servingTemp}`);
        if (item.customization.spiceLevel) lines.push(`Preparation: ${item.customization.spiceLevel}`);
      }

      if (item.specialNotes) {
        lines.push(`Special Notes: ${item.specialNotes}`);
      }

      orderLines.push(lines.join('\n'));
    });

    const fullAddress = formData.orderType === 'Delivery'
      ? `${formData.address}${formData.area ? ', Area: ' + formData.area : ''}`
      : 'Self Pickup from Karma Wala Sweets & Bakers';

    const msg = [
      'NEW ORDER – KARMA WALA SWEETS AND BAKERS',
      '',
      `Customer Name: ${formData.customerName}`,
      `Contact: ${formData.contactNumber}`,
      `Order Type: ${formData.orderType}`,
      `Address: ${fullAddress}`,
      `Preferred Date: ${formData.preferredDate || 'Earliest Available'}`,
      `Preferred Time: ${formData.preferredTime || 'Standard Service Hours'}`,
      formData.paymentMethod ? `Payment Method: ${formData.paymentMethod}` : '',
      '',
      'ORDER DETAILS:',
      '',
      orderLines.join('\n\n'),
      '',
      `Total Items: ${summary.totalItems}`,
      `Estimated Total: ${summary.formattedTotal}`,
      '',
      formData.customerNotes ? `Additional Notes:\n${formData.customerNotes}\n` : '',
      'Please confirm availability and final pricing.'
    ].filter(line => line !== undefined && line !== null).join('\n');

    return msg;
  },

  processCheckout() {
    const customerName = (document.getElementById('checkoutName')?.value || '').trim();
    const contactNumber = (document.getElementById('checkoutPhone')?.value || '').trim();
    const orderType = document.getElementById('orderTypeDelivery')?.checked ? 'Delivery' : 'Pickup';
    const address = (document.getElementById('checkoutAddress')?.value || '').trim();
    const area = (document.getElementById('checkoutArea')?.value || '').trim();
    const preferredDate = document.getElementById('checkoutDate')?.value || '';
    const preferredTime = document.getElementById('checkoutTime')?.value || '';
    const paymentMethod = document.getElementById('checkoutPayment')?.value || 'Cash on Delivery / Pickup';
    const customerNotes = (document.getElementById('checkoutNotes')?.value || '').trim();

    // Validation
    if (!customerName) {
      alert('Please enter your full name.');
      document.getElementById('checkoutName')?.focus();
      return;
    }
    if (!contactNumber) {
      alert('Please enter your WhatsApp or contact phone number.');
      document.getElementById('checkoutPhone')?.focus();
      return;
    }
    if (orderType === 'Delivery' && !address) {
      alert('Please enter your delivery street address.');
      document.getElementById('checkoutAddress')?.focus();
      return;
    }

    const items = Cart.getItems();
    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const formData = {
      customerName,
      contactNumber,
      orderType,
      address,
      area,
      preferredDate,
      preferredTime,
      paymentMethod,
      customerNotes
    };

    const rawMessage = this.formatWhatsAppMessage(formData);
    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab / app
    window.open(whatsappUrl, '_blank');

    // Notify user and show confirmation inside modal
    this.showConfirmationPrompt();
  },

  showConfirmationPrompt() {
    const form = document.getElementById('checkoutForm');
    const confirmationDiv = document.getElementById('checkoutSuccessState');

    if (form && confirmationDiv) {
      form.classList.add('hidden');
      confirmationDiv.classList.remove('hidden');
    }
  },

  resetCheckoutState() {
    const form = document.getElementById('checkoutForm');
    const confirmationDiv = document.getElementById('checkoutSuccessState');

    if (form && confirmationDiv) {
      form.reset();
      form.classList.remove('hidden');
      confirmationDiv.classList.add('hidden');
      this.initDefaultDates();
    }
  }
};

if (typeof window !== 'undefined') {
  window.Checkout = Checkout;
}

