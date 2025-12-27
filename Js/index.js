/**
 * CodeSolix Website - Main JavaScript
 * Professional implementation with error handling and modern patterns
 */

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

/**
 * Main Application Controller
 */
class AppController {
    constructor() {
        this.init();
    }

    init() {
        try {
            this.setupNavigation();
            this.setupVideoSlider();
            this.setupTeamSection();
            this.setupTestimonials();
            this.setupReadMoreButtons();
            this.setupScrollReveal();
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    /**
     * Navigation Menu Handler
     */
    setupNavigation() {
        const menuBtn = document.querySelector(".menu_btn");
        const navigation = document.querySelector(".navigation");

        if (!menuBtn || !navigation) {
            console.warn('Navigation elements not found');
            return;
        }

        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll(".nav__links a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                navigation.classList.remove("active");
            });
        });
    }

    /**
     * Video Slider Controller
     */
    setupVideoSlider() {
        const buttons = document.querySelectorAll(".nav__btn");
        const sliders = document.querySelectorAll(".video-slider");
        const contents = document.querySelectorAll(".index__content");

        if (!buttons.length || !sliders.length || !contents.length) {
            console.warn('Video slider elements not found');
            return;
        }

        const sliderNav = (index) => {
            // Remove active class from all elements
            buttons.forEach(btn => btn.classList.remove("active"));
            sliders.forEach(slide => slide.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Add active class to selected elements
            if (buttons[index]) buttons[index].classList.add("active");
            if (sliders[index]) sliders[index].classList.add("active");
            if (contents[index]) contents[index].classList.add("active");
        };

        // Add click handlers
        buttons.forEach((button, index) => {
            button.addEventListener("click", () => {
                sliderNav(index);
            });
        });

        // Auto-slide functionality (optional)
        let currentSlide = 0;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % buttons.length;
            sliderNav(currentSlide);
        }, 5000);
    }

    /**
     * Team Section Interactive Handler
     */
    setupTeamSection() {
        const teamContent = document.querySelectorAll('.team-section .content');
        const teamImages = document.querySelectorAll(".imgbx");
        const teamContentBoxes = document.querySelectorAll(".contentbx");

        if (!teamContent.length || !teamImages.length) {
            console.warn('Team section elements not found');
            return;
        }

        // Intersection Observer for animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    } else {
                        entry.target.classList.remove('animate');
                    }
                });
            },
            { threshold: 0.5 }
        );

        teamContent.forEach(content => observer.observe(content));

        // Team member hover handler
        teamImages.forEach((imgBox, index) => {
            imgBox.addEventListener("mouseover", () => {
                // Remove active from all
                teamContentBoxes.forEach(box => box.classList.remove('active'));
                teamImages.forEach(img => img.classList.remove('active'));

                // Add active to current
                const targetId = imgBox.getAttribute('data-id');
                if (targetId) {
                    const targetBox = document.getElementById(targetId);
                    if (targetBox) {
                        targetBox.classList.add('active');
                        imgBox.classList.add('active');
                    }
                }
            });
        });
    }

    /**
     * Testimonials Swiper Setup
     */
    setupTestimonials() {
        const swiperElement = document.querySelector('.js-testimonials-slider');
        if (!swiperElement) {
            console.warn('Testimonials swiper not found');
            return;
        }

        try {
            const swiper = new Swiper('.js-testimonials-slider', {
                grabCursor: true,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.js-testimonials-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                },
            });
        } catch (error) {
            console.error('Error initializing Swiper:', error);
        }
    }

    /**
     * Read More Button Handler - Professional Implementation
     */
    setupReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.read-more-btn');

        if (!readMoreButtons.length) {
            console.warn('Read more buttons not found');
            return;
        }

        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleReadMore(button);
            });
        });
    }

    /**
     * Handle Read More Toggle
     */
    handleReadMore(button) {
        const serviceBox = button.closest('.services-box');
        if (!serviceBox) return;

        const serviceDetails = serviceBox.querySelector('.service-details');
        const serviceShort = serviceBox.querySelector('.service-short');

        if (!serviceDetails || !serviceShort) return;

        const isExpanded = serviceDetails.style.display !== 'none';

        if (isExpanded) {
            // Collapse
            this.collapseService(serviceDetails, serviceShort, button);
        } else {
            // Expand
            this.expandService(serviceDetails, serviceShort, button);
        }
    }

    /**
     * Expand Service Details
     */
    expandService(details, short, button) {
        // Smooth scroll to service box
        const serviceBox = button.closest('.services-box');
        serviceBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Show details with animation
        details.style.display = 'block';
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';

        // Animate in
        requestAnimationFrame(() => {
            details.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        });

        // Update button
        button.textContent = 'Read Less';
        button.classList.add('active');

        // Hide short description
        short.style.opacity = '0.6';
    }

    /**
     * Collapse Service Details
     */
    collapseService(details, short, button) {
        // Animate out
        details.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            details.style.display = 'none';
        }, 300);

        // Update button
        button.textContent = 'Read More';
        button.classList.remove('active');

        // Show short description
        short.style.opacity = '1';
    }

    /**
     * Scroll Reveal Setup
     */
    setupScrollReveal() {
        if (typeof ScrollReveal === 'undefined') {
            console.warn('ScrollReveal library not loaded');
            return;
        }

        try {
            const sr = ScrollReveal({
                distance: '65px',
                duration: 2600,
                delay: 450,
                reset: false,
                easing: 'ease-out'
            });

            sr.reveal('.hero-text', { delay: 200, origin: 'top' });
            sr.reveal('.hero-image', { delay: 450, origin: 'top' });
            sr.reveal('.block1', { delay: 400, origin: 'top' });
            sr.reveal('.block2', { delay: 500, origin: 'bottom' });
            sr.reveal('.block3', { delay: 200, origin: 'top' });
            sr.reveal('.block4', { delay: 350, origin: 'bottom' });
        } catch (error) {
            console.error('Error initializing ScrollReveal:', error);
        }
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

/**
 * Initialize Application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        new AppController();
        setupSmoothScroll();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations/videos when tab is hidden
        console.log('Page hidden');
    } else {
        // Resume when tab is visible
        console.log('Page visible');
    }
});
