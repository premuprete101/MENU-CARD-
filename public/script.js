/* ============================================================
   Saffron & Smoke — script.js
   Features: loader, sticky nav, mobile menu, active links,
   search, category filter, scroll reveal animations,
   staggered card entry, back-to-top, smooth scrolling.
   ============================================================ */

/* ---------- Menu Data ---------- */
const menuItems = [
  { name: "Crispy Bruschetta",   category: "Starters",    price: 220, oldPrice: 280, img: "/images/starter.png",    desc: "Toasted artisan bread topped with tomato, basil and garlic.", tags: ["bestseller"] },
  { name: "Smoky Paneer Tikka",  category: "Starters",    price: 280, img: "/images/starter.png",    desc: "Char-grilled cottage cheese marinated in smoky spices.", tags: ["special"] },
  { name: "Grilled Steak",       category: "Main Course", price: 640, oldPrice: 760, img: "/images/maincourse.png", desc: "Tender grilled steak served with roasted seasonal veggies.", tags: ["bestseller", "discount"] },
  { name: "Butter Chicken",      category: "Main Course", price: 420, img: "/images/maincourse.png", desc: "Creamy tomato gravy with succulent chicken pieces.", tags: [] },
  { name: "Margherita Pizza",    category: "Pizza",       price: 360, img: "/images/pizza.png",       desc: "Wood-fired classic with mozzarella and fresh basil.", tags: ["bestseller"] },
  { name: "Smoke BBQ Pizza",     category: "Pizza",       price: 440, oldPrice: 520, img: "/images/pizza.png", desc: "Smoky barbecue sauce, peppers and double cheese.", tags: ["discount"] },
  { name: "Classic Cheeseburger",category: "Burgers",     price: 320, img: "/images/burger.png",      desc: "Juicy patty, melted cheese and crispy fries on the side.", tags: ["bestseller"] },
  { name: "Spicy Chicken Burger",category: "Burgers",     price: 340, img: "/images/burger.png",      desc: "Crunchy fried chicken with a fiery house sauce.", tags: ["special"] },
  { name: "Creamy Alfredo Pasta",category: "Pasta",       price: 380, img: "/images/pasta.png",       desc: "Silky parmesan cream sauce tossed with fresh herbs.", tags: [] },
  { name: "Arrabbiata Pasta",    category: "Pasta",       price: 360, oldPrice: 420, img: "/images/pasta.png", desc: "Spicy tomato sauce with garlic and chili flakes.", tags: ["discount"] },
  { name: "Citrus Cooler",       category: "Drinks",      price: 160, img: "/images/drink.png",       desc: "Refreshing orange mocktail with mint and ice.", tags: ["special"] },
  { name: "Berry Smash",         category: "Drinks",      price: 180, img: "/images/drink.png",       desc: "Mixed berry blend served chilled with soda.", tags: [] },
  { name: "Chocolate Lava Cake", category: "Desserts",    price: 240, oldPrice: 300, img: "/images/dessert.png",  desc: "Warm chocolate cake with a molten gooey center.", tags: ["bestseller", "discount"] },
  { name: "Classic Cheesecake",  category: "Desserts",    price: 260, img: "/images/dessert.png",     desc: "Smooth baked cheesecake with a berry drizzle.", tags: ["special"] },
];

/* ---------- Render a single card ---------- */
function cardTemplate(item, index) {
  const badges = [];
  if (item.tags.includes("special"))    badges.push('<span class="badge special">Today\'s Special</span>');
  if (item.tags.includes("bestseller")) badges.push('<span class="badge bestseller">Best Seller</span>');
  const discount = item.tags.includes("discount") && item.oldPrice
    ? `<span class="badge discount">-${Math.round((1 - item.price / item.oldPrice) * 100)}%</span>` : "";
  const oldPrice = item.oldPrice ? `<small>₹${item.oldPrice}</small>` : "";

  return `
    <article class="card" data-category="${item.category}" data-name="${item.name.toLowerCase()}" style="animation-delay:${index * 70}ms">
      <div class="card-img">
        <div class="badges">${badges.join("")}</div>
        ${discount}
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-cat">${item.category}</span>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-foot">
          <span class="price">${oldPrice}₹${item.price}</span>
          <button class="order-btn" type="button">Order</button>
        </div>
      </div>
    </article>`;
}

const menuGrid = document.getElementById("menuGrid");
const noResults = document.getElementById("noResults");

/* ---------- Render menu (with optional filter/search) ---------- */
function renderMenu(list) {
  menuGrid.innerHTML = list.map((item, i) => cardTemplate(item, i)).join("");
  noResults.hidden = list.length !== 0;
  attachOrderButtons();
}

/* ---------- Order button feedback ---------- */
function attachOrderButtons() {
  document.querySelectorAll(".order-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.textContent = "Added ✓";
      btn.classList.add("added");
      setTimeout(() => { btn.textContent = "Order"; btn.classList.remove("added"); }, 1400);
    });
  });
}

/* ---------- Search + Filter (combined) ---------- */
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
let activeCategory = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = menuItems.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });
  renderMenu(filtered);
}

searchInput.addEventListener("input", applyFilters);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.filter;
    applyFilters();
  });
});

/* ---------- Chef's Recommendation (best sellers) ---------- */
const chefGrid = document.getElementById("chefGrid");
const chefPicks = menuItems.filter((i) => i.tags.includes("bestseller")).slice(0, 3);
chefGrid.innerHTML = chefPicks.map((item, i) => cardTemplate(item, i)).join("");

/* ---------- Testimonials ---------- */
const testimonials = [
  { quote: "Best smoky paneer tikka I've ever had. The ambience is unreal!", who: "Aarav Mehta", role: "Food Blogger" },
  { quote: "The lava cake alone is worth the trip. Service was warm and quick.", who: "Sneha Kapoor", role: "Regular Guest" },
  { quote: "Perfect spot for family dinners. Every dish felt freshly crafted.", who: "Rohan Verma", role: "Local Guide" },
];
document.getElementById("testimonialGrid").innerHTML = testimonials.map((t, i) => `
  <div class="testimonial" style="animation-delay:${i * 100}ms">
    <div class="stars">★★★★★</div>
    <p class="quote">"${t.quote}"</p>
    <div class="who">${t.who}</div>
    <div class="role">${t.role}</div>
  </div>`).join("");

/* ---------- Initial render ---------- */
renderMenu(menuItems);

/* ============================================================
   Loading Animation
   ============================================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

/* ============================================================
   Sticky header + scrolled state + active nav links
   ============================================================ */
const header = document.getElementById("header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);

  // Active link based on scroll position
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });

  // Back to top visibility
  backToTop.classList.toggle("show", window.scrollY > 500);
});

/* ============================================================
   Mobile hamburger menu
   ============================================================ */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
});

// Close mobile menu on link click
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  })
);

/* ============================================================
   Back to Top
   ============================================================ */
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ============================================================
   Scroll Reveal Entry Animations (IntersectionObserver)
   ============================================================ */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add("visible"), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
