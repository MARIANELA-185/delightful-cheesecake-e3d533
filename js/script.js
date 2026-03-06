// ==========================================
// CANVAS PARTICLES PARA HERO SECTION
// ==========================================
function initHeroCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsl(${160 + Math.random() * 40}, 100%, 50%)`;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==========================================
// CONTADOR ANIMADO DEL 0 AL 40
// ==========================================
function animateCounter() {
    const counter = document.getElementById('age-counter');
    if (!counter) return;
    
    let current = 0;
    const target = 40;
    const duration = 1000;
    const increment = target / (duration / 9);
    
    function update() {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            counter.textContent = target;
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                update();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counter);
}

// ==========================================
// FUEGO ARTIFICIAL PARA EL NÚMERO 40
// ==========================================
function initFirework40() {
    const container = document.querySelector('.hero-content');
    if (!container) return;
    
    const fireworkContainer = document.createElement('div');
    fireworkContainer.className = 'firework-container';
    container.appendChild(fireworkContainer);
    
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'explosion-ring';
        ring.style.animationDelay = `${i * 0.7}s`;
        fireworkContainer.appendChild(ring);
    }
    
   /* for (let i = 0; i < 8; i++) {
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        ray.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg)`;
        ray.style.animationDelay = `${i * 0.2}s`;
        fireworkContainer.appendChild(ray);
    }
    */
    function createExplosion(x, y, type = 'mixed') {
        const particleCount = 30;
        const colors = ['particle-light', 'particle-dark', 'particle-white', 'particle-gold'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            if (type === 'light') particle.classList.add('particle-light');
            else if (type === 'dark') particle.classList.add('particle-dark');
            else particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100 + Math.random() * 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            
            fireworkContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'spark particle-light';
                spark.style.left = (x + (Math.random() - 0.5) * 20) + '%';
                spark.style.top = y + '%';
                spark.style.animationDuration = (2 + Math.random() * 2) + 's';
                fireworkContainer.appendChild(spark);
                
                setTimeout(() => spark.remove(), 4000);
            }, i * 100);
        }
    }
    
    function autoFireworks() {
        createExplosion(50, 50, 'light');
        setTimeout(() => createExplosion(30, 30, 'dark'), 200);
        setTimeout(() => createExplosion(70, 30, 'gold'), 400);
        setTimeout(() => createExplosion(30, 70, 'dark'), 600);
        setTimeout(() => createExplosion(70, 70, 'light'), 800);
    }
    
    setTimeout(autoFireworks, 500);
    setInterval(autoFireworks, 3000);
    
    container.addEventListener('click', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        createExplosion(x, y);
    });
}

// ==========================================
const audio = document.getElementById('audio-player');
        const musicBtn = document.getElementById('music-btn');
        const musicIcon = document.getElementById('music-icon');
        const progressBar = document.getElementById('progress-bar');
        const tooltip = document.getElementById('music-tooltip');
        
        let isPlaying = false;
        let progressInterval;

        // Mostrar tooltip al cargar
        window.addEventListener('load', () => {
            setTimeout(() => {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 4000);
            }, 1000);
        });

        // Mostrar tooltip al hover
        musicBtn.addEventListener('mouseenter', () => {
            tooltip.classList.add('show');
        });

        musicBtn.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });

        function toggleMusic() {
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        }

        function playMusic() {
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicIcon.classList.remove('bi-play-fill');
                musicIcon.classList.add('bi-pause-fill');
                
                // Iniciar actualización de progreso
                updateProgress();
                progressInterval = setInterval(updateProgress, 100);
                
                // Crear notas musicales flotantes
                createFloatingNote();
                setInterval(createFloatingNote, 2000);
                
            }).catch(error => {
                console.error('Error al reproducir:', error);
                alert('No se pudo reproducir el audio. Verifica que el archivo existe en la carpeta "audio/".');
            });
        }

        function pauseMusic() {
            audio.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicIcon.classList.remove('bi-pause-fill');
            musicIcon.classList.add('bi-play-fill');
            clearInterval(progressInterval);
        }

        function updateProgress() {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = progress + '%';
            }
        }

        function createFloatingNote() {
            if (!isPlaying) return;
            
            const note = document.createElement('i');
            note.className = 'bi bi-music-note-beamed floating-note';
            note.style.left = Math.random() * 40 + 10 + 'px';
            note.style.top = '0px';
            
            musicBtn.appendChild(note);
            
            setTimeout(() => {
                note.remove();
            }, 3000);
        }

        // Actualizar progreso mientras se reproduce
        audio.addEventListener('timeupdate', updateProgress);

        // Reiniciar barra cuando termina (aunque tiene loop)
        audio.addEventListener('ended', () => {
            progressBar.style.width = '0%';
        });

        // Manejar errores de carga
        audio.addEventListener('error', () => {
            console.error('Error al cargar el audio');
            tooltip.innerHTML = '<span class="song-title">❌ Error</span><small>No se encontró el archivo</small>';
            tooltip.classList.add('show');
        });

// ==========================================
// CREAR PARTÍCULAS DE FONDO
// ==========================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

// ==========================================
// CUENTA ATRÁS
// ==========================================
function updateCountdown() {
    const targetDate = new Date('2026-03-14T12:00:00').getTime();
    
    function calculate() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(Math.max(0, days)).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(Math.max(0, hours)).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(Math.max(0, minutes)).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(Math.max(0, seconds)).padStart(2, '0');
    }
    
    calculate();
    setInterval(calculate, 1000);
}

// ==========================================
// GALERÍA SLIDER
// ==========================================
function initGallerySlider() {
    const container = document.querySelector('.gallery-container');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const dotsContainer = document.querySelector('.gallery-dots');
    const progressFill = document.querySelector('.progress-fill');
    
    if (!container || items.length === 0) return;
    
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    function updateGallery() {
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === items.length - 1;
        
        const progress = ((currentIndex + 1) / items.length) * 100;
        if (progressFill) progressFill.style.width = progress + '%';
        
        const itemWidth = items[0].offsetWidth + 32;
        const containerWidth = container.offsetWidth;
        const scrollPosition = (currentIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2);
        
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(items.length - 1, index));
        updateGallery();
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('touchend', dragEnd);
    container.addEventListener('mousemove', drag);
    container.addEventListener('touchmove', drag);
    container.addEventListener('mouseleave', () => {
        if (isDragging) dragEnd();
    });
    
    function dragStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        container.style.cursor = 'grabbing';
    }
    
    function drag(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
    
    function dragEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        container.style.cursor = 'grab';
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100 && currentIndex < items.length - 1) {
            currentIndex++;
        } else if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }
        
        goToSlide(currentIndex);
        currentTranslate = 0;
        prevTranslate = 0;
    }
    
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }
    
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    });
    
    let scrollTimeout;
    container.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const itemWidth = items[0].offsetWidth + 32;
            const newIndex = Math.round(container.scrollLeft / itemWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateGallery();
            }
        }, 150);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });
    
    updateGallery();
}

// ==========================================
// EFECTO DE ESCRITURA EN FOOTER
// ==========================================
function typeWriter() {
    const element = document.querySelector('.typing-text');
    if (!element) return;
    
    const text = "para celebrar todos juntos";
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                element.textContent = '';
                i = 0;
                type();
            }, 2000);
        }
    }
    
    type();
}

// ==========================================
// FUEGOS ARTIFICIALES EN FOOTER
// ==========================================
function createFireworks() {
    const container = document.getElementById('fireworks');
    if (!container) return;
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        
        const hue = 160 + Math.random() * 40;
        firework.style.background = `hsl(${hue}, 100%, 50%)`;
        firework.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%)`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        firework.style.setProperty('--tx', `${tx}px`);
        firework.style.setProperty('--ty', `${ty}px`);
        
        container.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1000);
    }
    
    setInterval(createFirework, 300);
}

// ==========================================
// ANIMACIONES DE SCROLL
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item, .event-card, .hotel-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ==========================================
// SCROLL INDICATOR
// ==========================================
function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.addEventListener('click', () => {
            document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ==========================================
// INICIALIZAR TODO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    animateCounter();
    createParticles();
    updateCountdown();
    initGallerySlider();
    initFirework40();
    typeWriter();
    createFireworks();
    initScrollAnimations();
    initScrollIndicator();
});

// Efecto parallax en mouse move
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const heroContent = document.querySelector('.hero-content');
    const heroContentMain = document.querySelector('.hero-content-main');
    
    if (heroContent) {
        heroContent.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
    }
    if (heroContentMain) {
        heroContentMain.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
    }
});
    // ===== CLASE PARA GESTIONAR CADA VIDEO =====
class VideoPlayer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.video = this.container.querySelector('.video-superior');
        this.overlay = this.container.querySelector('.play-overlay');
        this.controles = this.container.querySelector('.controles');
        this.barraProgreso = this.container.querySelector('.barra-progreso');
        this.progreso = this.container.querySelector('.progreso');
        this.btnPlay = this.controles.querySelector('.btn-play');
        this.btnPausa = this.controles.querySelector('.btn-pausa');
        this.btnStop = this.controles.querySelector('.btn-stop');
        
        this.haEmpezado = false;
        this.rafId = null;
        
        this.inicializar();
    }

    inicializar() {
        // Evento click en overlay inicial
        this.overlay.addEventListener('click', () => this.iniciar());

        // Eventos de controles
        this.btnPlay.addEventListener('click', () => this.togglePlay());
        this.btnPausa.addEventListener('click', () => this.togglePlay());
        this.btnStop.addEventListener('click', () => this.detener());

        // Click en video para pausar/play
        this.video.addEventListener('click', () => {
            if (this.haEmpezado) this.togglePlay();
        });

        // Eventos del video
        this.video.addEventListener('ended', () => this.onEnded());
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());

        // Doble click para pantalla completa
        this.video.addEventListener('dblclick', () => this.toggleFullscreen());
    }

    iniciar() {
        this.haEmpezado = true;
        
        // Ocultar overlay
        this.overlay.classList.add('oculto');
        
        // Mostrar controles
        this.controles.classList.add('visible');
        this.barraProgreso.classList.add('visible');
        
        // Reproducir
        this.video.play();
        this.video.classList.add('reproduciendo');
        this.controles.classList.add('reproduciendo');
        
        // Iniciar progreso
        this.actualizarProgreso();
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    detener() {
        this.video.pause();
        this.video.currentTime = 0;
        
        // Resetear UI
        this.video.classList.remove('reproduciendo');
        this.controles.classList.remove('reproduciendo');
        this.controles.classList.remove('visible');
        this.barraProgreso.classList.remove('visible');
        this.overlay.classList.remove('oculto');
        
        this.progreso.style.width = '0%';
        this.haEmpezado = false;
        
        // Cancelar animación
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }

    actualizarProgreso() {
        if (!this.video.paused && !this.video.ended && this.haEmpezado) {
            const porcentaje = (this.video.currentTime / this.video.duration) * 100;
            this.progreso.style.width = porcentaje + '%';
            this.rafId = requestAnimationFrame(() => this.actualizarProgreso());
        }
    }

    onPlay() {
        this.controles.classList.add('reproduciendo');
        this.actualizarProgreso();
    }

    onPause() {
        this.controles.classList.remove('reproduciendo');
    }

    onEnded() {
        this.controles.classList.remove('reproduciendo');
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen().catch(err => {
                console.log('Error al entrar en pantalla completa:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// ===== INICIALIZAR AMBOS VIDEOS =====
document.addEventListener('DOMContentLoaded', () => {
    const player1 = new VideoPlayer('container-1');
    const player2 = new VideoPlayer('container-2');

    // Atajo de teclado: espacio pausa el video activo
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            // Verificar cuál está en hover o enfocado
            const activeContainer = document.querySelector('.video-container:hover');
            if (activeContainer) {
                e.preventDefault();
                const video = activeContainer.querySelector('.video-superior');
                if (video.classList.contains('reproduciendo')) {
                    video.paused ? video.play() : video.pause();
                }
            }
        }
    });
});
        // ============================================
        // GESTIÓN DE COOKIES
        // ============================================

        // Objeto para almacenar las preferencias
        let cookiePreferences = {
            necessary: true,  // Siempre activo
            analytics: false,
            marketing: false,
            timestamp: null
        };

        // Inicialización cuando carga la página
        document.addEventListener('DOMContentLoaded', function() {
            checkCookieConsent();
        });

        // Verificar si ya existe consentimiento
        function checkCookieConsent() {
            const consent = getCookie('cookieConsent');
            
            if (!consent) {
                // Mostrar banner si no hay consentimiento previo
                setTimeout(() => {
                    showBanner();
                }, 1000);
            } else {
                // Cargar preferencias guardadas
                try {
                    cookiePreferences = JSON.parse(consent);
                    applyPreferences();
                } catch(e) {
                    console.error('Error parsing cookie consent:', e);
                }
            }
        }

        // Mostrar el banner
        function showBanner() {
            document.getElementById('cookieBanner').classList.add('active');
            document.getElementById('cookieOverlay').classList.add('active');
        }

        // Ocultar el banner
        function hideBanner() {
            document.getElementById('cookieBanner').classList.remove('active');
            document.getElementById('cookieOverlay').classList.remove('active');
        }

        // Aceptar todas las cookies
        function acceptAll() {
            cookiePreferences = {
                necessary: true,
                analytics: true,
                marketing: true,
                timestamp: new Date().toISOString()
            };
            saveConsent();
            hideBanner();
            showConfirmation('Todas las cookies han sido activadas');
        }

        // Rechazar todas las cookies (excepto necesarias)
        function rejectAll() {
            cookiePreferences = {
                necessary: true,
                analytics: false,
                marketing: false,
                timestamp: new Date().toISOString()
            };
            saveConsent();
            hideBanner();
            showConfirmation('Solo cookies necesarias activadas');
        }

        // Mostrar panel de preferencias
        function showPreferences() {
            document.getElementById('preferencesPanel').classList.add('active');
            
            // Sincronizar toggles con preferencias actuales
            document.getElementById('analyticsToggle').classList.toggle('active', cookiePreferences.analytics);
            document.getElementById('marketingToggle').classList.toggle('active', cookiePreferences.marketing);
        }

        // Cerrar panel de preferencias
        function closePreferences() {
            document.getElementById('preferencesPanel').classList.remove('active');
        }

        // Toggle de categoría
        function toggleCategory(element) {
            if (element.classList.contains('disabled')) return;
            element.classList.toggle('active');
        }

        // Guardar preferencias personalizadas
        function savePreferences() {
            cookiePreferences = {
                necessary: true,
                analytics: document.getElementById('analyticsToggle').classList.contains('active'),
                marketing: document.getElementById('marketingToggle').classList.contains('active'),
                timestamp: new Date().toISOString()
            };
            
            saveConsent();
            closePreferences();
            hideBanner();
            showConfirmation('Preferencias personalizadas guardadas');
        }

        // Guardar en cookie (válida por 1 año)
        function saveConsent() {
            const consentString = JSON.stringify(cookiePreferences);
            setCookie('cookieConsent', consentString, 365);
            applyPreferences();
        }

        // Aplicar preferencias (aquí integrarías tus scripts de tracking)
        function applyPreferences() {
            console.log('Aplicando preferencias de cookies:', cookiePreferences);
            
            if (cookiePreferences.analytics) {
                console.log('Analytics activado');
            } else {
                console.log('Analytics desactivado');
            }
            
            if (cookiePreferences.marketing) {
                console.log('Marketing activado');
            } else {
                console.log('Marketing desactivado');
            }
        }

        // Mostrar confirmación
        function showConfirmation(message) {
            const confirmation = document.getElementById('saveConfirmation');
            confirmation.textContent = '✅ ' + message;
            confirmation.classList.add('show');
            
            setTimeout(() => {
                confirmation.classList.remove('show');
            }, 3000);
        }

        // ============================================
        // UTILIDADES PARA COOKIES
        // ============================================

        function setCookie(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            const expiresString = "expires=" + expires.toUTCString();
            document.cookie = name + "=" + encodeURIComponent(value) + ";" + expiresString + ";path=/;SameSite=Lax";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
            }
            return null;
        }

        function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
        }

        // Cerrar al hacer clic en overlay
        document.getElementById('cookieOverlay').addEventListener('click', closePreferences);

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePreferences();
            }
        });
