document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initParallax();
    initDrawerMenu();
    initCardHoverEffects();
    showLoading();
    const heroNames = ["Nilson", "Snillx"];
    const heroName = document.getElementById("hero-name");
    if (heroName) {
        heroName.textContent = "";
        loopTyping(heroName, heroNames, 0, 150, 1000);
    }
    const headerNames = ["Nilson", "Snillx"];
    const headerName = document.getElementById("header-name");
    if (headerName) {
        headerName.textContent = "";
        loopTyping(headerName, headerNames, 0, 100, 800);
    }
});
function loopTyping(element, namesArray, index, typingSpeed, pauseTime) {
    const name = namesArray[index];
    let i = 0;
    function type() {
        if (i < name.length) {
            element.textContent += name.charAt(i++);
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, pauseTime);
        }
    }
    function erase() {
        let text = element.textContent;
        let j = text.length;
        function removing() {
            if (j > 0) {
                element.textContent = text.substring(0, j - 1);
                j--;
                setTimeout(removing, typingSpeed / 2);
            } else {
                loopTyping(element, namesArray, (index + 1) % namesArray.length, typingSpeed, pauseTime);
            }
        }
        removing();
    }
    type();
}
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
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
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => link.style.transform = 'translateY(-2px)');
        link.addEventListener('mouseleave', () => link.style.transform = 'translateY(0)');
    });
}
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
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
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
}
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
    });
}
function initDrawerMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const drawer = document.querySelector('.nav-drawer');
    const overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);
    const closeBtn = document.querySelector('.drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    toggle.addEventListener('click', () => {
        drawer.classList.toggle('open');
        overlay.classList.toggle('open');
        toggle.classList.toggle('active');
    });
    closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        toggle.classList.remove('active');
    });
    overlay.addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        toggle.classList.remove('active');
    });
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            drawerLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            setTimeout(() => {
                drawer.classList.remove('open');
                overlay.classList.remove('open');
                toggle.classList.remove('active');
            }, 200);
        });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            toggle.classList.remove('active');
        }
    });
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