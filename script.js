/* ========================================
   LANDING PAGE INTERACTIVITY
   Pet First Aid Book - ExPoPet
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // FAQ ACCORDION FUNCTIONALITY
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL TO TOP ON LOGO CLICK
    // ========================================
    const logo = document.querySelector('.logo-img');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // ANIMATE ELEMENTS ON SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.pain-card, .benefit-item, .testimonial-card, .bonus-card'
    );

    // Set initial state and observe
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ========================================
    // CTA BUTTON CLICK TRACKING
    // ========================================
    const ctaButtons = document.querySelectorAll(
        '.btn-cta-main, .btn-cta-secondary, .btn-buy, .btn-cta-header'
    );

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Log click (for analytics purposes)
            console.log('CTA Button clicked:', this.textContent.trim());
            
            // You can add analytics tracking here
            // Example: gtag('event', 'cta_click', { button_text: this.textContent });
        });
    });

    // ========================================
    // COUNTDOWN TIMER (OPTIONAL)
    // Uncomment if you want to add urgency
    // ========================================
    /*
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        // Set countdown time (24 hours from now)
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (distance < 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "OFERTA EXPIRADA";
            }
        }, 1000);
    }

    // startCountdown();
    */

    // ========================================
    // STICKY HEADER ON SCROLL
    // ========================================
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // WHATSAPP BUTTON PULSE EFFECT
    // ========================================
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });

        // Log WhatsApp click
        whatsappButton.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // Add analytics tracking here if needed
        });
    }

    // ========================================
    // FORM VALIDATION (if you add an email capture form)
    // ========================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Example usage:
    /*
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (validateEmail(email)) {
                console.log('Valid email:', email);
                // Process form submission
            } else {
                alert('Por favor, insira um e-mail válido');
            }
        });
    }
    */

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // PRICE ANIMATION ON SCROLL
    // ========================================
    const priceElement = document.querySelector('.price-value');
    
    if (priceElement) {
        const priceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add emphasis animation
                    priceElement.style.animation = 'pulse 1s ease-in-out 3';
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        priceObserver.observe(priceElement);
    }

    // ========================================
    // EXIT INTENT POPUP (OPTIONAL)
    // Uncomment to show popup when user tries to leave
    // ========================================
    /*
    let exitIntentShown = false;

    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntentPopup();
        }
    });

    function showExitIntentPopup() {
        // Create and show modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center;">
                <h2 style="margin-bottom: 20px; color: #b89fcd;">⏰ Espere!</h2>
                <p style="margin-bottom: 20px;">Não perca esta oportunidade de proteger seu pet!</p>
                <p style="margin-bottom: 30px; font-size: 24px; font-weight: bold; color: #ffff56;">
                    Use o cupom: <span style="background: #b89fcd; color: white; padding: 5px 15px; border-radius: 10px;">FICAQUEI10</span>
                </p>
                <p style="margin-bottom: 20px;">Para ganhar mais 10% de desconto!</p>
                <button onclick="this.closest('div').parentElement.remove()" 
                    style="background: #b89fcd; color: white; border: none; padding: 15px 30px; 
                    border-radius: 30px; font-size: 18px; cursor: pointer;">
                    Aproveitar Agora!
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    */

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c🐾 ExPoPet - Cuidando dos Pets com Amor 🐾', 
        'color: #b89fcd; font-size: 20px; font-weight: bold;');
    console.log('%cObrigado por ajudar a construir a plataforma ExPoPet!', 
        'color: #90fca7; font-size: 14px;');

    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=800&fit=crop'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // ========================================
    // ACCESSIBILITY IMPROVEMENTS
    // ========================================
    
    // Add keyboard navigation for CTA buttons
    ctaButtons.forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ========================================
    // ANALYTICS READY
    // ========================================
    
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Send to analytics if configured
        // gtag('event', 'timing_complete', {
        //     name: 'load',
        //     value: loadTime
        // });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestones
            if (maxScroll >= 25 && maxScroll < 26) {
                console.log('Scroll depth: 25%');
            } else if (maxScroll >= 50 && maxScroll < 51) {
                console.log('Scroll depth: 50%');
            } else if (maxScroll >= 75 && maxScroll < 76) {
                console.log('Scroll depth: 75%');
            } else if (maxScroll >= 90) {
                console.log('Scroll depth: 90%+');
            }
        }
    });

    // ========================================
    // MOBILE MENU TOGGLE (if needed)
    // ========================================
    
    // This can be used if you add a hamburger menu later
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ========================================
    // INITIALIZATION COMPLETE
    // ========================================
    console.log('Landing page initialized successfully! 🚀');
});

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency (Brazilian Real)
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}