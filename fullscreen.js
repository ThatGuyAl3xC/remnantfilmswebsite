document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel');
    const icons = document.querySelectorAll('.fullscreen-icon');
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const toggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (toggle && navMenu){
            toggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu if user clicks outside of it
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = toggle.contains(event.target);

            // Only attempt to close if the menu is active
            if (navMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Carousel Script
    if (carousel){
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        const slides = document.querySelectorAll('.carousel-slide');
        let currentIndex = 0;
        let autoPlayInterval;

        // Create dot indicators
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                    resetAutoplay();
                });
            indicatorsContainer.appendChild(dot);
        });

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;

            const dots = document.querySelectorAll('.dot');

            // Update active dot
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        document.querySelector('.carousel-btn.left').addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        document.querySelector('.carousel-btn.right').addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        function startAutoplay() {
            autoPlayInterval = setInterval(nextSlide, 5000); // 5 seconds
        }

        function resetAutoplay() {
            clearInterval(autoPlayInterval);
            startAutoplay();
        }

        updateCarousel(); // initialize
        startAutoplay();  // autoplay starts
    }

    // Fullscreen zoom script
    if (icons.length && overlay && fullscreenImage){
            icons.forEach(icon => {
             icon.addEventListener('click', () => {
                const img = icon.nextElementSibling;
                fullscreenImage.src = img.src;
                overlay.classList.add('active');
             });
        });

        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            // optional: wait for animation before clearing src
            setTimeout(() => {
                fullscreenImage.src = '';
            }, 300);
        });
    }

    window.onerror = function (message, source, lineno, colno, error) {
    alert(`Error: ${message} at ${source}:${lineno}:${colno}`);
    };
});