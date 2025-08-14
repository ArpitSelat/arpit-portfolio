// Custom JavaScript for Arpit Kumar Selat Portfolio

// Collapsible Sections Functionality
function toggleSection(sectionName) {
    const content = document.getElementById(sectionName + '-content');
    const header = event.target.closest('.section-header');
    
    // Close all other sections first
    const allSections = document.querySelectorAll('.section-content');
    const allHeaders = document.querySelectorAll('.section-header');
    
    allSections.forEach(section => {
        if (section !== content) {
            section.classList.remove('active');
            section.style.maxHeight = '0px';
        }
    });
    
    allHeaders.forEach(headerEl => {
        if (headerEl !== header) {
            headerEl.classList.remove('active');
        }
    });
    
    // Toggle the clicked section
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        content.style.maxHeight = '0px';
        header.classList.remove('active');
    } else {
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.classList.add('active');
        
        // Auto-adjust height after transition
        setTimeout(() => {
            if (content.classList.contains('active')) {
                content.style.maxHeight = 'none';
            }
        }, 500);
    }
    
    // Scroll to the section header after a short delay
    setTimeout(() => {
        header.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

// Initialize collapsible sections
function initCollapsibleSections() {
    // Ensure the home section is open by default
    const homeContent = document.getElementById('home-content');
    const homeHeader = document.querySelector('.section-header.active');
    
    if (homeContent && homeHeader) {
        homeContent.style.maxHeight = 'none';
    }
    
    // Handle responsive resizing
    window.addEventListener('resize', () => {
        const activeSections = document.querySelectorAll('.section-content.active');
        activeSections.forEach(section => {
            if (section.style.maxHeight !== '0px') {
                section.style.maxHeight = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    // Wait for API data to load first
    try {
        // Wait a bit for the data loader to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if data loader is available and wait for it to complete
        if (window.portfolioDataLoader) {
            console.log('Waiting for portfolio data to load...');
            // The data loader initializes automatically, so we just wait a bit more
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    } catch (error) {
        console.log('Proceeding without API data:', error);
    }
    
    // Initialize all functionality after data is loaded
    initSmoothScrolling();
    initNavbarScrollEffect();
    initAnimationsOnScroll();
    initSkillBars();
    initContactForm();
    // initTypingEffect(); // Disabled to prevent HTML tag display issues
    initParticleBackground();
    initVisitorTracking();
    initVisitorCounter();
    
    console.log('Portfolio JavaScript initialization complete');
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
                // Store visitor information for future tracking
                try {
                    const nameField = contactForm.querySelector('[name="name"]');
                    const emailField = contactForm.querySelector('[name="email"]');
                    
                    if (nameField && nameField.value.trim()) {
                        localStorage.setItem('visitorName', nameField.value.trim());
                    }
                    if (emailField && emailField.value.trim()) {
                        localStorage.setItem('visitorEmail', emailField.value.trim());
                    }
                } catch (error) {
                    console.log('Could not store visitor information');
                }
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Check if we're on GitHub Pages or local server
                const isGitHubPages = window.location.hostname.includes('github.io');
                
                if (isGitHubPages) {
                    // GitHub Pages - use mailto fallback
                    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
                    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
                    const mailtoLink = `mailto:selatarpit@gmail.com?subject=${subject}&body=${body}`;
                    
                    // Open mailto link
                    window.location.href = mailtoLink;
                    
                    // Show success message
                    showNotification('Your email client will open to send the message. If it doesn\'t open automatically, please email me directly at selatarpit@gmail.com', 'success');
                    contactForm.reset();
                    
                    // Restore button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                } else {
                    // Local server - use API endpoint
                    fetch('/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams(formData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showNotification(data.message, 'success');
                            contactForm.reset();
                        } else {
                            showNotification(data.message, 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showNotification('Failed to send message. Please try again or contact directly at arpitselat@gmail.com', 'error');
                    })
                    .finally(() => {
                        // Restore button state
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
                }
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

// Visitor tracking functionality
async function initVisitorTracking() {
    try {
        // Get visitor information
        const visitorInfo = await getVisitorInfo();
        
        // Send visitor data to server (only for local server)
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (!isGitHubPages) {
            // Local server - send visitor notification
            await sendVisitorNotification(visitorInfo);
        } else {
            // GitHub Pages - log visitor info (optional)
            console.log('Visitor tracked:', visitorInfo);
        }
        
    } catch (error) {
        console.log('Visitor tracking error:', error);
    }
}

// Get visitor information
async function getVisitorInfo() {
    const visitorData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth
        },
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        referrer: document.referrer || 'Direct visit',
        url: window.location.href,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookiesEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine
    };

    // Try to get stored visitor information from previous form submissions
    try {
        const storedVisitorName = localStorage.getItem('visitorName');
        const storedVisitorEmail = localStorage.getItem('visitorEmail');
        
        if (storedVisitorName) {
            visitorData.visitorName = storedVisitorName;
        }
        if (storedVisitorEmail) {
            visitorData.visitorEmail = storedVisitorEmail;
        }
    } catch (error) {
        console.log('Could not access localStorage');
    }

    // Try to get location info (optional)
    try {
        const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();
        
        visitorData.location = {
            ip: locationData.ip,
            city: locationData.city,
            region: locationData.region,
            country: locationData.country_name,
            countryCode: locationData.country_code,
            timezone: locationData.timezone,
            isp: locationData.org
        };
    } catch (error) {
        console.log('Could not get location data:', error);
        visitorData.location = {
            ip: 'Unknown',
            city: 'Unknown',
            country: 'Unknown'
        };
    }

    return visitorData;
}

// Send visitor notification to server
async function sendVisitorNotification(visitorInfo) {
    try {
        const response = await fetch('/track-visitor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorInfo)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Visitor tracked successfully');
            
            // Update visitor counter with new count
            if (result.totalVisitors) {
                updateVisitorCounter(result.totalVisitors);
            }
        }
    } catch (error) {
        console.log('Failed to track visitor:', error);
    }
}

// Initialize and update visitor counter
async function initVisitorCounter() {
    try {
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (!isGitHubPages) {
            // Get visitor count from server
            const response = await fetch('/visitor-count');
            const data = await response.json();
            
            if (data.success) {
                updateVisitorCounter(data.count);
            }
        } else {
            // For GitHub Pages, show a placeholder or hide the counter
            const visitorElement = document.getElementById('visitor-count');
            if (visitorElement) {
                visitorElement.textContent = '🌐';
                visitorElement.nextElementSibling.textContent = 'Online Portfolio';
            }
        }
    } catch (error) {
        console.log('Failed to load visitor count:', error);
    }
}

// Update visitor counter with animation
function updateVisitorCounter(count) {
    const visitorElement = document.getElementById('visitor-count');
    if (visitorElement) {
        // Animate the counter
        const startCount = parseInt(visitorElement.textContent) || 0;
        const endCount = parseInt(count);
        
        if (startCount !== endCount) {
            animateCounterValue(visitorElement, startCount, endCount, 1000);
        }
    }
}

// Animate counter value
function animateCounterValue(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(start + (difference * progress));
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}
