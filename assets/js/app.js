/**
 * KARMA WALA SWEETS AND BAKERS - MAIN APPLICATION CONTROLLER
 * 
 * Coordinates Hero Slider, Product Filtering & Search,
 * Customization Modals, Cart Drawer, Recently Viewed Items,
 * and Mobile Navigation.
 */

const App = {
  activeCategory: 'all',
  searchQuery: '',
  activeSort: 'popular',
  heroSliderTimer: null,
  heroCurrentSlide: 0,
  heroSlideCount: 0,
  activeProductForModal: null,

  init() {
    this.initHeroSlider();
    this.initCategoryFilters();
    this.initSearchAndSort();
    this.initCartDrawer();
    this.initWeekendAvailabilityNotice();
    this.initMobileNav();
    this.initStickyHeader();
    this.initRecentlyViewed();
    this.renderProducts();

    // Listen to cart changes
    Cart.onChange((items, summary) => {
      this.updateCartBadges(summary);
      this.renderCartDrawer(items, summary);
    });

    // Initial cart badge update
    this.updateCartBadges(Cart.getSummary());
  },

  // ==========================================
  // 1. HERO PRODUCT SLIDER
  // ==========================================
  initHeroSlider() {
    const sliderContainer = document.getElementById('heroSliderTrack');
    const dotsContainer = document.getElementById('heroSliderDots');
    const prevBtn = document.getElementById('heroSliderPrev');
    const nextBtn = document.getElementById('heroSliderNext');
    const heroBanner = document.querySelector('.hero-banner');

    if (!sliderContainer) return;

    // Featured hero items with real bakery photos
    const heroItems = [
      {
        title: "Freshly Baked. Beautifully Made.",
        subtitle: "Discover Delicious Cakes, Fresh Bakery Items & Traditional Pakistani Mithai.",
        tag: "Fresh From Oven Daily",
        image: "assets/images/products/Fresh Cream Cake.jpg",
        highlight: "Fresh Cream & Birthday Cakes",
        ctaText: "Order Cake on WhatsApp",
        categoryId: "cakes"
      },
      {
        title: "Authentic Desi Ghee Mithai",
        subtitle: "Pure Buffalo Milk, Fresh Khoya & Royal Traditional Recipes.",
        tag: "Royal Sweet Delights",
        image: "assets/images/products/Gulab Jamun.jpg",
        highlight: "Mouthwatering Gulab Jamun & Barfi",
        ctaText: "Explore Mithai Collection",
        categoryId: "mithai"
      },
      {
        title: "Crispy, Savory Bakery Treats",
        subtitle: "Golden Flaky Chicken Patties, Samosas, Spring Rolls & Artisan Breads.",
        tag: "Hot & Crisp Hourly",
        image: "assets/images/products/Chicken Patties.jpg",
        highlight: "Chicken Patties & Savory Snacks",
        ctaText: "View Bakery Snacks",
        categoryId: "bakery"
      },
      {
        title: "Weekend Lahori Halwa Puri Special",
        subtitle: "Puffed Crispy Puris, Spicy Chana Tarkari & Sweet Suji Halwa.",
        tag: "Saturday & Sunday Special",
        image: "assets/images/products/Halwa Puri.jpg",
        highlight: "Authentic Traditional Breakfast",
        ctaText: "Pre-order Halwa Puri",
        categoryId: "weekend"
      },
      {
        title: "Crispy Traditional Nan Khatai & Cookies",
        subtitle: "Handcrafted Lahore-style crumbly biscuits made with pure desi ghee.",
        tag: "Chai Time Perfection",
        image: "assets/images/products/Nan Khatai.jpg",
        highlight: "Nan Khatai & Almond Biscuits",
        ctaText: "Shop Biscuits & Cookies",
        categoryId: "biscuits"
      }
    ];

    this.heroSlideCount = heroItems.length;

    // Build slides HTML
    sliderContainer.innerHTML = heroItems.map((item, index) => `
      <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="hero-slide-bg" style="background-image: url('${item.image}')"></div>
        <div class="hero-slide-overlay"></div>
        <div class="container hero-slide-content">
          <div class="hero-badge-pill">
            <span class="badge-dot"></span>
            ${item.tag}
          </div>
          <h1 class="hero-heading">${item.title}</h1>
          <p class="hero-subheading">${item.subtitle}</p>
          <div class="hero-cta-group">
            <button class="btn btn-primary btn-lg" onclick="App.filterCategoryAndScroll('${item.categoryId}')">
              Explore Products
            </button>
            <a href="${BAKERY_CONFIG.whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.861.948 3.123.948 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.519-4.481 10-10 10-1.802 0-3.528-.485-5.045-1.341l-6.955 1.82 1.854-6.777c-.966-1.583-1.5-3.432-1.5-5.362 0-5.519 4.481-10 10-10s10 4.481 10 10z"/>
              </svg>
              Order on WhatsApp
            </a>
          </div>
          <div class="hero-slide-product-preview">
            <span class="preview-label">Featured Item:</span>
            <span class="preview-name">${item.highlight}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Build indicator dots
    if (dotsContainer) {
      dotsContainer.innerHTML = heroItems.map((_, i) => `
        <button class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
      `).join('');

      dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'));
          this.goToHeroSlide(idx);
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevHeroSlide());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextHeroSlide());
    }

    // Autoplay timer
    this.startHeroAutoplay();

    // Pause on hover
    if (heroBanner) {
      heroBanner.addEventListener('mouseenter', () => this.stopHeroAutoplay());
      heroBanner.addEventListener('mouseleave', () => this.startHeroAutoplay());
    }
  },

  startHeroAutoplay() {
    this.stopHeroAutoplay();
    this.heroSliderTimer = setInterval(() => {
      this.nextHeroSlide();
    }, 3500); // 3.5 seconds
  },

  stopHeroAutoplay() {
    if (this.heroSliderTimer) {
      clearInterval(this.heroSliderTimer);
      this.heroSliderTimer = null;
    }
  },

  goToHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    if (!slides.length) return;

    this.heroCurrentSlide = (index + this.heroSlideCount) % this.heroSlideCount;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.heroCurrentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.heroCurrentSlide);
    });
  },

  nextHeroSlide() {
    this.goToHeroSlide(this.heroCurrentSlide + 1);
  },

  prevHeroSlide() {
    this.goToHeroSlide(this.heroCurrentSlide - 1);
  },

  // ==========================================
  // 2. CATEGORY FILTERS & SCROLL
  // ==========================================
  initCategoryFilters() {
    const container = document.getElementById('categoryTabsContainer');
    if (!container) return;

    container.innerHTML = BAKERY_CATEGORIES.map(cat => {
      const count = cat.id === 'all'
        ? PRODUCTS.length
        : PRODUCTS.filter(p => p.categoryId === cat.id).length;

      return `
        <button class="category-pill ${cat.id === this.activeCategory ? 'active' : ''}" data-category="${cat.id}">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${cat.name}</span>
          <span class="cat-count">${count}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = e.currentTarget.getAttribute('data-category');
        this.setCategory(catId);
      });
    });
  },

  setCategory(categoryId) {
    this.activeCategory = categoryId;

    // Update active tab styles
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-category') === categoryId);
    });

    // Update navigation active state
    document.querySelectorAll('.nav-link[data-category]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-category') === categoryId);
    });

    this.renderProducts();
  },

  filterCategoryAndScroll(categoryId) {
    this.setCategory(categoryId);
    const catalogSection = document.getElementById('catalogSection');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  },

  // ==========================================
  // 3. ADVANCED SEARCH, TRENDING & SORTING
  // ==========================================
  initSearchAndSort() {
    const searchInput = document.getElementById('productSearchInput');
    const searchClear = document.getElementById('searchClearBtn');
    const sortSelect = document.getElementById('productSortSelect');
    const trendingPills = document.querySelectorAll('.trending-pill');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        if (searchClear) {
          searchClear.style.display = this.searchQuery ? 'flex' : 'none';
        }
        this.renderProducts();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        searchClear.style.display = 'none';
        this.renderProducts();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeSort = e.target.value;
        this.renderProducts();
      });
    }

    trendingPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const query = pill.getAttribute('data-query') || pill.textContent.trim();
        if (searchInput) {
          searchInput.value = query;
          this.searchQuery = query;
          if (searchClear) searchClear.style.display = 'flex';
          this.setCategory('all');
          const catalogSection = document.getElementById('catalogSection');
          if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },

  // ==========================================
  // 4. WEEKEND AVAILABILITY (HALWA PURI)
  // ==========================================
  initWeekendAvailabilityNotice() {
    const banner = document.getElementById('weekendSpecialBanner');
    const badge = document.getElementById('weekendStatusBadge');
    const desc = document.getElementById('weekendStatusDesc');
    const isWeekend = ProductCatalog.isWeekendInPKT();
    const pktDetails = ProductCatalog.getPKTTimeDetails();

    if (banner && badge && desc) {
      if (isWeekend) {
        badge.className = 'weekend-status-badge badge-active';
        badge.innerHTML = `<span class="pulse-dot active"></span> Available Now (Saturday & Sunday)`;
        desc.innerHTML = `<strong>Fresh Weekend Special!</strong> Halwa Puri Fresh is hot and ready to order right now (${pktDetails}).`;
      } else {
        badge.className = 'weekend-status-badge badge-upcoming';
        badge.innerHTML = `<span class="pulse-dot upcoming"></span> Pre-order for Weekend`;
        desc.innerHTML = `<strong>Available Saturday & Sunday Only.</strong> Current time in Pakistan: ${pktDetails}. You can pre-order anytime on WhatsApp!`;
      }
    }
  },

  // ==========================================
  // 5. PRODUCT CATALOG RENDERING
  // ==========================================
  renderProducts() {
    const grid = document.getElementById('productGrid');
    const emptyState = document.getElementById('productsEmptyState');
    const resultCount = document.getElementById('catalogResultCount');
    if (!grid) return;

    let items = ProductCatalog.searchProducts(this.searchQuery, this.activeCategory);

    // Sorting
    switch (this.activeSort) {
      case 'az':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceLow':
        items.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'priceHigh':
        items.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popular':
      default:
        // Featured and trending first
        items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    if (resultCount) {
      resultCount.textContent = `Showing ${items.length} ${items.length === 1 ? 'item' : 'items'}`;
    }

    if (items.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    const isWeekend = ProductCatalog.isWeekendInPKT();

    grid.innerHTML = items.map(product => {
      const priceDisplay = ProductCatalog.formatPrice(product.price, product.priceUnit, product.isPriceOnRequest);
      const isWeekendSpecial = product.categoryId === 'weekend';

      // Badge logic
      let badgeHtml = '';
      if (isWeekendSpecial) {
        badgeHtml = isWeekend
          ? `<span class="card-badge badge-weekend-live">Available Today</span>`
          : `<span class="card-badge badge-weekend-notice">Sat &amp; Sun Only</span>`;
      } else if (product.badge) {
        badgeHtml = `<span class="card-badge">${product.badge}</span>`;
      }

      return `
        <div class="product-card" data-id="${product.id}">
          <div class="product-image-wrap" onclick="App.openProductModal('${product.id}')">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              loading="lazy" 
              class="product-img"
              onerror="this.onerror=null; this.src='assets/images/products/placeholder.svg';"
            />
            ${badgeHtml}
            <div class="image-hover-overlay">
              <span class="btn btn-sm btn-light">View Details &amp; Customize</span>
            </div>
          </div>
          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name" onclick="App.openProductModal('${product.id}')">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            
            <div class="product-price-row">
              <span class="product-price ${product.isPriceOnRequest ? 'price-request' : ''}">
                ${priceDisplay}
              </span>
            </div>

            <div class="product-card-actions">
              <div class="quantity-input-group">
                <button type="button" class="qty-btn" onclick="App.adjustCardQty(this, -1)" aria-label="Decrease quantity">−</button>
                <input type="number" class="card-qty-input" value="1" min="1" max="99" />
                <button type="button" class="qty-btn" onclick="App.adjustCardQty(this, 1)" aria-label="Increase quantity">+</button>
              </div>
              <button 
                type="button" 
                class="btn btn-primary btn-add-cart" 
                onclick="App.quickAddToCart('${product.id}', this)"
                aria-label="Add ${product.name} to cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  adjustCardQty(btn, delta) {
    const wrap = btn.closest('.quantity-input-group');
    const input = wrap.querySelector('.card-qty-input');
    if (input) {
      let val = Math.max(1, (parseInt(input.value) || 1) + delta);
      input.value = val;
    }
  },

  quickAddToCart(productId, btnElement) {
    const card = btnElement.closest('.product-card');
    const input = card ? card.querySelector('.card-qty-input') : null;
    const quantity = input ? (parseInt(input.value) || 1) : 1;

    const product = ProductCatalog.getProductById(productId);
    if (!product) return;

    Cart.addItem(productId, quantity, {}, '');
    this.recordRecentlyViewed(productId);
    this.showToast(`Added ${quantity} × ${product.name} to your cart!`);

    // Button animation feedback
    if (btnElement) {
      btnElement.classList.add('added');
      const span = btnElement.querySelector('span');
      if (span) span.textContent = 'Added ✓';
      setTimeout(() => {
        btnElement.classList.remove('added');
        if (span) span.textContent = 'Add';
      }, 1400);
    }
  },

  // ==========================================
  // 6. PRODUCT CUSTOMIZATION MODAL
  // ==========================================
  openProductModal(productId) {
    const product = ProductCatalog.getProductById(productId);
    if (!product) return;

    this.activeProductForModal = product;
    this.recordRecentlyViewed(productId);

    const modal = document.getElementById('productCustomModal');
    if (!modal) return;

    // Populate static fields
    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductImg').onerror = function() {
      this.src = 'assets/images/products/placeholder.svg';
    };
    document.getElementById('modalProductCategory').textContent = product.category;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDesc').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = ProductCatalog.formatPrice(product.price, product.priceUnit, product.isPriceOnRequest);

    const qtyInput = document.getElementById('modalProductQty');
    if (qtyInput) qtyInput.value = '1';

    const notesInput = document.getElementById('modalProductNotes');
    if (notesInput) notesInput.value = '';

    // Render relevant customization fields
    this.renderCustomizationFields(product);

    modal.classList.add('active');
    document.body.classList.add('modal-open');
  },

  renderCustomizationFields(product) {
    const container = document.getElementById('modalCustomFieldsContainer');
    if (!container) return;

    let html = '';

    if (product.categoryId === 'cakes') {
      html += `
        <div class="custom-field-group">
          <label class="custom-label">Choose Cake Size / Weight:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="cakeSize" value="1 Pound" /> 1 Pound</label>
            <label><input type="radio" name="cakeSize" value="2 Pounds" checked /> 2 Pounds</label>
            <label><input type="radio" name="cakeSize" value="3 Pounds" /> 3 Pounds</label>
            <label><input type="radio" name="cakeSize" value="4 Pounds" /> 4 Pounds</label>
            <label><input type="radio" name="cakeSize" value="5 Pounds" /> 5 Pounds</label>
          </div>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Flavor Preference:</label>
          <select id="modalCakeFlavor" class="form-select">
            <option value="Classic Chocolate" selected>Classic Rich Chocolate</option>
            <option value="Dark Fudge">Dark Belgian Fudge</option>
            <option value="Black Forest">Black Forest with Cherries</option>
            <option value="Fresh Pineapple">Tropical Fresh Pineapple</option>
            <option value="Mocha Coffee">Roasted Coffee Mocha</option>
            <option value="Vanilla Strawberry">Vanilla Strawberry Swirl</option>
          </select>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Cream Selection:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="cakeCream" value="Fresh Dairy Cream" checked /> Fresh Dairy Cream</label>
            <label><input type="radio" name="cakeCream" value="Buttercream" /> Buttercream</label>
            <label><input type="radio" name="cakeCream" value="Chocolate Ganache" /> Chocolate Ganache</label>
          </div>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Eggless Option:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="cakeEggless" value="Standard" checked /> Standard (With Eggs)</label>
            <label><input type="radio" name="cakeEggless" value="100% Eggless" /> 100% Eggless</label>
          </div>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Message on Cake (e.g. Happy Birthday Fatima):</label>
          <input type="text" id="modalCakeMessage" class="form-input" placeholder="Type text to pipe on cake icing..." maxlength="60" />
        </div>
      `;
    } else if (product.categoryId === 'mithai') {
      html += `
        <div class="custom-field-group">
          <label class="custom-label">Select Weight / Box Size:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="mithaiWeight" value="0.5 kg (Half Kg)" /> 0.5 kg</label>
            <label><input type="radio" name="mithaiWeight" value="1.0 kg" checked /> 1.0 kg</label>
            <label><input type="radio" name="mithaiWeight" value="2.0 kg" /> 2.0 kg</label>
            <label><input type="radio" name="mithaiWeight" value="Assorted Gift Box" /> Assorted Box</label>
          </div>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Sugar / Sweetness Level:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="mithaiSugar" value="Standard Sugar" checked /> Standard Sugar</label>
            <label><input type="radio" name="mithaiSugar" value="Less Sugar" /> Less Sugar (Diet Friendly)</label>
          </div>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Packaging Box Preference:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="mithaiPackaging" value="Standard Bakery Box" checked /> Standard Box</label>
            <label><input type="radio" name="mithaiPackaging" value="Royal Gift Box (+ Ribbon)" /> Royal Gift Box</label>
          </div>
        </div>
      `;
    } else if (product.categoryId === 'bakery' || product.categoryId === 'other') {
      html += `
        <div class="custom-field-group">
          <label class="custom-label">Preparation &amp; Serving:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="bakeryPrep" value="Fresh Baked & Hot" checked /> Fresh Baked &amp; Hot</label>
            <label><input type="radio" name="bakeryPrep" value="Normal Room Temp" /> Room Temperature</label>
            <label><input type="radio" name="bakeryPrep" value="Extra Crispy" /> Extra Crispy</label>
          </div>
        </div>

        <div class="custom-field-group">
          <label class="custom-label">Flavor / Spice Preference:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="bakerySpice" value="Mild" /> Mild</label>
            <label><input type="radio" name="bakerySpice" value="Regular Pakistani Spiced" checked /> Regular Spiced</label>
            <label><input type="radio" name="bakerySpice" value="Extra Spicy" /> Extra Spicy</label>
          </div>
        </div>
      `;
    } else if (product.categoryId === 'weekend') {
      const isWeekend = ProductCatalog.isWeekendInPKT();
      html += `
        <div class="weekend-modal-banner ${isWeekend ? 'live' : 'notice'}">
          ${isWeekend ? '✨ Available Today! Hot & Fresh' : '📅 Pre-Order Notice: Prepared fresh on Saturday & Sunday mornings'}
        </div>
        <div class="custom-field-group">
          <label class="custom-label">Serving Size:</label>
          <div class="custom-pill-radios">
            <label><input type="radio" name="weekendPortion" value="Standard Thali (2 Puris + Halwa + Chana)" checked /> Standard Thali</label>
            <label><input type="radio" name="weekendPortion" value="Double Thali (4 Puris + Extra Chana & Halwa)" /> Double Thali</label>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  closeProductModal() {
    const modal = document.getElementById('productCustomModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
      this.activeProductForModal = null;
    }
  },

  adjustModalQty(delta) {
    const input = document.getElementById('modalProductQty');
    if (input) {
      let val = Math.max(1, (parseInt(input.value) || 1) + delta);
      input.value = val;
    }
  },

  addConfiguredProductToCart() {
    if (!this.activeProductForModal) return;

    const product = this.activeProductForModal;
    const qtyInput = document.getElementById('modalProductQty');
    const quantity = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
    const notesInput = document.getElementById('modalProductNotes');
    const specialNotes = notesInput ? notesInput.value.trim() : '';

    const customization = {};

    // Collect options depending on product type
    if (product.categoryId === 'cakes') {
      const sizeRadio = document.querySelector('input[name="cakeSize"]:checked');
      if (sizeRadio) customization.size = sizeRadio.value;

      const flavorSelect = document.getElementById('modalCakeFlavor');
      if (flavorSelect) customization.flavor = flavorSelect.value;

      const creamRadio = document.querySelector('input[name="cakeCream"]:checked');
      if (creamRadio) customization.creamType = creamRadio.value;

      const egglessRadio = document.querySelector('input[name="cakeEggless"]:checked');
      if (egglessRadio) customization.eggless = egglessRadio.value;

      const messageInput = document.getElementById('modalCakeMessage');
      if (messageInput && messageInput.value.trim()) {
        customization.messageOnCake = messageInput.value.trim();
      }
    } else if (product.categoryId === 'mithai') {
      const weightRadio = document.querySelector('input[name="mithaiWeight"]:checked');
      if (weightRadio) customization.weight = weightRadio.value;

      const sugarRadio = document.querySelector('input[name="mithaiSugar"]:checked');
      if (sugarRadio) customization.sweetness = sugarRadio.value;

      const packRadio = document.querySelector('input[name="mithaiPackaging"]:checked');
      if (packRadio) customization.packaging = packRadio.value;
    } else if (product.categoryId === 'bakery' || product.categoryId === 'other') {
      const prepRadio = document.querySelector('input[name="bakeryPrep"]:checked');
      if (prepRadio) customization.preparation = prepRadio.value;

      const spiceRadio = document.querySelector('input[name="bakerySpice"]:checked');
      if (spiceRadio) customization.spiceLevel = spiceRadio.value;
    } else if (product.categoryId === 'weekend') {
      const portionRadio = document.querySelector('input[name="weekendPortion"]:checked');
      if (portionRadio) customization.portion = portionRadio.value;
    }

    Cart.addItem(product.id, quantity, customization, specialNotes);
    this.closeProductModal();
    this.showToast(`Added ${quantity} × ${product.name} to cart!`);
  },

  // ==========================================
  // 7. SHOPPING CART DRAWER
  // ==========================================
  initCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    const triggers = document.querySelectorAll('.cart-drawer-trigger');
    const closeBtn = document.getElementById('cartDrawerClose');

    triggers.forEach(btn => {
      btn.addEventListener('click', () => this.openCartDrawer());
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeCartDrawer());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCartDrawer());
    }
  },

  openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('drawer-open');
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  },

  renderCartDrawer(items, summary) {
    const itemsContainer = document.getElementById('cartItemsContainer');
    const emptyState = document.getElementById('cartEmptyState');
    const footerContainer = document.getElementById('cartFooterSection');
    const drawerSubtotal = document.getElementById('cartDrawerSubtotal');
    const drawerCount = document.getElementById('cartDrawerCount');

    if (drawerCount) {
      drawerCount.textContent = `(${summary.totalItems})`;
    }

    if (items.length === 0) {
      if (itemsContainer) itemsContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (footerContainer) footerContainer.classList.add('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (footerContainer) footerContainer.classList.remove('hidden');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = summary.formattedTotal;
    }

    if (itemsContainer) {
      itemsContainer.innerHTML = items.map(item => {
        const itemTotalStr = item.isPriceOnRequest
          ? 'Price on Request'
          : `Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}`;

        // Customization pills
        const tags = [];
        if (item.customization) {
          Object.entries(item.customization).forEach(([k, v]) => {
            if (v) tags.push(`<span>${v}</span>`);
          });
        }

        return `
          <div class="cart-item-card" data-key="${item.cartItemId}">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="cart-item-img"
              onerror="this.src='assets/images/products/placeholder.svg';"
            />
            <div class="cart-item-details">
              <div class="cart-item-header">
                <h4 class="cart-item-name">${item.name}</h4>
                <button type="button" class="cart-item-remove-btn" onclick="Cart.removeItem('${item.cartItemId}')" title="Remove item">
                  ✕
                </button>
              </div>

              ${tags.length > 0 ? `<div class="cart-item-custom-tags">${tags.join('')}</div>` : ''}

              ${item.specialNotes ? `<div class="cart-item-note"><em>"${item.specialNotes}"</em></div>` : ''}

              <div class="cart-item-bottom">
                <div class="quantity-input-group quantity-sm">
                  <button type="button" class="qty-btn" onclick="Cart.updateQuantity('${item.cartItemId}', ${item.quantity - 1})">−</button>
                  <span class="qty-number">${item.quantity}</span>
                  <button type="button" class="qty-btn" onclick="Cart.updateQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
                </div>
                <span class="cart-item-price">${itemTotalStr}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  },

  updateCartBadges(summary) {
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(badge => {
      badge.textContent = summary.totalItems;
      badge.classList.toggle('visible', summary.totalItems > 0);
      // Small pulse animation
      badge.classList.remove('bounce');
      void badge.offsetWidth;
      badge.classList.add('bounce');
    });

    const stickyTotal = document.getElementById('mobileStickyCartTotal');
    if (stickyTotal) {
      stickyTotal.textContent = summary.formattedTotal;
    }
  },

  // ==========================================
  // 8. RECENTLY VIEWED PRODUCTS
  // ==========================================
  initRecentlyViewed() {
    this.renderRecentlyViewed();
  },

  recordRecentlyViewed(productId) {
    try {
      let ids = JSON.parse(localStorage.getItem('kw_recently_viewed') || '[]');
      ids = ids.filter(id => id !== productId);
      ids.unshift(productId);
      if (ids.length > 6) ids = ids.slice(0, 6);
      localStorage.setItem('kw_recently_viewed', JSON.stringify(ids));
      this.renderRecentlyViewed();
    } catch (e) {}
  },

  renderRecentlyViewed() {
    const section = document.getElementById('recentlyViewedSection');
    const container = document.getElementById('recentlyViewedGrid');
    if (!section || !container) return;

    try {
      const ids = JSON.parse(localStorage.getItem('kw_recently_viewed') || '[]');
      if (ids.length === 0) {
        section.classList.add('hidden');
        return;
      }

      const products = ids.map(id => ProductCatalog.getProductById(id)).filter(Boolean);
      if (products.length === 0) {
        section.classList.add('hidden');
        return;
      }

      section.classList.remove('hidden');
      container.innerHTML = products.map(product => `
        <div class="recent-card" onclick="App.openProductModal('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="recent-img" onerror="this.src='assets/images/products/placeholder.svg';" />
          <div class="recent-info">
            <h5 class="recent-name">${product.name}</h5>
            <span class="recent-price">${ProductCatalog.formatPrice(product.price, product.priceUnit, product.isPriceOnRequest)}</span>
          </div>
        </div>
      `).join('');
    } catch (e) {
      section.classList.add('hidden');
    }
  },

  // ==========================================
  // 9. MOBILE NAVIGATION & STICKY HEADER
  // ==========================================
  initMobileNav() {
    const menuBtn = document.getElementById('mobileMenuToggle');
    const navDrawer = document.getElementById('mobileNavDrawer');
    const closeBtn = document.getElementById('mobileNavClose');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && navDrawer) {
      menuBtn.addEventListener('click', () => {
        navDrawer.classList.add('active');
        document.body.classList.add('modal-open');
      });
    }

    const closeNav = () => {
      if (navDrawer) {
        navDrawer.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    navLinks.forEach(link => link.addEventListener('click', closeNav));
  },

  initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  // ==========================================
  // 10. TOAST NOTIFICATIONS
  // ==========================================
  showToast(message) {
    const toast = document.getElementById('appToast');
    const toastMsg = document.getElementById('appToastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }
};

// Auto-boot when DOM is ready
function bootKarmaWala() {
  if (typeof Cart !== 'undefined' && Cart.init) Cart.init();
  if (typeof Checkout !== 'undefined' && Checkout.init) Checkout.init();
  if (typeof App !== 'undefined' && App.init) App.init();
  if (typeof VisitorCounter !== 'undefined' && VisitorCounter.init) VisitorCounter.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootKarmaWala);
} else {
  bootKarmaWala();
}

if (typeof window !== 'undefined') {
  window.App = App;
}

