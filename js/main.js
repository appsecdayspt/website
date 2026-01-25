/**
 * OWASP AppSec Days Portugal 2026 - Main JavaScript
 */

(function() {
    'use strict';

    // ==========================================================================
    // Language Toggle
    // ==========================================================================
    const LanguageManager = {
        currentLang: 'en',
        storageKey: 'appsecdays-lang',

        init() {
            // Check for saved language preference
            const savedLang = localStorage.getItem(this.storageKey);
            if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
                this.currentLang = savedLang;
            }

            this.setupToggle();
            this.applyLanguage(this.currentLang);
        },

        setupToggle() {
            const langToggle = document.getElementById('lang-toggle');
            if (!langToggle) return;

            const langOptions = langToggle.querySelectorAll('.lang-option');
            langOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.setLanguage(lang);
                });
            });
        },

        setLanguage(lang) {
            if (lang === this.currentLang) return;

            this.currentLang = lang;
            localStorage.setItem(this.storageKey, lang);
            this.applyLanguage(lang);
        },

        applyLanguage(lang) {
            // Update HTML lang attribute
            document.documentElement.lang = lang;

            // Update all translatable elements
            const elements = document.querySelectorAll('[data-en][data-pt]');
            elements.forEach(el => {
                const text = el.dataset[lang];
                if (text) {
                    el.textContent = text;
                }
            });

            // Update toggle button active state
            const langOptions = document.querySelectorAll('.lang-option');
            langOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.lang === lang);
            });
        }
    };

    // ==========================================================================
    // Navigation
    // ==========================================================================
    const Navigation = {
        navbar: null,
        navToggle: null,
        navMenu: null,
        scrollThreshold: 50,

        init() {
            this.navbar = document.getElementById('navbar');
            this.navToggle = document.getElementById('nav-toggle');
            this.navMenu = document.getElementById('nav-menu');

            if (!this.navbar) return;

            this.setupScrollBehavior();
            this.setupMobileToggle();
            this.setupSmoothScroll();
        },

        setupScrollBehavior() {
            let lastScroll = 0;

            const handleScroll = () => {
                const currentScroll = window.pageYOffset;

                // Add/remove scrolled class
                if (currentScroll > this.scrollThreshold) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                lastScroll = currentScroll;
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check
        },

        setupMobileToggle() {
            if (!this.navToggle || !this.navMenu) return;

            this.navToggle.addEventListener('click', () => {
                this.navToggle.classList.toggle('active');
                this.navMenu.classList.toggle('active');
                document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close menu when clicking a link
            const navLinks = this.navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navToggle.classList.remove('active');
                    this.navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.navMenu.classList.contains('active') &&
                    !this.navMenu.contains(e.target) &&
                    !this.navToggle.contains(e.target)) {
                    this.navToggle.classList.remove('active');
                    this.navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        },

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ==========================================================================
    // Animations
    // ==========================================================================
    const Animations = {
        init() {
            this.setupIntersectionObserver();
        },

        setupIntersectionObserver() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('animate-ready');
                observer.observe(section);
            });

            // Observe cards
            document.querySelectorAll('.tier-card, .benefit-card, .speaker-card, .committee-member').forEach(card => {
                card.classList.add('animate-ready');
                observer.observe(card);
            });
        }
    };

    // ==========================================================================
    // Analytics (placeholder for future GA4 integration)
    // ==========================================================================
    const Analytics = {
        init() {
            // Track CTA clicks
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const text = this.textContent.trim();
                    const href = this.getAttribute('href');

                    // Log for development (replace with actual GA4 tracking)
                    if (typeof gtag === 'function') {
                        gtag('event', 'click', {
                            event_category: 'CTA',
                            event_label: text,
                            link_url: href
                        });
                    }
                });
            });
        }
    };

    // ==========================================================================
    // Initialize
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', function() {
        LanguageManager.init();
        Navigation.init();
        Animations.init();
        Analytics.init();
    });

    // Add some CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .tier-card.animate-ready,
        .benefit-card.animate-ready,
        .speaker-card.animate-ready,
        .committee-member.animate-ready {
            transition-delay: calc(var(--animation-order, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    // Set animation order for cards
    document.querySelectorAll('.tiers-grid .tier-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    document.querySelectorAll('.sponsor-benefits .benefit-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    document.querySelectorAll('.speakers-grid .speaker-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    document.querySelectorAll('.committee-grid .committee-member').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

})();
