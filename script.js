// ==================== ЗВЁЗДЫ ====================

function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    const starCount = 200;
    const colors = [
        null, null, null, null, null, null, // белые (чаще)
        '#6c63ff', '#6c63ff',
        '#00d4ff',
        '#ff6b9d',
        '#9b59b6'
    ];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const fromOpacity = Math.random() * 0.3 + 0.1;
        const toOpacity = Math.random() * 0.5 + 0.5;

        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            --duration: ${duration}s;
            --delay: ${delay}s;
            --from-opacity: ${fromOpacity};
            --to-opacity: ${toOpacity};
        `;

        const color = colors[Math.floor(Math.random() * colors.length)];
        if (color) {
            star.classList.add('colored');
            star.style.background = color;
            star.style.setProperty('--color', color);
        }

        container.appendChild(star);
    }
}

// ==================== CURSOR GLOW ====================

function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ==================== NAVBAR SCROLL ====================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== SMOOTH SCROLL ====================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== COUNTER ANIMATION ====================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (!target) return;
                
                let current = 0;
                const increment = target / 80;
                const duration = 2000;
                const stepTime = duration / 80;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (target >= 1000) {
                        entry.target.textContent = Math.floor(current).toLocaleString() + '+';
                    } else {
                        entry.target.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
                    }
                }, stepTime);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==================== STAT BARS ====================

function animateStatBars() {
    const bars = document.querySelectorAll('.stat-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

// ==================== AOS (Animate On Scroll) ====================

function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ==================== FAQ ====================

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Закрыть все
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Если не был активен — открыть
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ==================== MOBILE TOGGLE ====================

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    if (!toggle) return;
    const navLinks = document.querySelector('.nav-links');
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        // Здесь можно добавить логику открытия мобильного меню
        navLinks?.classList.toggle('show');
    });
}

// ==================== TYPING EFFECT (Preview) ====================

function initTypingEffect() {
    const cursor = document.querySelector('.code-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
}

// ==================== PARALLAX (subtle) ====================

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        document.querySelectorAll('.nebula').forEach((nebula, i) => {
            const speed = 0.02 + (i * 0.01);
            nebula.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ==================== ЗАГРУЗКА СПИСКА ИГР ====================

function loadGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    const loadingSpan = document.getElementById('gamesLoading');
    
    if (!gamesGrid) return;

    fetch('https://raw.githubusercontent.com/samuraa1/Solara-Hub/refs/heads/main/Games', { cache: "no-store" })
        .then(res => {
            if (!res.ok) throw new Error('Network error');
            return res.text();
        })
        .then(data => {
            const games = data.split('\n').map(line => line.trim()).filter(name => name.length > 0);
            if (loadingSpan) loadingSpan.style.display = 'none';
            
            if (games.length === 0) {
                gamesGrid.innerHTML = '<div style="color:gray">Games list is empty</div>';
                return;
            }
            
            // Показываем первые 100 игр (или все, если меньше)
            games.slice(0, 100).forEach(game => {
                const tag = document.createElement('span');
                tag.className = 'game-tag';
                tag.textContent = game;
                gamesGrid.appendChild(tag);
            });
            
            if (games.length > 100) {
                const more = document.createElement('span');
                more.className = 'game-tag';
                more.textContent = `and ${games.length - 100} more...`;
                gamesGrid.appendChild(more);
            }
        })
        .catch(err => {
            if (loadingSpan) loadingSpan.textContent = 'Could not load game list, but we support 450+ games!';
            console.warn(err);
            // Заглушка
            const fallback = ['Adopt Me!', 'Brookhaven', 'Tower of Hell', 'Jailbreak', 'Blox Fruits', 'Pet Simulator X', 'Arsenal', 'MM2', 'Phantom Forces', 'Doors'];
            fallback.forEach(g => {
                const tag = document.createElement('span');
                tag.className = 'game-tag';
                tag.textContent = g;
                gamesGrid.appendChild(tag);
            });
        });
}

// ==================== КОПИРОВАНИЕ СКРИПТА ====================

function copyScript() {
    const scriptText = "loadstring(game:HttpGet('https://solarahub.space/SH.lua'))()";
    navigator.clipboard.writeText(scriptText).then(() => {
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    });
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initCursorGlow();
    initNavbar();
    initSmoothScroll();
    animateCounters();
    animateStatBars();
    initAOS();
    initMobileMenu();
    initTypingEffect();
    initParallax();
    loadGames(); // загружаем игры

    // Кнопки копирования
    document.getElementById('copyScriptBtn')?.addEventListener('click', copyScript);
    document.getElementById('copyScriptFromHero')?.addEventListener('click', copyScript);
    
    // Trigger AOS для видимых элементов при загрузке
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// ==================== PARALLAX ДЛЯ PREVIEW ОКНА ====================

document.addEventListener('mousemove', (e) => {
    const preview = document.querySelector('.preview-window');
    if (preview) {
        const rect = preview.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        preview.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    }
});
