/**
 * KARMA WALA SWEETS AND BAKERS - CENTRALIZED PRODUCT CATALOG
 * 
 * Production-ready product data architecture.
 * Easy to add, edit, or toggle items and pricing.
 */

const BAKERY_CONFIG = {
  businessName: "Karma Wala Sweets And Bakers",
  tagline: "Freshness, Quality & Taste in Every Bite",
  whatsappNumber: "+923327512031",
  whatsappUrl: "https://wa.me/923327512031",
  currency: "Rs.",
  timezone: "Asia/Karachi",
  address: "Main Commercial Market, Pakistan",
  phone: "+92 332 7512031",
  hours: "Monday – Sunday: 7:00 AM – 11:30 PM (PKT)",
  weekendSpecialNotice: "Halwa Puri Fresh is available Saturday & Sunday mornings only.",
  showPrices: false
};

const BAKERY_CATEGORIES = [
  { id: "all", name: "All Products", icon: "✨" },
  { id: "bakery", name: "Fast-Selling Bakery", icon: "🥐" },
  { id: "cakes", name: "Cakes & Pastries", icon: "🎂" },
  { id: "mithai", name: "Traditional Mithai", icon: "🍯" },
  { id: "biscuits", name: "Biscuits & Cookies", icon: "🍪" },
  { id: "bread", name: "Bread & Breakfast", icon: "🍞" },
  { id: "other", name: "Other Popular Items", icon: "🧁" },
  { id: "weekend", name: "Weekend Breakfast", icon: "🍳" }
];

const PRODUCTS = [
  // ==========================================
  // CATEGORY 1: FAST-SELLING BAKERY ITEMS
  // ==========================================
  {
    id: "bakery-chicken-patties",
    name: "Chicken Patties",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Chicken Patties.jpg",
    description: "Flaky, golden-crisp puff pastry filled with seasoned minced chicken, herbs, and bakery secret spices. Baked fresh hourly.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Bestseller",
    customizationType: "bakery"
  },
  {
    id: "bakery-vegetable-patties",
    name: "Vegetable Patties",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Vegetable Patties.jpg",
    description: "Multi-layered puff pastry generously stuffed with spiced potatoes, sweet peas, sweet corn, and aromatic herbs.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Vegetarian",
    customizationType: "bakery"
  },
  {
    id: "bakery-chicken-samosa",
    name: "Chicken Samosa",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Chicken Samosa.jpg",
    description: "Crispy triangular pastry stuffed with savory shredded chicken, green chillies, and freshly roasted cumin.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Hot & Crisp",
    customizationType: "bakery"
  },
  {
    id: "bakery-chicken-spring-rolls",
    name: "Chicken Spring Rolls",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Chicken Spring Rolls.jpeg",
    description: "Crunchy golden wrappers loaded with stir-fried chicken, julienned cabbage, carrots, and sweet-tangy pepper seasoning.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Crispy",
    customizationType: "bakery"
  },
  {
    id: "bakery-chicken-bread",
    name: "Chicken Bread",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Chicken Bread.jpg",
    description: "Soft, golden baked braided loaf infused with creamy chicken filling, topped with sesame seeds and oregano glaze.",
    price: null,
    priceUnit: "loaf",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Signature",
    customizationType: "bakery"
  },
  {
    id: "bakery-pizza-slices",
    name: "Pizza Slices",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Pizza Slices.jpg",
    description: "Cheesy, saucy bakery pizza slice loaded with spicy chicken chunks, bell peppers, olives, and mozzarella.",
    price: null,
    priceUnit: "slice",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Cheese Loaded",
    customizationType: "bakery"
  },
  {
    id: "bakery-chicken-sandwich",
    name: "Chicken Sandwich",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Chicken Sandwich.jpg",
    description: "Tender shredded chicken blended with fresh house mayonnaise, black pepper, and crisp cucumber slices on milk bread.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Fresh Daily",
    customizationType: "bakery"
  },
  {
    id: "bakery-club-sandwich",
    name: "Club Sandwich",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Club Sandwich.jpg",
    description: "Triple-layered classic sandwich filled with chicken spread, fried egg, cheese slice, lettuce, and homemade sauce.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Hearty",
    customizationType: "bakery"
  },
  {
    id: "bakery-garlic-bread",
    name: "Garlic Bread",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/Garlic Bread.jpg",
    description: "Toasted artisan baguette slices brushed with fragrant garlic butter, fresh parsley, and parmesan herbs.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Herbed",
    customizationType: "bakery"
  },
  {
    id: "bakery-sausage-rolls",
    name: "Sausage Rolls",
    category: "Fast-Selling Bakery",
    categoryId: "bakery",
    image: "assets/images/products/placeholder.svg",
    description: "Savory spiced chicken sausage wrapped in golden-brown flaky puff pastry with a sesame seed crunch.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Snack Favorite",
    customizationType: "bakery"
  },

  // ==========================================
  // CATEGORY 2: CAKES AND PASTRIES
  // ==========================================
  {
    id: "cake-chocolate",
    name: "Chocolate Cake",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Chocolate Cake.jpg",
    description: "Rich, moist layers of chocolate sponge smothered in silky chocolate ganache and chocolate curls.",
    price: null,
    priceUnit: "2 lbs",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Top Seller",
    customizationType: "cake"
  },
  {
    id: "cake-black-forest",
    name: "Black Forest Cake",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Black Forest Cake.jpg",
    description: "Classic German chocolate sponge infused with sweet cherries, fresh dairy cream, and dark chocolate shavings.",
    price: null,
    priceUnit: "2 lbs",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Classic",
    customizationType: "cake"
  },
  {
    id: "cake-pineapple",
    name: "Pineapple Cake",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Pineapple Cake.jpg",
    description: "Light vanilla sponge layered with juicy pineapple compote and airy whipped dairy cream.",
    price: null,
    priceUnit: "2 lbs",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Refreshing",
    customizationType: "cake"
  },
  {
    id: "cake-fresh-cream",
    name: "Fresh Cream Cake",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Fresh Cream Cake.jpg",
    description: "Velvety fresh cream cake adorned with fruit toppings, white chocolate curls, and delicate piping.",
    price: null,
    priceUnit: "2 lbs",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Chef's Special",
    customizationType: "cake"
  },
  {
    id: "cake-fudge",
    name: "Fudge Cake",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Fudge Cake.jpg",
    description: "Dense, decadent fudge cake drenched in molten dark chocolate fudge for the ultimate chocolate connoisseur.",
    price: null,
    priceUnit: "2 lbs",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Decadent",
    customizationType: "cake"
  },
  {
    id: "cake-chocolate-pastry",
    name: "Chocolate Pastry",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Chocolate Pastry.jpg",
    description: "Single-serving rich chocolate pastry slice coated in mirror glaze chocolate sauce.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Single Treat",
    customizationType: "cake"
  },
  {
    id: "cake-pineapple-pastry",
    name: "Pineapple Pastry",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Pineapple Pastry.jpg",
    description: "Delicate vanilla pastry square packed with tropical pineapple chunks and whipped cream.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Popular",
    customizationType: "cake"
  },
  {
    id: "cake-coffee-pastry",
    name: "Coffee Pastry",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Coffee Pastry.jpg",
    description: "Espresso-infused sponge topped with roasted coffee bean cream and cocoa powder dusting.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Aromatic",
    customizationType: "cake"
  },
  {
    id: "cake-cupcakes",
    name: "Cupcakes",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Cupcakes.jpg",
    description: "Fluffy individual cupcakes swirled with colorful buttercream frosting and sprinkles. Assorted box available.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Kids Love It",
    customizationType: "cake"
  },
  {
    id: "cake-brownies",
    name: "Brownies",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Brownies.jpg",
    description: "Gooey chocolate walnut brownies with crackly tops and melting chocolate centers.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Fudgy",
    customizationType: "cake"
  },
  {
    id: "cake-donuts",
    name: "Donuts",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Donuts.jpg",
    description: "Golden fried ring donuts glazed with Belgian chocolate, caramel drizzle, and colored sprinkles.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Fresh Glazed",
    customizationType: "cake"
  },
  {
    id: "cake-swiss-roll",
    name: "Swiss Roll",
    category: "Cakes & Pastries",
    categoryId: "cakes",
    image: "assets/images/products/Swiss Roll.jpg",
    description: "Tender rolled sponge cake filled with strawberry preserves and vanilla cream swirl.",
    price: null,
    priceUnit: "roll",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Delicate",
    customizationType: "cake"
  },

  // ==========================================
  // CATEGORY 3: TRADITIONAL PAKISTANI SWEETS (MITHAI)
  // ==========================================
  {
    id: "mithai-gulab-jamun",
    name: "Gulab Jamun",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Gulab Jamun.jpg",
    description: "Soft khoya dumplings deep fried in pure ghee and soaked in warm cardamom and rose-scented sugar syrup.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Pure Ghee",
    customizationType: "mithai"
  },
  {
    id: "mithai-kala-jamun",
    name: "Kala Jamun",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Kala Jamun.jpg",
    description: "Caramelized dark khoya sweet with a firmer crust, juicy syrupy center, and hint of saffron.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Traditional",
    customizationType: "mithai"
  },
  {
    id: "mithai-motichoor-laddu",
    name: "Motichoor Laddu",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Motichoor Laddu.jpg",
    description: "Tiny gram-flour pearls slow-cooked in pure desi ghee, flavored with saffron, cardamom, and melon seeds.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Festive Fav",
    customizationType: "mithai"
  },
  {
    id: "mithai-besan-laddu",
    name: "Besan Laddu",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Besan Laddu.webp",
    description: "Roasted gram flour cooked with desi ghee, sugar, and crunchy almonds until golden and fragrant.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Desi Ghee",
    customizationType: "mithai"
  },
  {
    id: "mithai-plain-barfi",
    name: "Plain Barfi",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Plain Barfi.jpg",
    description: "Authentic milk fudge crafted from reduced whole buffalo milk and delicate sugar, melting gently on the tongue.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Melt In Mouth",
    customizationType: "mithai"
  },
  {
    id: "mithai-milk-barfi",
    name: "Milk Barfi",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Milk Barfi.jpg",
    description: "Silky white milk fudge garnished with silver vark and crushed green cardamom.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Silver Vark",
    customizationType: "mithai"
  },
  {
    id: "mithai-pista-barfi",
    name: "Pista Barfi",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Pista Barfi.jpg",
    description: "Premium condensed milk barfi topped with toasted Iranian pistachios and cardamom essence.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Pistachio Rich",
    customizationType: "mithai"
  },
  {
    id: "mithai-cham-cham",
    name: "Cham Cham",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Cham Cham.jpg",
    description: "Spongy chhena dumplings steeped in sugar syrup, coated with desiccated coconut and mawa stuffing.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Soft & Juicy",
    customizationType: "mithai"
  },
  {
    id: "mithai-rasgulla",
    name: "Rasgulla",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Rasgulla.webp",
    description: "Snow-white spongy cottage cheese balls soaked in chilled, light sugar syrup.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Light & Juicy",
    customizationType: "mithai"
  },
  {
    id: "mithai-kalakand",
    name: "Kalakand",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Kalakand.jpg",
    description: "Granular sweetened milk cheese confection prepared fresh every morning with pure whole milk.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Fresh Dairy",
    customizationType: "mithai"
  },
  {
    id: "mithai-jalebi",
    name: "Jalebi",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Jalebi.jpg",
    description: "Crispy spiral pretzels fried fresh in pure ghee and bathed in hot saffron syrup.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Hot & Crisp",
    customizationType: "mithai"
  },
  {
    id: "mithai-balushahi",
    name: "Balushahi",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/placeholder.svg",
    description: "Flaky, glazed golden pastry donuts with a crisp exterior and moist syrupy interior.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Crispy Layers",
    customizationType: "mithai"
  },
  {
    id: "mithai-patisa",
    name: "Patisa",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Patisa.jpg",
    description: "Delicate flaky cubic sweet crafted from gram flour, desi ghee, almonds, and pistachios that dissolves instantly.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Flaky Flakes",
    customizationType: "mithai"
  },
  {
    id: "mithai-gajar-halwa",
    name: "Gajar Halwa",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Gajar Halwa.jpg",
    description: "Slow-simmered red Pakistani carrots cooked in fresh milk, desi ghee, roasted khoya, and mixed dry nuts.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Winter Special",
    customizationType: "mithai"
  },
  {
    id: "mithai-soan-papdi",
    name: "Soan Papdi",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Soan Papdi.jpg",
    description: "Crisp, thread-like layered dessert garnished with crushed pistachios and almonds.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Festive Box",
    customizationType: "mithai"
  },
  {
    id: "mithai-emarti",
    name: "Emarti",
    category: "Traditional Mithai",
    categoryId: "mithai",
    image: "assets/images/products/Emarti.jpg",
    description: "Royal flower-shaped confection made from urad dal batter, fried in pure desi ghee, and dipped in saffron syrup.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Royal Sweet",
    customizationType: "mithai"
  },

  // ==========================================
  // CATEGORY 4: BISCUITS AND COOKIES
  // ==========================================
  {
    id: "biscuit-nan-khatai",
    name: "Nan Khatai",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Nan Khatai.jpg",
    description: "Famous traditional Lahore-style crumbly shortbread biscuit made with desi ghee, semolina, and whole pistachios.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Lahori Special",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-zeera",
    name: "Zeera Biscuits",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Zeera Biscuits.jpg",
    description: "Savory-sweet golden tea biscuits baked with whole toasted cumin seeds and buttery aroma.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Tea Time",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-plain",
    name: "Plain Biscuits",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Plain Biscuits.jpg",
    description: "Crisp and buttery everyday bakery biscuits, ideal for dunking in piping hot chai.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Chai Partner",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-chocolate-cookies",
    name: "Chocolate Cookies",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Chocolate Cookies.jpg",
    description: "Rich cocoa cookies packed with decadent dark chocolate chips for crunch and flavor.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Choco Crunch",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-coconut",
    name: "Coconut Biscuits",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Coconut Biscuits.jpg",
    description: "Toasted shredded coconut folded into sweet buttery dough for a fragrant, crunchy bite.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Coconut Crunch",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-almond",
    name: "Almond Biscuits",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Almond Biscuits.jpg",
    description: "Crispy butter biscuits studded with roasted California almond slivers.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Nutty",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-butter-cookies",
    name: "Butter Cookies",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Butter Cookies.jpg",
    description: "European-style piped swirl butter cookies with delicate vanilla aroma.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Rich Butter",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-peanut-cookies",
    name: "Peanut Cookies",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Peanut Cookies.jpg",
    description: "Crunchy cookies loaded with roasted golden peanuts and brown sugar caramel notes.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Crunchy",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-salt",
    name: "Salt Biscuits",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Salt Biscuits.jpg",
    description: "Light, flaky savory crackers with a delicate salty touch, perfect for high tea.",
    price: null,
    priceUnit: "kg",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Savory Snack",
    customizationType: "biscuit"
  },
  {
    id: "biscuit-bakery-rusk",
    name: "Bakery Rusk",
    category: "Biscuits & Cookies",
    categoryId: "biscuits",
    image: "assets/images/products/Bakery Rusk.jpg",
    description: "Double-baked sweet wheat toast with fennel and cardamom essence. Crispy and golden.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Double Baked",
    customizationType: "biscuit"
  },

  // ==========================================
  // CATEGORY 5: BREAD AND BREAKFAST ITEMS
  // ==========================================
  {
    id: "bread-plain",
    name: "Plain Bread",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Plain Bread.jpg",
    description: "Soft white sandwich bread baked daily from high-grade wheat flour. Pillow-soft slices.",
    price: null,
    priceUnit: "loaf",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Daily Essential",
    customizationType: "bread"
  },
  {
    id: "bread-milk",
    name: "Milk Bread",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Milk Bread.jpg",
    description: "Enriched sweet milk loaf with velvety texture and golden crust, perfect for French toast.",
    price: null,
    priceUnit: "loaf",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Extra Soft",
    customizationType: "bread"
  },
  {
    id: "bread-bran",
    name: "Bran Bread",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Bran Bread.jpg",
    description: "High-fiber whole wheat bran bread, healthy, wholesome, and baked with zero trans fats.",
    price: null,
    priceUnit: "loaf",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "High Fiber",
    customizationType: "bread"
  },
  {
    id: "bread-sandwich",
    name: "Sandwich Bread",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Sandwich Bread.jpg",
    description: "Jumbo toast slices ideal for club sandwiches, toasters, and café-style breakfasts.",
    price: null,
    priceUnit: "loaf",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Jumbo Size",
    customizationType: "bread"
  },
  {
    id: "bread-burger-buns",
    name: "Burger Buns",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Burger Buns.jpg",
    description: "Fluffy sesame seed topped burger buns. Pack of 4 freshly baked soft buns.",
    price: null,
    priceUnit: "pack (4 pcs)",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Pack of 4",
    customizationType: "bread"
  },
  {
    id: "bread-hot-dog-buns",
    name: "Hot Dog Buns",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Hot Dog Buns.jpg",
    description: "Elongated soft rolls for hot dogs, grilled sausages, and sub sandwiches. Pack of 4.",
    price: null,
    priceUnit: "pack (4 pcs)",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Pack of 4",
    customizationType: "bread"
  },
  {
    id: "bread-pav-buns",
    name: "Pav Buns",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Pav Buns.jpg",
    description: "Feather-light butter slider buns, pillow soft and fresh out of the oven. Pack of 6.",
    price: null,
    priceUnit: "pack (6 pcs)",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Slider Buns",
    customizationType: "bread"
  },
  {
    id: "bread-garlic-bread",
    name: "Garlic Bread",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Garlic Bread.jpg",
    description: "Artisan herb and butter glazed garlic loaf ready to warm up for dinner.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Aromatic",
    customizationType: "bread"
  },
  {
    id: "bread-rusk",
    name: "Rusk",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Rusk.webp",
    description: "Crispy golden tea rusks with gentle sweetness and whole grain crunch.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Crispy",
    customizationType: "bread"
  },
  {
    id: "bread-toast",
    name: "Toast",
    category: "Bread & Breakfast",
    categoryId: "bread",
    image: "assets/images/products/Toast.jpg",
    description: "Oven-toasted golden bread slices, seasoned lightly for breakfast butter and jam.",
    price: null,
    priceUnit: "pack",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Crisp Toast",
    customizationType: "bread"
  },

  // ==========================================
  // CATEGORY 6: OTHER POPULAR BAKERY PRODUCTS
  // ==========================================
  {
    id: "other-chicken-quiche",
    name: "Chicken Quiche",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Chicken Quiche.jpg",
    description: "French-inspired savory tart filled with seasoned chicken breast, egg custard, cream, and herbs.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Gourmet",
    customizationType: "bakery"
  },
  {
    id: "other-pizza",
    name: "Pizza",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Pizza Slices.jpg",
    description: "Whole freshly baked 9-inch personal pan pizza with chicken tikka chunks, mozzarella cheese, and bell peppers.",
    price: null,
    priceUnit: "9-inch",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: true,
    badge: "Hot Out Oven",
    customizationType: "bakery"
  },
  {
    id: "other-cream-rolls",
    name: "Cream Rolls",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Cream Rolls.jpg",
    description: "Crunchy conical puff pastry horn stuffed with sweet vanilla whipped cream.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Childhood Fav",
    customizationType: "bakery"
  },
  {
    id: "other-chocolate-eclairs",
    name: "Chocolate Eclairs",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Chocolate Eclairs.webp",
    description: "Choux pastry filled with silky vanilla cream and dipped in luscious melted chocolate.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "French Choux",
    customizationType: "cake"
  },
  {
    id: "other-apple-pie",
    name: "Apple Pie",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Apple Pie.jpg",
    description: "Spiced cinnamon apple filling baked inside buttery, flaky lattice pastry crust.",
    price: null,
    priceUnit: "pie",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Warm Cinnamon",
    customizationType: "cake"
  },
  {
    id: "other-muffins",
    name: "Muffins",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Muffins.jpg",
    description: "Moist bakery muffins baked with blueberries and chocolate chips, with golden dome tops.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Moist & Soft",
    customizationType: "cake"
  },
  {
    id: "other-waffles",
    name: "Waffles",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Waffles.jpg",
    description: "Belgian deep-pocket waffles served crisp with maple syrup and chocolate fudge dip.",
    price: null,
    priceUnit: "serving",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Belgian Style",
    customizationType: "cake"
  },
  {
    id: "other-cinnamon-rolls",
    name: "Cinnamon Rolls",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Cinnamon Rolls.jpg",
    description: "Warm, pillowy yeast rolls swirled with brown sugar cinnamon and frosted with cream cheese icing.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: true,
    trending: false,
    badge: "Warm & Gooey",
    customizationType: "cake"
  },
  {
    id: "other-croissants",
    name: "Croissants",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Croissants.jpg",
    description: "Buttery, flaky French croissants with laminated golden honeycomb layers.",
    price: null,
    priceUnit: "pc",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Butter Laminated",
    customizationType: "bakery"
  },
  {
    id: "other-fruit-trifle",
    name: "Fruit Trifle",
    category: "Other Popular Items",
    categoryId: "other",
    image: "assets/images/products/Fruit Trifle.jpg",
    description: "Chilled multi-layered dessert with vanilla sponge, fruit cocktail, creamy custard, and strawberry jelly.",
    price: null,
    priceUnit: "cup",
    isPriceOnRequest: true,
    available: true,
    featured: false,
    trending: false,
    badge: "Chilled Sweet",
    customizationType: "cake"
  },

  // ==========================================
  // CATEGORY 7: WEEKEND BREAKFAST
  // ==========================================
  {
    id: "weekend-halwa-puri-fresh",
    name: "Halwa Puri Fresh",
    category: "Weekend Breakfast",
    categoryId: "weekend",
    image: "assets/images/products/Halwa Puri.jpg",
    description: "Authentic traditional Pakistani weekend breakfast. Puffed hot puris served with spicy Lahori chana tarkari, sweet suji halwa, and tangy mixed pickle. Available Saturday & Sunday only.",
    price: null,
    priceUnit: "thali set (2 Puris + Halwa + Chana)",
    isPriceOnRequest: true,
    available: true, // weekend logic dynamically overrides badge and status
    featured: true,
    trending: true,
    badge: "Weekend Special",
    weekendOnly: true,
    customizationType: "weekend"
  }
];

// Helper Functions
const ProductCatalog = {
  getAllProducts() {
    return PRODUCTS;
  },

  getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
  },

  getProductsByCategory(categoryId) {
    if (!categoryId || categoryId === "all") return PRODUCTS;
    return PRODUCTS.filter(p => p.categoryId === categoryId);
  },

  getFeaturedProducts() {
    return PRODUCTS.filter(p => p.featured);
  },

  getTrendingProducts() {
    return PRODUCTS.filter(p => p.trending);
  },

  searchProducts(query, categoryId = "all") {
    let list = this.getProductsByCategory(categoryId);
    if (!query || !query.trim()) return list;

    const q = query.toLowerCase().trim();
    return list.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchCat || matchDesc;
    });
  },

  formatPrice(price, priceUnit = "pc", isPriceOnRequest = false) {
    if (!BAKERY_CONFIG.showPrices || isPriceOnRequest || price === null || price === undefined || price <= 0) {
      return "Price on Request";
    }
    const formatted = Number(price).toLocaleString('en-PK');
    return `${BAKERY_CONFIG.currency} ${formatted}${priceUnit ? ` / ${priceUnit}` : ''}`;
  },

  /**
   * Evaluates if right now is Saturday or Sunday in Pakistan Standard Time (Asia/Karachi, UTC+5).
   */
  isWeekendInPKT() {
    try {
      const now = new Date();
      // Use Intl to format weekday in Asia/Karachi
      const weekday = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        weekday: 'short'
      }).format(now);
      return weekday === 'Sat' || weekday === 'Sun';
    } catch (e) {
      // Fallback: calculate manual UTC+5
      const now = new Date();
      const pkt = new Date(now.getTime() + (5 * 60 + now.getTimezoneOffset()) * 60000);
      const day = pkt.getDay();
      return day === 0 || day === 6;
    }
  },

  getPKTTimeDetails() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Karachi',
        hour12: true,
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      return new Intl.DateTimeFormat('en-US', options).format(now);
    } catch (e) {
      return new Date().toLocaleTimeString();
    }
  }
};

// Export globally
if (typeof window !== 'undefined') {
  window.BAKERY_CONFIG = BAKERY_CONFIG;
  window.BAKERY_CATEGORIES = BAKERY_CATEGORIES;
  window.PRODUCTS = PRODUCTS;
  window.ProductCatalog = ProductCatalog;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BAKERY_CONFIG, BAKERY_CATEGORIES, PRODUCTS, ProductCatalog };
}

