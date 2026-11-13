/**
 * KARMA WALA SWEETS AND BAKERS - SHOPPING CART SYSTEM
 * 
 * Manages cart state in localStorage, calculates totals,
 * and emits events for UI reactivity.
 */

const Cart = {
  storageKey: 'kw_bakery_cart_v1',
  listeners: [],

  init() {
    this.items = this.loadCart();
    this.notify();
  },

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Could not load cart from localStorage', e);
      return [];
    }
  },

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.error('Could not save cart to localStorage', e);
    }
    this.notify();
  },

  onChange(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  },

  notify() {
    const summary = this.getSummary();
    this.listeners.forEach(cb => {
      try {
        cb(this.items, summary);
      } catch (err) {
        console.error('Cart listener error:', err);
      }
    });
  },

  /**
   * Generates a unique key for cart items considering their customization options
   */
  generateCartItemId(productId, customization = {}) {
    const customString = Object.entries(customization)
      .filter(([k, v]) => v !== undefined && v !== null && v !== '')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    return `${productId}__${customString}`;
  },

  /**
   * Adds an item to cart or increments quantity if an identical item exists
   */
  addItem(productId, quantity = 1, customization = {}, specialNotes = '') {
    const product = ProductCatalog.getProductById(productId);
    if (!product) return false;

    const cartItemId = this.generateCartItemId(productId, customization);
    const existingIndex = this.items.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += Number(quantity);
      if (specialNotes && specialNotes.trim()) {
        this.items[existingIndex].specialNotes = specialNotes.trim();
      }
    } else {
      this.items.push({
        cartItemId,
        productId,
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        priceUnit: product.priceUnit,
        isPriceOnRequest: Boolean(product.isPriceOnRequest || product.price === null || product.price <= 0),
        quantity: Math.max(1, Number(quantity)),
        customization: { ...customization },
        specialNotes: (specialNotes || '').trim(),
        addedAt: Date.now()
      });
    }

    this.saveCart();
    return true;
  },

  /**
   * Update quantity of an item in cart
   */
  updateQuantity(cartItemId, newQuantity) {
    const qty = Number(newQuantity);
    const index = this.items.findIndex(i => i.cartItemId === cartItemId);
    if (index === -1) return;

    if (qty <= 0) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity = qty;
    }
    this.saveCart();
  },

  /**
   * Update special notes of an item
   */
  updateNotes(cartItemId, notes) {
    const index = this.items.findIndex(i => i.cartItemId === cartItemId);
    if (index > -1) {
      this.items[index].specialNotes = (notes || '').trim();
      this.saveCart();
    }
  },

  /**
   * Remove item from cart
   */
  removeItem(cartItemId) {
    this.items = this.items.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();
  },

  /**
   * Clear all items in cart
   */
  clearCart() {
    this.items = [];
    this.saveCart();
  },

  getItems() {
    return this.items;
  },

  getSummary() {
    let totalItems = 0;
    let totalPrice = 0;
    let hasPriceOnRequest = false;

    let showPrices = typeof BAKERY_CONFIG !== 'undefined' ? Boolean(BAKERY_CONFIG.showPrices) : false;

    this.items.forEach(item => {
      totalItems += item.quantity;
      if (!showPrices || item.isPriceOnRequest || item.price === null || item.price === undefined || item.price <= 0) {
        hasPriceOnRequest = true;
      } else {
        totalPrice += item.price * item.quantity;
      }
    });

    let formattedTotal = '';
    if (!showPrices || (hasPriceOnRequest && totalPrice === 0)) {
      formattedTotal = 'Price on Request';
    } else if (this.items.length === 0) {
      formattedTotal = 'Rs. 0';
    } else if (totalPrice > 0 && hasPriceOnRequest) {
      formattedTotal = `Rs. ${totalPrice.toLocaleString('en-PK')} + Price on Request items`;
    } else {
      formattedTotal = `Rs. ${totalPrice.toLocaleString('en-PK')}`;
    }

    return {
      totalItems,
      totalPrice,
      hasPriceOnRequest,
      formattedTotal,
      currency: BAKERY_CONFIG.currency
    };
  }
};

// Auto-initialize
if (typeof window !== 'undefined') {
  window.Cart = Cart;
}

