/* =========================================================
   INIT FUNCTION
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------------------
       1. HAMBURGER MENU (MOBILE)
       ----------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    if (hamburger && navLinks) {
        // Toggle menu pas hamburger diklik
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Biar gak bentrok sama event "klik di luar"
            navLinks.classList.toggle('active');
        });

        // Auto-close menu pas salah satu link diklik
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Auto-close menu kalau user klik di luar area menu
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    /* -----------------------------------------------------
       2. NAVBAR SCROLL EFFECT
       ----------------------------------------------------- */
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
        }
    });

    /* -----------------------------------------------------
       3. SCROLL REVEAL ANIMATION
       ----------------------------------------------------- */
    // Ambil semua tag <section> KECUALI hero (karena hero udah ada animasi sendiri di CSS)
    const sections = document.querySelectorAll('section:not(.hero)');
    
    // Tambahin class .reveal ke semua section
    sections.forEach(sec => sec.classList.add('reveal'));

    // Setup IntersectionObserver buat deteksi pas di-scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animasi jalan kalau 15% section udah masuk layar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahin class .active biar CSS-nya ngejalanin animasi
                entry.target.classList.add('active');
                // Stop observe kalau udah muncul (biar gak bolak-balik)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Mulai pantau tiap section
    sections.forEach(sec => observer.observe(sec));
    
});