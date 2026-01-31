document.addEventListener('DOMContentLoaded', function () {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // 2. Hero Slider (Autoplay Enabled)
    const swiper = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 3. Testimonial Slider
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { el: '.swiper-pagination' },
    });

    // 4. Close menu when clicking links (Mobile fix)
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
});