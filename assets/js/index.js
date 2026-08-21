// Optimized Inline Scripts - Deferred to avoid main - thread blocking
  
        // Defer script execution
        if (window.requestIdleCallback) {
            requestIdleCallback(function () {
                initNavigation();
            });
        } else {
            setTimeout(initNavigation, 200);
        }

        function initNavigation() {
            const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            }

        // Back to top button visibility with passive listener for better performance
        const topBtn = document.getElementById('topBtn');
        let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    topBtn.classList.remove('hidden');
                    topBtn.classList.add('flex');
                } else {
                    topBtn.classList.add('hidden');
                    topBtn.classList.remove('flex');
                }
                ticking = false;
            });
        ticking = true;
                }
            }, {passive: true });

            topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

// Animated stat counters - counts up once when section scrolls into view
(function () {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.getElementById('stats');
    if (!statNumbers.length || !statsSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';

        if (prefersReducedMotion) {
            el.textContent = target.toLocaleString('en-US') + suffix;
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out
            el.textContent = Math.round(eased * target).toLocaleString('en-US') + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCount);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
})();
  