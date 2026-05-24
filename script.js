// ============================================
//    LOCAL PROBLEM SOLVER - MAIN SCRIPT
// ============================================

// ===== MOBILE NAVBAR TOGGLE =====
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-active');
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
            navbar.style.padding = '12px 80px';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.07)';
            navbar.style.padding = '18px 80px';
        }
    }
});

// ===== SCROLL ANIMATION (Reveal on Scroll) =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.step-card, .problem-card, .stat');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', revealOnScroll);

// ===== TYPING EFFECT FOR HERO =====
function typeWriter() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;

    const words = ['Problems', 'Issues', 'Complaints', 'Concerns'];
    const highlight = heroTitle.querySelector('.highlight');
    if (!highlight) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            highlight.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            highlight.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const speed = isDeleting ? 80 : 120;
        setTimeout(type, speed);
    }

    setTimeout(type, 2000);
}

document.addEventListener('DOMContentLoaded', typeWriter);

// ===== COUNTER ANIMATION (Stats) =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isFloat = finalValue.includes('.');
                const hasPlus = finalValue.includes('+');
                const hasK = finalValue.includes('K');

                let num = parseFloat(finalValue);
                if (hasK) num = num * 1;

                let current = 0;
                const increment = num / 50;
                const duration = 30;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        current = num;
                        clearInterval(timer);
                    }

                    let display = '';
                    if (isFloat) {
                        display = current.toFixed(1);
                    } else {
                        display = Math.floor(current).toString();
                    }
                    if (hasK) display += 'K';
                    if (hasPlus) display += '+';

                    target.textContent = display;
                }, duration);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== PROBLEM CARDS HOVER EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.01)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== BACK TO TOP BUTTON =====
function createBackToTop() {
    const btn = document.createElement('div');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        background: #4f46e5;
        color: white;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s;
        box-shadow: 0 6px 20px rgba(79,70,229,0.4);
        z-index: 999;
    `;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-4px)';
        btn.style.boxShadow = '0 10px 30px rgba(79,70,229,0.5)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 6px 20px rgba(79,70,229,0.4)';
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
}

document.addEventListener('DOMContentLoaded', createBackToTop);

// ===== PARTICLE BACKGROUND (Hero Section) =====
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 3}px;
            height: ${Math.random() * 8 + 3}px;
            background: rgba(79, 70, 229, ${Math.random() * 0.12 + 0.03});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
        `;
        hero.style.position = 'relative';
        hero.appendChild(particle);
    }

    // Add Particle Animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-25px) translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', createParticles);

// ===== HERO CARDS TILT EFFECT =====
function addTiltEffect() {
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', addTiltEffect);

// ===== STEP CARDS CLICK EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
});

// ===== DARK MODE SUPPORT (Optional) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Check saved preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===== LOCAL STORAGE HELPERS =====
const StorageHelper = {
    // Save Problem
    saveProblem(problem) {
        const problems = this.getProblems();
        problem.id = Date.now();
        problem.time = new Date().toLocaleString();
        problem.status = 'open';
        problem.replies = 0;
        problems.unshift(problem);
        localStorage.setItem('problems', JSON.stringify(problems));
        return problem;
    },

    // Get All Problems
    getProblems() {
        return JSON.parse(localStorage.getItem('problems') || '[]');
    },

    // Get Problem by ID
    getProblem(id) {
        return this.getProblems().find(p => p.id === id);
    },

    // Update Problem Status
    updateStatus(id, status) {
        const problems = this.getProblems();
        const problem = problems.find(p => p.id === id);
        if (problem) {
            problem.status = status;
            localStorage.setItem('problems', JSON.stringify(problems));
        }
    },

    // Delete Problem
    deleteProblem(id) {
        const problems = this.getProblems().filter(p => p.id !== id);
        localStorage.setItem('problems', JSON.stringify(problems));
    },

    // Save User
    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Get User
    getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    },

    // Is Logged In
    isLoggedIn() {
        return !!this.getUser().name;
    },

    // Logout
    logout() {
        localStorage.removeItem('user');
    }
};

// ===== NOTIFICATION SYSTEM =====
const NotificationSystem = {
    notifications: [],

    add(type, message) {
        this.notifications.unshift({
            id: Date.now(),
            type,
            message,
            time: new Date().toLocaleString(),
            read: false
        });
        this.save();
        this.updateBadge();
    },

    getAll() {
        return JSON.parse(localStorage.getItem('notifications') || '[]');
    },

    save() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    },

    getUnreadCount() {
        return this.getAll().filter(n => !n.read).length;
    },

    updateBadge() {
        const badges = document.querySelectorAll('.nav-badge');
        const count = this.getUnreadCount();
        badges.forEach(badge => {
            if (badge.closest('.nav-item')?.querySelector('.fa-bell')) {
                badge.textContent = count;
            }
        });
    }
};

// ===== SEARCH FUNCTIONALITY =====
function searchProblems(query) {
    const problems = StorageHelper.getProblems();
    const filtered = problems.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.area?.toLowerCase().includes(query.toLowerCase()) ||
        p.city?.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
}

// ===== RELATIVE TIME =====
function getRelativeTime(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return past.toLocaleDateString();
}

// ===== FORM VALIDATION =====
function validateForm(fields) {
    const errors = [];

    fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (!el) return;

        const value = el.value.trim();

        if (field.required && !value) {
            errors.push(`${field.label} zaroori hai!`);
            el.style.borderColor = '#e53e3e';
            el.style.boxShadow = '0 0 0 4px rgba(229,62,62,0.08)';
        } else {
            el.style.borderColor = '#e2e8f0';
            el.style.boxShadow = 'none';
        }

        if (field.minLength && value.length < field.minLength) {
            errors.push(`${field.label} kam se kam ${field.minLength} characters ka hona chahiye`);
        }

        if (field.type === 'email' && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Valid email address daalo');
        }

        if (field.type === 'phone' && value && !value.match(/^[\+]?[0-9]{10,14}$/)) {
            errors.push('Valid phone number daalo');
        }
    });

    return errors;
}

// ===== TOAST NOTIFICATION (Global) =====
function showGlobalToast(message, type = 'info') {
    const existing = document.querySelector('.global-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'global-toast';

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    const colors = {
        success: '#38a169',
        error: '#e53e3e',
        warning: '#d69e2e',
        info: '#4f46e5'
    };

    toast.innerHTML = `
        <i class="${icons[type]}" style="color:${colors[type]};font-size:18px;"></i>
        <span>${message}</span>
    `;

    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: white;
        color: #2d3748;
        padding: 15px 22px;
        border-radius: 14px;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 99999;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        border-left: 4px solid ${colors[type]};
        max-width: 350px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ===== LOADING SPINNER =====
function showLoading(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 30px 40px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        ">
            <div style="
                width: 35px;
                height: 35px;
                border: 3px solid #e2e8f0;
                border-top-color: #4f46e5;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            "></div>
            <span style="font-size:15px; color:#2d3748; font-family:'Poppins';">${message}</span>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        backdrop-filter: blur(4px);
    `;

    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) loader.remove();
}

// ===== CONFIRM DIALOG =====
function showConfirm(title, message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(4px);
        `;

        overlay.innerHTML = `
            <div style="
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 380px;
                width: 90%;
                text-align: center;
                animation: popIn 0.3s ease;
                font-family: 'Poppins', sans-serif;
            ">
                <div style="
                    width: 60px; height: 60px;
                    background: #fff5f5;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    margin: 0 auto 15px;
                ">⚠️</div>
                <h3 style="font-size:18px; color:#1a202c; margin-bottom:8px;">${title}</h3>
                <p style="font-size:14px; color:#718096; margin-bottom:25px; line-height:1.6;">${message}</p>
                <div style="display:flex; gap:12px;">
                    <button id="confirmCancel" style="
                        flex:1; padding:12px;
                        background:#f8fafc; border:2px solid #e2e8f0;
                        border-radius:12px; font-size:14px; font-weight:600;
                        cursor:pointer; font-family:'Poppins';
                        color:#718096; transition:all 0.3s;
                    ">Cancel</button>
                    <button id="confirmOk" style="
                        flex:1; padding:12px;
                        background:#e53e3e; border:none;
                        border-radius:12px; font-size:14px; font-weight:600;
                        cursor:pointer; font-family:'Poppins';
                        color:white; transition:all 0.3s;
                    ">Confirm</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector('#confirmOk').addEventListener('click', () => {
            overlay.remove();
            resolve(true);
        });

        overlay.querySelector('#confirmCancel').addEventListener('click', () => {
            overlay.remove();
            resolve(false);
        });
    });
}

// ===== LAZY LOAD IMAGES =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => observer.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== AUTO LOGIN CHECK =====
function checkAuth() {
    const protectedPages = ['dashboard.html', 'post-problem.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !StorageHelper.isLoggedIn()) {
        showGlobalToast('⚠️ Pehle login karo!', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl + K = Search Focus
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const search = document.querySelector('.search-bar input');
        if (search) search.focus();
    }

    // Escape = Close Modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay.active');
        if (modal) modal.classList.remove('active');

        const success = document.querySelector('.success-overlay.active');
        if (success) success.classList.remove('active');
    }
});

// ===== INITIALIZE =====
console.log('🚀 LocalSolver Loaded Successfully!');
console.log('📌 Version: 1.0.0');
console.log('🛠️ Built with ❤️');