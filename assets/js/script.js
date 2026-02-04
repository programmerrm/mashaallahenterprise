document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("mobile-menu");
    const navbar = document.querySelector(".navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    // 2. Swiper Initializations
    const swiper = new Swiper(".hero-slider", {
        loop: true,
        speed: 1000,
        pagination: { el: ".swiper-pagination", clickable: true },
    });

    const testimonial = new Swiper(".testimonial-swiper", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: { delay: 3000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });

    // ==========================================
    // 3. CART FUNCTIONALITY (NEW)
    // ==========================================
    const cartBtn = document.getElementById("cart-icon");
    const closeCart = document.getElementById("close-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartCountBadge = document.getElementById("cart-count");
    const cartTotalDisplay = document.getElementById("cart-total");

    let cart = [];

    // Open/Close Cart
    function toggleCart() {
        cartSidebar.classList.toggle("active");
        cartOverlay.classList.toggle("active");
    }

    cartBtn.addEventListener("click", toggleCart);
    closeCart.addEventListener("click", toggleCart);
    cartOverlay.addEventListener("click", toggleCart);

    // Add to Cart Logic
    const addBtns = document.querySelectorAll(".add-to-cart-btn");

    addBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            const name = card.querySelector(".p-name a").innerText;
            const price = parseFloat(
                card.querySelector(".product-price").getAttribute("data-price"),
            );
            const img = card.querySelector(".product-tumb img").src;

            addToCart(name, price, img);
        });
    });

    function addToCart(name, price, img) {
        cart.push({ name, price, img });
        updateCartUI();
        // Optional: Open cart automatically when item added
        if (!cartSidebar.classList.contains("active")) toggleCart();
    }

    function updateCartUI() {
        // Update Badge
        cartCountBadge.innerText = cart.length;

        // Clear Container
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML =
                '<p class="empty-msg">Your cart is empty!</p>';
            cartTotalDisplay.innerText = "$0";
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemHTML = `
                <div class="cart-item-list">
                    <img src="${item.img}" alt="">
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p>$${item.price}</p>
                    </div>
                    <i class="fas fa-trash remove-item" onclick="removeFromCart(${index})"></i>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
        });

        cartTotalDisplay.innerText = `$${total}`;
    }

    // Global function for removing items
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    // 4. Close menu when clicking links
    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuToggle.querySelector("i").className = "fas fa-bars";
        });
    });

    // gsap
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    let tl = gsap.timeline();
    let navtl = gsap.timeline();

    let smoother = ScrollSmoother.create({
        wrapper: ".smooth-wrapper",
        content: ".smooth-content",
        smooth: 5,
        effects: true,
        smoothTouch: 0.1,
    });
    gsap.fromTo(
        ".top-bar",
        {
            y: -50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
        },
    );
    gsap.fromTo(
        ".header",
        {
            y: -50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
        },
    );
    // Header Sticky Animation on Scroll
    ScrollTrigger.create({
        start: "top -100", // 100px scroll korar por trigger hobe
        onUpdate: (self) => {
            if (self.direction === 1) { // Niche scroll korle
                gsap.to(".header", {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    padding: "10px 0", // Scroll korle header ektu choto hobe
                    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                    duration: 0.3
                });
            } else { // Upore scroll korle (Normal state)
                gsap.to(".header", {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "16px 0",
                    boxShadow: "var(--shadow)",
                    duration: 0.3
                });
            }
        }
    });
    navtl.fromTo(
        ".navbar ul li",
        {
            y: -50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0.5,
            stagger: 0.2,
        },
    );
    gsap.fromTo(
        ".hero-slider",
        {
            y: -50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
        },
    );
    gsap.fromTo(
        ".category .page-header",
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
        },
    );
    gsap.fromTo(
        ".category-page .category-item",
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
        },
    );
    gsap.from(".category-item", {
        scrollTrigger: {
            trigger: ".category",
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out"
    });
    gsap.from(".product-section .section-title", {
        scrollTrigger: {
            trigger: ".product-section",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top 65%",
            end: "bottom 40%",
            scrub: 1,
            once: true,
            // toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
    });
    gsap.from(".product-page .product-card", {
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top 65%",
            end: "bottom 20%",
            // scrub: 1,
            once: true,
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
    });
    gsap.from(".testimonial-section .section-title", {
        scrollTrigger: {
            trigger: ".testimonial-section",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    gsap.from(".testimonial-swiper", {
        scrollTrigger: {
            trigger: ".testimonial-section",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none none",
        },
        y: -100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out"
    });
    gsap.from(".footer-col", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top bottom-=100",
            toggleActions: "play none none none",

        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
    });
    // Footer Bottom Animation
    gsap.from(".footer-bottom", {
        scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top bottom",
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.out"
    });

    const scrollTopBtn = document.querySelector("#scrollTopBtn");

    ScrollTrigger.create({
        start: "top -500",
        onUpdate: (self) => {
            if (self.direction === 1) {
                scrollTopBtn.classList.add("active");
            } else if (self.scroll() < 500) {
                scrollTopBtn.classList.remove("active");
            }
        }
    });

    scrollTopBtn.addEventListener("click", () => {

        if (typeof smoother !== 'undefined') {
            smoother.scrollTo(0, true, "power2.inOut");
        } else {
            gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.inOut" });
        }
    });

    gsap.from(".product-gallery", { opacity: 0, x: -50, duration: 1 });
    gsap.from(".product-content > *", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    });
});
