/**
 * ============================================================
 * EXPLORE MATHS PORTFOLIO - INTERACTIVE SCRIPTS
 * Premium animations, scroll effects, and micro-interactions
 * ============================================================
 */

// ============================================
// DOM READY INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initParticleSystem();
    initTypewriter();
    initScrollReveal();
    initNavbar();
    initSkillBars();
    initTimelineProgress();
    initTiltCards();
    initBackToTop();
    initCopyToClipboard();
    initMobileMenu();
    initParallaxEffects();
    initSmoothScroll();
    initCounters();
    initGlareEffect();
    initTitleAnimations();
    fetchGitHubRepos();
    fetchGitHubStats();
    fetchGitHubLanguages();
    fetchGitHubContributions();
    initMagneticButtons();
    initScrollLinkedAnimations();
    initLiquidDistortion();
    initSectionNumbers();
    initYear();
});

// ============================================
// CUSTOM CURSOR WITH MAGNETIC EFFECT
// ============================================
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    const trail = document.querySelector('.cursor-trail');
    
    if (!dot || !outline || window.matchMedia('(pointer: coarse)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Magnetic effect for links and buttons
    const magneticElements = document.querySelectorAll('.magnetic-link, .magnetic-btn');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
        
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
    
    function animateCursor() {
        // Smooth interpolation for dot
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        
        // Slower interpolation for outline
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        // Even slower for trail
        trailX += (mouseX - trailX) * 0.05;
        trailY += (mouseY - trailY) * 0.05;
        
        dot.style.left = `${dotX - 4}px`;
        dot.style.top = `${dotY - 4}px`;
        
        outline.style.left = `${outlineX - 20}px`;
        outline.style.top = `${outlineY - 20}px`;
        
        trail.style.left = `${trailX - 3}px`;
        trail.style.top = `${trailY - 3}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ============================================
// PARTICLE SYSTEM FOR HERO BACKGROUND
// ============================================
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isActive = true;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '124, 58, 237' : '192, 132, 252';
            this.life = Math.random() * 100 + 100;
            this.maxLife = this.life;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            
            // Fade in and out
            if (this.life > this.maxLife * 0.8) {
                this.opacity += 0.005;
            } else if (this.life < this.maxLife * 0.2) {
                this.opacity -= 0.005;
            }
            
            this.opacity = Math.max(0, Math.min(0.6, this.opacity));
            
            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
            
            // Glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 0.2})`;
            ctx.fill();
        }
    }
    
    // Initialize particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            
            // Connect to mouse
            const dx = particles[i].x - mouseX;
            const dy = particles[i].y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.2;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                
                // Gentle repulsion
                const force = (150 - distance) / 150;
                particles[i].speedX += (dx / distance) * force * 0.02;
                particles[i].speedY += (dy / distance) * force * 0.02;
            }
        }
    }
    
    function animate() {
        if (!isActive) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pause when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isActive = entry.isIntersecting;
            if (isActive) animate();
            else cancelAnimationFrame(animationId);
        });
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;
    
    const phrases = [
        'Building things with Python...',
        'Crafting beautiful UIs...',
        'Solving real problems...',
        'Learning every day...',
        'Exploring new technologies...'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1500);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
    
    // Special handling for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const isRight = item.classList.contains('right');
        item.style.setProperty('--slide-x', isRight ? '50px' : '-50px');
    });
}

// ============================================
// NAVBAR BEHAVIOR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Hamburger menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillGlows = document.querySelectorAll('.skill-glow');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || '0';
                
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // Also animate glow
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const glow = entry.target;
                const sibling = glow.previousElementSibling;
                if (sibling) {
                    const width = sibling.dataset.width || '0';
                    setTimeout(() => {
                        glow.style.width = `${width}%`;
                    }, 200);
                }
                glowObserver.unobserve(glow);
            }
        });
    }, { threshold: 0.5 });
    
    skillGlows.forEach(glow => glowObserver.observe(glow));
}

// ============================================
// TIMELINE PROGRESS ANIMATION
// ============================================
function initTimelineProgress() {
    const timeline = document.querySelector('.timeline');
    const progress = document.querySelector('.timeline-progress');
    
    if (!timeline || !progress) return;
    
    function updateTimelineProgress() {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
            const progressPercent = (visibleHeight / rect.height) * 100;
            progress.style.height = `${Math.min(100, Math.max(0, progressPercent * 1.5))}%`;
        }
    }
    
    window.addEventListener('scroll', updateTimelineProgress);
    updateTimelineProgress();
}

// ============================================
// GITHUB LANGUAGES (REAL DATA)
// ============================================
async function fetchGitHubLanguages() {
    const username = 'ExploreMaths';
    const container = document.getElementById('languageBars');
    if (!container) return;
    
    try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const repos = await reposRes.json();
        
        // Exclude forks for accurate language stats
        const ownRepos = repos.filter(r => !r.fork);
        
        const langBytes = {};
        await Promise.all(ownRepos.map(async (repo) => {
            const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`);
            if (!res.ok) return;
            const languages = await res.json();
            for (const [lang, bytes] of Object.entries(languages)) {
                langBytes[lang] = (langBytes[lang] || 0) + bytes;
            }
        }));
        
        const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
        if (total === 0) throw new Error('No language data');
        
        const sorted = Object.entries(langBytes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        const languages = sorted.map(([lang, bytes]) => ({
            name: lang,
            percent: Math.round((bytes / total) * 100)
        }));
        
        renderLanguages(languages);
    } catch (error) {
        console.error('GitHub languages fetch error:', error);
        if (container) container.innerHTML = '<p class="lang-error">Unable to load languages.</p>';
    }
}

function renderLanguages(languages) {
    const container = document.getElementById('languageBars');
    if (!container) return;
    
    const colorMap = {
        'Python': '#7c3aed',
        'JavaScript': '#f59e0b',
        'TypeScript': '#60a5fa',
        'HTML': '#ef4444',
        'CSS': '#3b82f6',
        'Jupyter Notebook': '#f37626',
        'C++': '#6366f1',
        'C': '#a78bfa',
        'C#': '#a78bfa',
        'Java': '#f97316',
        'Go': '#22d3ee',
        'Rust': '#f87171',
        'Shell': '#4ade80',
        'Ruby': '#e11d48',
        'PHP': '#6366f1',
        'Swift': '#f97316',
        'Kotlin': '#a78bfa',
        'Dart': '#22d3ee',
        'Vue': '#22c55e',
        'SCSS': '#e11d48',
        'Sass': '#e11d48',
        'Less': '#3b82f6',
        'R': '#6366f1',
        'Scala': '#e11d48',
        'Elixir': '#a78bfa',
        'Haskell': '#6366f1',
        'Lua': '#3b82f6',
        'Perl': '#22d3ee',
        'Objective-C': '#6366f1',
        'MATLAB': '#ef4444',
        'Groovy': '#22c55e'
    };
    
    container.innerHTML = languages.map(lang => {
        const color = colorMap[lang.name] || '#a78bfa';
        return `
            <div class="lang-bar-item">
                <span class="lang-name">${lang.name}</span>
                <div class="lang-bar">
                    <div class="lang-progress" data-width="${lang.percent}" style="width:0%;background: linear-gradient(90deg, ${color}, ${color}dd);"></div>
                </div>
                <span class="lang-percent">${lang.percent}%</span>
            </div>
        `;
    }).join('');
    
    // Trigger bar animations
    const langBars = container.querySelectorAll('.lang-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || '0';
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 300);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    langBars.forEach(bar => observer.observe(bar));
}

// ============================================
// 3D TILT CARDS
// ============================================
function initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function initCopyToClipboard() {
    const copyElements = document.querySelectorAll('.copy-text');
    
    copyElements.forEach(el => {
        el.addEventListener('click', async () => {
            const text = el.dataset.copy;
            if (!text) return;
            
            try {
                await navigator.clipboard.writeText(text);
                el.classList.add('copied');
                const originalHTML = el.innerHTML;
                el.innerHTML = `Copied! <i class="fas fa-check"></i>`;
                
                setTimeout(() => {
                    el.classList.remove('copied');
                    el.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.morphing-shape, .section-bg-text');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                
                parallaxElements.forEach((el, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrollY * speed;
                    el.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(counter, target) {
    if (counter.dataset.animated === 'true') return;
    counter.dataset.animated = 'true';
    
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out expo
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        
        counter.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString() + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target) || 0;
                
                // Skip if no real data yet (still showing '...')
                if (target === 0 && counter.textContent.trim() === '...') return;
                
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// GLARE EFFECT ON CARDS
// ============================================
function initGlareEffect() {
    const cards = document.querySelectorAll('.interest-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// ============================================
// HERO ENTRANCE ANIMATIONS
// ============================================
function initTitleAnimations() {
    // Smooth title slide-in reveal
    const titles = document.querySelectorAll('.section-title[data-reveal="title-slide"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    titles.forEach(title => observer.observe(title));
}

// ============================================
// GITHUB REPOSITORIES FETCH & RENDER
// ============================================
// GITHUB STATS (REAL DATA)
// ============================================
async function fetchGitHubStats() {
    const username = 'ExploreMaths';
    const statsError = document.getElementById('statsError');
    const reloadBtn = document.getElementById('reloadStatsBtn');
    
    if (statsError) statsError.style.display = 'none';
    
    try {
        // Fetch user profile and repos list (both from GitHub API directly)
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);
        
        if (!userRes.ok || !reposRes.ok) {
            throw new Error('GitHub API returned non-OK status');
        }
        
        const user = await userRes.json();
        const repos = await reposRes.json();
        
        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
        
        // Update all stats
        updateStatTarget('Repositories', user.public_repos);
        updateStatTarget('Stars Earned', totalStars);
        updateStatTarget('Forks', totalForks);
        updateStatTarget('Followers', user.followers);
        
    } catch (error) {
        console.error('GitHub stats fetch error:', error);
        if (statsError) statsError.style.display = 'block';
    }
    
    if (reloadBtn) {
        reloadBtn.replaceWith(reloadBtn.cloneNode(true));
        const newReloadBtn = document.getElementById('reloadStatsBtn');
        if (newReloadBtn) {
            newReloadBtn.addEventListener('click', fetchGitHubStats);
        }
    }
}

function updateStatTarget(label, value) {
    const labels = document.querySelectorAll('.stat-label');
    labels.forEach(el => {
        if (el.textContent.trim() === label) {
            const numberEl = el.previousElementSibling;
            if (numberEl && numberEl.classList.contains('stat-number')) {
                numberEl.dataset.target = value;
                
                // If already in viewport, trigger animation immediately
                const rect = numberEl.getBoundingClientRect();
                const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (inViewport) {
                    animateCounter(numberEl, value);
                }
            }
        }
    });
}

async function fetchGitHubRepos() {
    const grid = document.getElementById('projectsGrid');
    let loading = document.getElementById('projectLoading');
    
    if (!grid) return;
    
    // Restore loading state when reloading
    if (!loading) {
        loading = document.createElement('div');
        loading.className = 'project-loading';
        loading.id = 'projectLoading';
        grid.insertBefore(loading, grid.firstChild);
    }
    loading.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading repositories...</p>
    `;
    
    // List of pinned repositories (owner/repo-name)
    // Add or remove entries here to match your GitHub profile pinned repos
    const pinnedRepos = [
        'ExploreMaths/CodeVideoRenderer',
        'ExploreMaths/NetLabX',
        'ExploreMaths/termgrid',
        'ExploreMaths/LaTeXCalculator',
    ];
    
    try {
        const repoPromises = pinnedRepos.map(repo => 
            fetch(`https://api.github.com/repos/${repo}`).then(r => {
                if (!r.ok) throw new Error(`Failed to fetch ${repo}`);
                return r.json();
            })
        );
        
        const repos = await Promise.all(repoPromises);
        
        if (loading) loading.remove();
        
        renderRepos(repos);
    } catch (error) {
        console.error('GitHub API error:', error);
        if (loading) {
            loading.innerHTML = `
                <div style="text-align:center;">
                    <p>Unable to load repositories.</p>
                    <button id="reloadProjectsBtn" class="reload-btn" style="margin-top:1rem;padding:0.7rem 1.5rem;background:linear-gradient(135deg,#7c3aed,#c084fc);color:#fff;border:none;border-radius:50px;cursor:pointer;font-family:inherit;font-size:0.85rem;font-weight:600;transition:transform 0.3s ease,box-shadow 0.3s ease;">Reload</button>
                </div>
            `;
            const reloadBtn = document.getElementById('reloadProjectsBtn');
            if (reloadBtn) {
                reloadBtn.addEventListener('click', fetchGitHubRepos);
                reloadBtn.addEventListener('mouseenter', () => {
                    reloadBtn.style.transform = 'translateY(-2px)';
                    reloadBtn.style.boxShadow = '0 8px 25px rgba(124,58,237,0.4)';
                });
                reloadBtn.addEventListener('mouseleave', () => {
                    reloadBtn.style.transform = 'translateY(0)';
                    reloadBtn.style.boxShadow = 'none';
                });
            }
        }
    }
}

function renderRepos(repos) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    const languageColors = {
        'Python': '#7c3aed',
        'JavaScript': '#f59e0b',
        'HTML': '#ef4444',
        'CSS': '#3b82f6',
        'TypeScript': '#60a5fa',
        'C++': '#6366f1',
        'C': '#a78bfa',
        'Java': '#f97316',
        'Go': '#22d3ee',
        'Rust': '#f87171',
        'Shell': '#4ade80'
    };
    
    repos.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-reveal', 'perspective-tilt');
        card.setAttribute('data-delay', (index * 150).toString());
        
        const langColor = languageColors[repo.language] || '#a78bfa';
        const langTag = repo.language ? `<span class="tech-tag" style="border-color:${langColor};color:${langColor}">${repo.language}</span>` : '';
        
        const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="project-image">
                        <img class="project-img" data-src="https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}" alt="${escapeHtml(repo.name)}" style="display:none;">
                        <div class="project-placeholder" style="background: linear-gradient(135deg, ${langColor}15, ${langColor}08);">
                            <i class="fab fa-github" style="color:${langColor}"></i>
                        </div>
                        <div class="project-overlay">
                            <span class="view-project">View Project</span>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${escapeHtml(repo.name)}</h3>
                        <p class="project-desc">${escapeHtml(repo.description || 'No description provided.')}</p>
                        <div class="project-tech">
                            ${langTag}
                            <span class="tech-tag"><i class="fas fa-star" style="font-size:0.7em;margin-right:4px;"></i>${repo.stargazers_count}</span>
                            <span class="tech-tag"><i class="fas fa-code-branch" style="font-size:0.7em;margin-right:4px;"></i>${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
                <div class="card-back">
                    <div class="back-content">
                        <h3>${escapeHtml(repo.name)}</h3>
                        <p>${escapeHtml(repo.description || 'No description provided.')}</p>
                        <div class="back-meta">
                            <span class="back-meta-date">Updated: ${updatedDate}</span>
                        </div>
                        <div class="back-links">
                            <a href="${repo.html_url}" target="_blank" class="back-link">
                                <i class="fab fa-github"></i> GitHub
                            </a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="back-link"><i class="fas fa-external-link-alt"></i> Website</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
        
        // Try to load social preview image
        const img = card.querySelector('.project-img');
        if (img) {
            const actualSrc = img.dataset.src;
            const testImg = new Image();
            testImg.onload = () => {
                img.src = actualSrc;
                img.style.display = 'block';
                const placeholder = card.querySelector('.project-placeholder');
                if (placeholder) placeholder.style.display = 'none';
            };
            testImg.onerror = () => {
                // Keep placeholder visible
            };
            testImg.src = actualSrc;
        }
    });
    
    // Re-initialize scroll reveal for newly added cards
    initScrollReveal();
    initTiltCards();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// SCROLL-LINKED POSITION ANIMATIONS
// ============================================
function initScrollLinkedAnimations() {
    const scrollLinkedElements = document.querySelectorAll('[data-scroll-link]');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = scrollY / docHeight;
                
                scrollLinkedElements.forEach(el => {
                    const range = parseFloat(el.dataset.scrollRange) || 100;
                    const axis = el.dataset.scrollAxis || 'y';
                    const offset = scrollPercent * range;
                    
                    if (axis === 'y') {
                        el.style.transform = `translateY(${offset}px)`;
                    } else if (axis === 'x') {
                        el.style.transform = `translateX(${offset}px)`;
                    } else if (axis === 'rotate') {
                        el.style.transform = `rotate(${offset}deg)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ============================================
// LIQUID DISTORTION EFFECT (CSS-based)
// ============================================
function initLiquidDistortion() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    hero.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const shapes = hero.querySelectorAll('.morphing-shape');
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 0.5;
            shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
        });
    });
}

// ============================================
// SECTION NUMBER ANIMATIONS
// ============================================
function initSectionNumbers() {
    const numbers = document.querySelectorAll('.section-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(num => observer.observe(num));
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ============================================
// ROTATION & SCALE CASCADING EFFECTS
// ============================================
function initCascadeEffects() {
    const cascadeElements = document.querySelectorAll('[data-cascade]');
    
    cascadeElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 100}ms`;
    });
}

// ============================================
// BLUR TO CLEAR EFFECT TRIGGER
// ============================================
function initBlurReveal() {
    const blurElements = document.querySelectorAll('[data-reveal="blur"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    blurElements.forEach(el => observer.observe(el));
}

// ============================================
// SCROLL-TRIGGERED LINE ANIMATIONS
// ============================================
function initLineAnimations() {
    const lines = document.querySelectorAll('.section-line');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '80px';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    lines.forEach(line => observer.observe(line));
}

// ============================================
// PROJECT CARD HOVER ZOOM
// ============================================
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-placeholder');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// ============================================
// SVG PATH DRAWING ANIMATIONS
// ============================================
function initSvgAnimations() {
    const svgPaths = document.querySelectorAll('.draw-line');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const path = entry.target;
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.animation = 'drawLine 3s ease forwards';
                observer.unobserve(path);
            }
        });
    }, { threshold: 0.3 });
    
    svgPaths.forEach(path => observer.observe(path));
}

// ============================================
// TEXT SCRAMBLE EFFECT FOR TITLES
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.textContent;
    }
    
    scramble() {
        const length = this.originalText.length;
        let iteration = 0;
        
        const interval = setInterval(() => {
            this.el.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iteration >= length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
}

// Apply scramble effect to section titles on hover
function initScrambleEffect() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        const scrambler = new TextScramble(title);
        
        title.addEventListener('mouseenter', () => {
            scrambler.scramble();
        });
    });
}

// ============================================
// STAGGERED LIST REVEAL
// ============================================
function initStaggeredReveal() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    staggerContainers.forEach(container => {
        const children = container.children;
        const baseDelay = parseInt(container.dataset.stagger) || 100;
        
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * baseDelay}ms`;
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(entry.target.children).forEach(child => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(container);
    });
}

// ============================================
// MASK TRANSITION EFFECTS
// ============================================
function initMaskTransitions() {
    const maskedElements = document.querySelectorAll('[data-mask]');
    
    maskedElements.forEach(el => {
        const direction = el.dataset.mask || 'left';
        el.style.clipPath = {
            'left': 'inset(0 100% 0 0)',
            'right': 'inset(0 0 0 100%)',
            'top': 'inset(100% 0 0 0)',
            'bottom': 'inset(0 0 100% 0)',
            'circle': 'circle(0% at 50% 50%)',
            'diamond': 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
        }[direction] || 'inset(0 100% 0 0)';
        
        el.style.transition = 'clip-path 1s cubic-bezier(0.16, 1, 0.3, 1)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.clipPath = {
                            'left': 'inset(0 0 0 0)',
                            'right': 'inset(0 0 0 0)',
                            'top': 'inset(0 0 0 0)',
                            'bottom': 'inset(0 0 0 0)',
                            'circle': 'circle(100% at 50% 50%)',
                            'diamond': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                        }[direction] || 'inset(0 0 0 0)';
                    }, parseInt(el.dataset.delay) || 0);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(el);
    });
}

// ============================================
// FLOATING MOTION VARIATIONS
// ============================================
function initFloatingMotion() {
    const floatElements = document.querySelectorAll('[data-float-speed]');
    
    floatElements.forEach(el => {
        const speed = parseFloat(el.dataset.floatSpeed) || 1;
        const amplitude = parseFloat(el.dataset.floatAmplitude) || 15;
        const phase = Math.random() * Math.PI * 2;
        
        function animate(time) {
            const y = Math.sin(time * 0.001 * speed + phase) * amplitude;
            const rotate = Math.sin(time * 0.0005 * speed + phase) * 2;
            el.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    });
}

// ============================================
// PERSPECTIVE SCROLL EFFECTS
// ============================================
function initPerspectiveScroll() {
    const perspectiveSections = document.querySelectorAll('[data-perspective]');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const windowHeight = window.innerHeight;
                
                perspectiveSections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const progress = 1 - (rect.top / windowHeight);
                    
                    if (progress > 0 && progress < 2) {
                        const rotateX = (progress - 0.5) * 10;
                        const scale = 1 - Math.abs(progress - 0.5) * 0.1;
                        section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${scale})`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-btn, .social-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleExpand 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleExpand {
            to { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// INTERSECTION OBSERVER HELPER
// ============================================
function observeElements(selector, callback, options = {}) {
    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { ...defaultOptions, ...options });
    
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// ============================================
// PERFORMANCE: PAUSE ANIMATIONS WHEN HIDDEN
// ============================================
document.addEventListener('visibilitychange', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        canvas.style.display = document.hidden ? 'none' : 'block';
    }
});

// ============================================
// LAZY LOAD IMAGES (if any added later)
// ============================================
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// SMOOTH REVEAL FOR ALL SECTIONS
// ============================================
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    
    sections.forEach(section => observer.observe(section));
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// ERROR HANDLING & FALLBACKS
// ============================================
window.addEventListener('error', (e) => {
    console.warn('Portfolio script error:', e.message);
});

// Fallback for browsers without IntersectionObserver
if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('visible');
    });
}

// ============================================
// INITIALIZE ALL ADDITIONAL EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCascadeEffects();
    initBlurReveal();
    initLineAnimations();
    initProjectCardEffects();
    initSvgAnimations();
    initScrambleEffect();
    initStaggeredReveal();
    initMaskTransitions();
    initFloatingMotion();
    initPerspectiveScroll();
    initRippleEffect();
    initLazyLoad();
    initSectionReveal();
    
    // Language bar animations are now handled dynamically by renderLanguages()
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c Explore Maths ', 'background: linear-gradient(135deg, #7c3aed, #c084fc); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Welcome to my portfolio! ', 'color: #a78bfa; font-size: 14px;');
console.log('%c Built with passion, Python, and vanilla JS. ', 'color: #6a6a7a; font-size: 12px;');
