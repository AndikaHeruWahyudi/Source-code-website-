// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Device Detection & Adaptation
function detectDevice() {
    const deviceInfo = document.getElementById('deviceInfo');
    const width = window.innerWidth;
    let deviceType = '';
    let orientation = width > window.innerHeight ? 'Landscape' : 'Portrait';
    
    if (width < 769) {
        deviceType = 'Mobile';
    } else if (width >= 769 && width < 1025) {
        deviceType = 'Tablet';
    } else {
        deviceType = 'Desktop';
    }
    
    // Display device information
    deviceInfo.textContent = `${deviceType} | ${orientation} | ${width}px`;
    
    // Apply device-specific classes to body for additional styling if needed
    document.body.className = '';
    document.body.classList.add(deviceType.toLowerCase());
    document.body.classList.add(orientation.toLowerCase());
    
    // Additional device-specific adaptations
    if (deviceType === 'Mobile' && orientation === 'Landscape') {
        // Special adjustments for mobile landscape
        document.querySelector('.hero h1').style.fontSize = '2rem';
    } else {
        // Reset to default if not mobile landscape
        document.querySelector('.hero h1').style.fontSize = '';
    }
}

// Initialize device detection
detectDevice();

// Update on resize and orientation change
window.addEventListener('resize', detectDevice);
window.addEventListener('orientationchange', detectDevice);

// Performance optimization for resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(detectDevice, 250);
});

// Touch device detection for hover effects
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Adjust hover effects for touch devices
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.width = level + '%';
    });
}

// Initialize skill bars animation when page loads
window.addEventListener('load', animateSkillBars);

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name') || document.querySelector('input[type="text"]').value;
    const email = formData.get('email') || document.querySelector('input[type="email"]').value;
    const subject = formData.get('subject') || document.querySelectorAll('input[type="text"]')[1].value;
    const message = formData.get('message') || document.querySelector('textarea').value;
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan membalas ke ${email} segera.`);
    
    // Reset form
    this.reset();
});

// Add scroll animation for elements
function checkScroll() {
    const elements = document.querySelectorAll('.skill-category, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// Initialize elements with fade-in effect
document.querySelectorAll('.skill-category, .project-card').forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

// Check scroll position on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});