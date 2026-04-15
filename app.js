// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon
        const icon = hamburger.querySelector('i');
        if(icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Scroll Reveal Animation (Intersection Observer - Fail Proof)
document.addEventListener('DOMContentLoaded', () => {
    // Fallback static reveal if observer fails
    setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal, .reveal-up');
        reveals.forEach((el, index) => {
            // Apply delay to hero items, but immediately show if scrolled to
            if(el.closest('.hero')) {
                setTimeout(() => { el.classList.add('active'); }, index * 150);
            }
        });
    }, 100);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal, .reveal-up');
    elementsToReveal.forEach(el => {
        observer.observe(el);
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((currentPage === '' || currentPage === 'index.html') && (linkHref === 'index.html' || linkHref === '/')) {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage.includes('fleet/') && linkHref.includes('fleet.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;

    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        if (themeBtn) {
            themeBtn.innerHTML = currentTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = htmlElement.getAttribute('data-theme');
            const toggleTo = current === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', toggleTo);
            localStorage.setItem('theme', toggleTo);
            
            themeBtn.innerHTML = toggleTo === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
    }
});
