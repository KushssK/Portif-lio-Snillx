document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initTypewriter();
    initParallax();
    initMobileMenu();
    initCardHoverEffects();
    showLoading();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        let current = '';
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.clientHeight) {
                current = sec.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => link.style.transform = 'translateY(-2px)');
        link.addEventListener('mouseleave', () => link.style.transform = 'translateY(0)');
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
                }
            }
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .timeline-item, .cert-card, .skill-card, .achievement-card, .contact-link');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
}

function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i++);
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.style.borderRight = '2px solid var(--accent-color)';
            setTimeout(() => heroTitle.style.borderRight = 'none', 1000);
        }
    }
    setTimeout(typeWriter, 500);
}

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
    });
}

function initMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768 || !navContainer || !navLinks) return;
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-menu-btn';
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileBtn.style.cssText = 'background:none;border:none;font-size:20px;color:var(--text-color);cursor:pointer;padding:8px;';
    navContainer.appendChild(mobileBtn);
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    navLinks.addEventListener('click', e => {
        if (e.target.classList.contains('nav-link')) {
            navLinks.classList.remove('mobile-active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
    const mobileStyles = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: #121212;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            .nav-links.mobile-active { transform: translateY(0); }
            .nav-link { padding: 12px 0; border-bottom: 1px solid var(--border-color); }
            .nav-link:last-child { border-bottom: none; }
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileStyles;
    document.head.appendChild(styleSheet);
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .timeline-item, .cert-card, .skill-card, .achievement-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Loading...</p></div>`;
    loader.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,18,18,0.9);display:flex;align-items:center;justify-content:center;z-index:10000;';
    document.body.appendChild(loader);
    window.addEventListener('load', () => setTimeout(() => loader.remove(), 1000));
    const loadingStyles = `.loading-spinner{text-align:center}.spinner{width:40px;height:40px;border:4px solid #333;border-top:4px solid var(--accent-color);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 16px}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
}
