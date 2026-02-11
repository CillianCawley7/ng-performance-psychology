// =============================================
// NG Performance Psychology - JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // Mobile Menu Toggle
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // =============================================
    // Testimonials Carousel
    // =============================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        // Handle wrap around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 9000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });

    // Arrow click handlers
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            stopAutoplay();
            showSlide(currentSlide - 1);
            startAutoplay();
        });

        nextArrow.addEventListener('click', () => {
            stopAutoplay();
            showSlide(currentSlide + 1);
            startAutoplay();
        });
    }
    
    // Start autoplay
    if (slides.length > 0) {
        startAutoplay();
    }
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // =============================================
    // Scroll Reveal Animation
    // =============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });
    
    // =============================================
    // Smooth Scroll for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // Header Background on Scroll
    // =============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--color-bg)';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // =============================================
    // Chat Widget - Opens WhatsApp
    // =============================================
    const chatWidget = document.querySelector('.chat-widget');
    if (chatWidget) {
        chatWidget.addEventListener('click', function() {
            window.open('https://wa.me/353852832623', '_blank');
        });
    }
    
    // =============================================
    // Contact Form Submission
    // =============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Gather form data
            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                phone: contactForm.querySelector('[name="phone"]').value,
                service: contactForm.querySelector('[name="service"]').value,
                message: contactForm.querySelector('[name="message"]').value
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Success
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.backgroundColor = '#25D366';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error(result.error || 'Failed to send message');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.style.backgroundColor = '#e74c3c';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
    
    // =============================================
    // Initialize
    // =============================================
    console.log('NG Performance Psychology website initialized');
});
