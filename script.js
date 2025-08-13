// Custom JavaScript for Arpit Kumar Selat Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScrollEffect();
    initAnimationsOnScroll();
    initSkillBars();
    initContactForm();
    // initTypingEffect(); // Disabled to prevent HTML tag display issues
    initParticleBackground();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        navbarToggler.click();
                    }
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Animations on scroll
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .timeline-item,
        .project-card,
        .skill-item,
        .stat-item,
        .education-item,
        .certification-item
    `);
    
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Animate skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        bar.setAttribute('data-width', width);
    });
}

function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    if (progressBar && !progressBar.classList.contains('animated')) {
        const targetWidth = progressBar.getAttribute('data-width');
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
            progressBar.classList.add('animated');
        }, 200);
    }
}

// Animate counters
function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (numberElement && !numberElement.classList.contains('animated')) {
        const targetNumber = parseInt(numberElement.textContent.replace(/[^0-9]/g, ''));
        const suffix = numberElement.textContent.replace(/[0-9]/g, '');
        
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            
            numberElement.textContent = Math.floor(currentNumber) + suffix;
        }, 40);
        
        numberElement.classList.add('animated');
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formFields = contactForm.querySelectorAll('input, textarea');
            
            // Simple validation
            let isValid = true;
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close float-end" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Typing effect for hero section (disabled due to HTML structure issues)
function initTypingEffect() {
    // This function is disabled to prevent HTML tags from being displayed as text
    // The typing effect conflicts with HTML span tags
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        // Simply ensure the title is visible without typing effect
        heroTitle.style.opacity = '1';
    }
}

// Particle background effect (lightweight)
function initParticleBackground() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    
    heroSection.appendChild(canvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    resizeCanvas();
    animate();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

// Utility function to add CSS animations
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .navbar-nav .nav-link.active {
            color: #3498db !important;
        }
        
        .is-invalid {
            border-color: #dc3545 !important;
        }
        
        .btn:focus {
            box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
        }
    `;
    document.head.appendChild(style);
}

// Initialize CSS animations
addCSSAnimations();

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 300);
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(function() {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);
