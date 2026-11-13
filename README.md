# 🎂 Karma Wala Sweets And Bakers

> **Freshness, Quality & Taste in Every Bite.**  
> Complete Responsive Pakistani Bakery E-Commerce Website with WhatsApp Click-to-Chat Checkout & Live Visitor Telemetry.

---

## 🌟 Project Overview

**Karma Wala Sweets And Bakers** is a modern, high-performance, mobile-first e-commerce bakery website built specifically for deployment on **GitHub Pages**.

- **Business Name:** Karma Wala Sweets And Bakers
- **WhatsApp Ordering Number:** `+923327512031`
- **WhatsApp URL:** [https://wa.me/923327512031](https://wa.me/923327512031)
- **Timezone:** Pakistan Standard Time (`Asia/Karachi`, UTC+5)
- **Deployment Platform:** GitHub Pages (Zero-backend static site)

---

## ✨ Features Breakdown

1. **Brand Aesthetic & Design System**
   - Premium Pakistani bakery visual identity with royal maroon red (`#8B151B`), golden yellow (`#D4AF37`), warm ivory cream (`#FDFBF7`), and pure white.
   - Elegant typography with *Playfair Display* for headings and *Outfit* for modern readability.
   - Glassmorphism sticky header with mobile responsive drawer navigation.

2. **Main Hero Banner with Automatic Product Slider**
   - Smooth transitions automatically rotating actual bakery products every 3.5 seconds.
   - Interactive slide indicators (dots), previous/next controls, and pause on hover.
   - Call-to-action buttons for product exploration and direct WhatsApp ordering.

3. **Complete 7 Product Categories & 68+ Products**
   - **Category 1: Fast-Selling Bakery Items** (Chicken Patties, Vegetable Patties, Chicken Samosa, Chicken Spring Rolls, Chicken Bread, Pizza Slices, Chicken Sandwich, Club Sandwich, Garlic Bread, Sausage Rolls)
   - **Category 2: Cakes & Pastries** (Chocolate Cake, Black Forest Cake, Pineapple Cake, Fresh Cream Cake, Fudge Cake, Pastries, Cupcakes, Brownies, Donuts, Swiss Roll)
   - **Category 3: Traditional Pakistani Sweets (Mithai)** (Gulab Jamun, Kala Jamun, Motichoor Laddu, Besan Laddu, Plain Barfi, Milk Barfi, Pista Barfi, Cham Cham, Rasgulla, Kalakand, Jalebi, Balushahi, Patisa, Gajar Halwa, Soan Papdi, Emarti)
   - **Category 4: Biscuits & Cookies** (Nan Khatai, Zeera Biscuits, Plain Biscuits, Chocolate Cookies, Coconut Biscuits, Almond Biscuits, Butter Cookies, Peanut Cookies, Salt Biscuits, Bakery Rusk)
   - **Category 5: Bread & Breakfast Items** (Plain Bread, Milk Bread, Bran Bread, Sandwich Bread, Burger Buns, Hot Dog Buns, Pav Buns, Garlic Bread, Rusk, Toast)
   - **Category 6: Other Popular Bakery Products** (Chicken Quiche, Pizza, Cream Rolls, Chocolate Eclairs, Apple Pie, Muffins, Waffles, Cinnamon Rolls, Croissants, Fruit Trifle)
   - **Category 7: Weekend Breakfast** (Halwa Puri Fresh with dynamic Pakistan Standard Time weekend availability detection)

4. **Dynamic Weekend Halwa Puri Availability System**
   - Automatically computes current weekday in `Asia/Karachi` (UTC+5).
   - On Saturdays and Sundays: displays **"Available Today! Fresh Weekend Special"**.
   - On weekdays: displays **"Available Saturday & Sunday Only (Pre-order Open)"**.

5. **Advanced Product Search & Filtering**
   - Instant search-as-you-type with real-time feedback.
   - Trending search pills (Birthday Cake, Chocolate Cake, Chicken Patties, Chicken Samosa, Fresh Cream Cake, Gulab Jamun, Pizza, Halwa Puri).
   - Category filtering pills with live product counts.
   - Multi-option sorting (Popular, A-Z, Z-A, Price Low-to-High, Price High-to-Low).

6. **Product Customization & Special Notes Modal**
   - **Cakes:** Size selection (1 to 5 lbs), flavor variations, cream types, eggless toggle, message on cake text input.
   - **Mithai:** Weight/box size (0.5 kg, 1 kg, 2 kg, Assorted), sweetness level (regular/less sugar), gift packaging options.
   - **Bakery Savories:** Serving temperature, spice levels, crispy preparation.
   - **Weekend Halwa Puri:** Single thali or double thali portion.
   - Customer custom notes saved per cart item.

7. **Full-Featured Shopping Cart**
   - Slide-out drawer with responsive cart badges.
   - Quantity modifiers, item notes display, subtotal, and configurable pricing calculation.
   - Safe `localStorage` persistence across browser refreshes.

8. **Direct WhatsApp Order & Checkout System**
   - Form fields: Name, phone, order type (delivery or pickup), address, area, preferred date & time, payment preference, and special instructions.
   - Pre-checkout live order review.
   - Automatically constructs a clean, formatted WhatsApp message addressed to `+923327512031` with full order breakdown.

9. **Live Visitor Statistics Dashboard**
   - 4 live counters in footer:
     1. **Total Visitors** (All-time unique browsers)
     2. **Today's Visitors** (Resets at 00:00:00 Pakistan Standard Time)
     3. **Online Visitors** (Active presence in last 5 minutes)
     4. **Total Page Views** (Catalog interactions)
   - Anonymous browser UUID deduplication in `localStorage`.
   - Live PKT clock (`Asia/Karachi`).
   - Supports **Mode A (CountAPI Zero-setup default)** with honest offline fallback, and **Mode B (Optional Firebase Realtime Database)**.

---

## 📁 Repository Structure

```text
karma-wala-sweets-and-bakers/
│
├── index.html                     # Primary storefront
├── 404.html                       # Branded 404 fallback page
├── visitor-counter-config.js      # Visitor counter configuration (CountAPI / Firebase)
├── .nojekyll                      # Prevents GitHub Pages Jekyll build issues
├── README.md                      # Documentation & deployment guide
│
└── assets/
    ├── css/
    │   └── style.css              # Master responsive styles
    ├── js/
    │   ├── app.js                 # UI controller, hero slider, modals, filtering
    │   ├── products.js            # Centralized product catalog data
    │   ├── cart.js                # Shopping cart manager & localStorage engine
    │   ├── checkout.js            # WhatsApp checkout & message generator
    │   └── visitor-counter.js     # PKT timezone & visitor analytics tracker
    └── images/
        ├── logo/
        │   ├── logo.png           # Master brand logo (transparent PNG)
        │   └── favicon.svg        # Branded vector tab favicon
        └── products/
            ├── placeholder.svg    # Clean branded SVG fallback
            └── *.jpg / *.webp     # 66+ actual bakery product images
```

---

## 🚀 GitHub Pages Deployment Guide

Deploying this website to GitHub Pages takes less than 3 minutes:

### Step 1: Create a New GitHub Repository
1. Log in to your [GitHub Account](https://github.com/).
2. Click **New Repository** (or visit [https://github.com/new](https://github.com/new)).
3. Repository name: `karma-wala-sweets-and-bakers` (or any name you prefer).
4. Set visibility to **Public**.
5. Leave "Initialize with README" **unchecked** (we already have a complete project).
6. Click **Create repository**.

### Step 2: Initialize Git & Push Local Files
Open PowerShell or your terminal inside the project directory:

```powershell
cd "c:\Users\Window 11 26H2\Desktop\Karma wala Sweet and Bakers"

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Karma Wala Sweets And Bakers complete e-commerce website"

# Rename branch to main
git branch -M main

# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/karma-wala-sweets-and-bakers.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top right).
3. On the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes for GitHub Actions to build and deploy.
7. Your website will be live at:
   `https://YOUR_USERNAME.github.io/karma-wala-sweets-and-bakers/`

### Step 4: Custom Domain Configuration (Optional)
If you have a custom domain (e.g. `www.karmawalasweets.com`):
1. In repository **Settings > Pages**, enter your domain under **Custom domain** and save.
2. In your DNS provider (Cloudflare, GoDaddy, Namecheap), add:
   - CNAME record: `www` pointing to `YOUR_USERNAME.github.io`.
   - A records pointing to GitHub Pages IP addresses:
     ```text
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. Check the **Enforce HTTPS** box once DNS propagates.

---

## 🛠️ Admin Guide: Editing Products & Prices

All bakery items and prices are managed in one clean, centralized file:
**`assets/js/products.js`**

### To Edit a Product's Price:
Locate the product in `PRODUCTS` array and update the `price` field:
```javascript
{
  id: "bakery-chicken-patties",
  name: "Chicken Patties",
  price: 110, // Change price in PKR
  priceUnit: "pc",
  isPriceOnRequest: false,
}
```

### To Set "Price on Request":
Set `price: null` or `isPriceOnRequest: true`:
```javascript
{
  id: "cake-wedding-tier",
  name: "3-Tier Wedding Cake",
  price: null,
  isPriceOnRequest: true, // Will display "Price on Request" automatically
}
```

### To Add a New Product:
Simply append an object to `PRODUCTS` in `assets/js/products.js`:
```javascript
{
  id: "bakery-cheese-roll",
  name: "Cheese Roll",
  category: "Fast-Selling Bakery",
  categoryId: "bakery",
  image: "assets/images/products/Cheese Roll.jpg", // Place image in assets/images/products/
  description: "Freshly baked roll filled with cheddar and mozzarella cheese.",
  price: 150,
  priceUnit: "pc",
  isPriceOnRequest: false,
  available: true,
  featured: false,
  trending: false,
  badge: "Cheese Special",
  customizationType: "bakery"
}
```

---

## 📊 Visitor Analytics Configuration

The visitor telemetry is configured in **`visitor-counter-config.js`**.

### Mode A: Zero-Setup Default Mode (CountAPI)
- Enabled by default (`activeMode: 'default'`).
- No API keys or server configuration required.
- Uses `crypto.randomUUID()` stored in `localStorage` for anonymous browser deduplication so page reloads don't artificially inflate unique visitor counts.
- Resets Today's Visitors at 00:00:00 Pakistan Standard Time (`Asia/Karachi`).
- Includes graceful fallback handling if CountAPI is temporarily slow or unreachable.

### Mode B: Optional Firebase Realtime Database
To enable Firebase Realtime Database for cross-device telemetry:
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Create a **Realtime Database**.
3. Open `visitor-counter-config.js` and set `firebase.enabled: true`:
   ```javascript
   firebase: {
     enabled: true,
     apiKey: "AIzaSy...",
     authDomain: "karma-wala-bakery.firebaseapp.com",
     databaseURL: "https://karma-wala-bakery-default-rtdb.firebaseio.com",
     projectId: "karma-wala-bakery",
     appId: "1:...:web:..."
   }
   ```
4. Include Firebase SDK scripts in `index.html` head:
   ```html
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
   ```
5. Apply these **Firebase Realtime Database Security Rules**:
   ```json
   {
     "rules": {
       "stats": {
         "presence": {
           "$uuid": {
             ".read": true,
             ".write": true,
             ".validate": "newData.hasChildren(['active', 'lastSeen'])"
           }
         },
         "unique_visitors": {
           "$uuid": {
             ".read": true,
             ".write": true
           }
         },
         "daily": {
           "$date": {
             "visitors": {
               "$uuid": {
                 ".read": true,
                 ".write": true
               }
             }
           }
         },
         "page_views": {
           ".read": true,
           ".write": true
         }
       }
     }
   }
   ```

---

## 🧪 Local Testing & Verification

To run and preview the website locally on Windows:

```powershell
# Method 1: Using Python built-in HTTP server
python -m http.server 8080

# Method 2: Using Node.js npx serve
npx serve .

# Method 3: Directly double-click index.html in any browser!
```

---

## 📄 License & Rights

Copyright &copy; 2026 **Karma Wala Sweets And Bakers**. All Rights Reserved.  
Developed by [https://murtuzadeveloper.github.io/](https://murtuzadeveloper.github.io/)  
Prepared for GitHub Pages static hosting.

