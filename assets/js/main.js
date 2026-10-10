// assets/js/main.js — Consolidated JavaScript for BIQS Academy

document.addEventListener('DOMContentLoaded', function () {

    // 1. MOBILE MENU TOGGLE
    function initMobileMenu() {
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const header = document.getElementById('siteHeader');

        if (!menuBtn || !mobileMenu) return;

        function setIcon(open) {
            const icon = menuBtn.querySelector('i');
            if (!icon) return;
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-xmark', open);
        }

        function isOpen() {
            return !mobileMenu.classList.contains('hidden');
        }

        function setMenu(open) {
            mobileMenu.classList.toggle('hidden', !open);
            menuBtn.setAttribute('aria-expanded', String(open));
            setIcon(open);
        }

        // Make sure the menu always starts closed
        setMenu(false);

        // Open / close with the hamburger button
        menuBtn.addEventListener('click', function () {
            setMenu(!isOpen());
        });

        // Close when any link inside the mobile menu is clicked
        mobileMenu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });

        // Close when clicking anywhere outside the header
        document.addEventListener('click', function (e) {
            if (isOpen() && header && !header.contains(e.target)) setMenu(false);
        });

        // Close with Escape and return focus to the button
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) {
                setMenu(false);
                menuBtn.focus();
            }
        });

        // Close if the URL hash changes (in-page links)
        window.addEventListener('hashchange', function () {
            setMenu(false);
        });

        // Back/forward button can restore the page from cache with the menu still open
        window.addEventListener('pageshow', function () {
            setMenu(false);
        });

        // Close when resizing up to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 1024) setMenu(false);
        });
    }

    // 2. BACK TO TOP BUTTON
    function initBackToTop() {
        const topBtn = document.getElementById('topBtn');
        if (!topBtn) return;

        let ticking = false;

        window.addEventListener('scroll', function () {
            if (ticking) return;

            window.requestAnimationFrame(function () {
                const show = window.scrollY > 400;
                topBtn.classList.toggle('hidden', !show);
                topBtn.classList.toggle('flex', show);
                ticking = false;
            });
            ticking = true;
        }, { passive: true });

        topBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // 4. STATS COUNTER ANIMATION (Index Page)
    function initStatsCounter() {
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
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target).toLocaleString('en-US') + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    statNumbers.forEach(animateCount);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(statsSection);
    }

    // 5. CONTACT FORM (WhatsApp handler)
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value?.trim() || '';
            const email = document.getElementById('email')?.value?.trim() || '';
            const subject = document.getElementById('subject')?.value?.trim() || '';
            const message = document.getElementById('message')?.value?.trim() || '';

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields before sending your message.');
                return;
            }

            const whatsappMessage =
                '*New Contact Form Submission*%0A%0A' +
                '*Name:* ' + encodeURIComponent(name) + '%0A' +
                '*Email:* ' + encodeURIComponent(email) + '%0A' +
                '*Subject:* ' + encodeURIComponent(subject) + '%0A' +
                '*Message:* ' + encodeURIComponent(message);

            const whatsappNumber = '923266735959';
            const whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + whatsappMessage;

            window.open(whatsappURL, '_blank', 'noopener,noreferrer');

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Opening WhatsApp...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // 6. WHATSAPP ENQUIRY FORM (Programs page)
    function initEnquiryForm() {
        const enquiryForm = document.getElementById('enquiryForm');
        if (!enquiryForm) return;

        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('fname')?.value?.trim() || '';
            const phone = document.getElementById('fphone')?.value?.trim() || '';
            const prog = document.getElementById('fprog')?.value?.trim() || '';
            const msg = document.getElementById('fmsg')?.value?.trim() || '';

            if (!name || !phone || !prog) {
                alert('Please fill in all required fields.');
                return;
            }

            const text = 'Hi, my name is ' + name + '. Phone: ' + phone +
                '. Interested in: ' + prog + '. Message: ' + msg;
            const whatsappUrl = 'https://wa.me/923016283553?text=' + encodeURIComponent(text);

            const successDiv = document.getElementById('formSuccess');
            if (successDiv) successDiv.classList.remove('hidden');

            window.open(whatsappUrl, '_blank');
        });
    }

    // 7. FAQ ACCORDION
    function initFaqAccordion() {
        const faqList = document.getElementById('faqList');
        if (!faqList) return;

        faqList.querySelectorAll('.faq-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const panel = btn.nextElementSibling;
                const icon = btn.querySelector('.faq-icon');
                const isOpen = btn.getAttribute('aria-expanded') === 'true';

                btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
                panel.classList.toggle('hidden');
                icon.textContent = isOpen ? '+' : '−';
            });
        });
    }

    // 9. APPLY NOW LINKS -> CONTACT FORM (subject comes from the program card)
    function initApplyLinks() {
        const DEFAULT_SUBJECT = 'Admission Inquiry';

        function clean(text) {
            return (text || '').replace(/\s+/g, ' ').trim();
        }

        function getProgramSubject(link) {
            const card = link.closest('[id^="matric-"], [id^="inter-"]');
            if (!card) return DEFAULT_SUBJECT;

            const heading = card.querySelector('h3');
            const title = clean(heading && heading.textContent);
            const label = clean(
                heading && heading.previousElementSibling && heading.previousElementSibling.textContent
            );

            if (!title) return DEFAULT_SUBJECT;

            // "FSc Pre-Medical" + "Part 1" -> "FSc Pre-Medical (Part 1)"
            const part = /^Part/i.test(label) && !/Part/i.test(title) ? ' (' + label + ')' : '';
            return DEFAULT_SUBJECT + ' - ' + title + part;
        }

        document.querySelectorAll('a[href="contact.html"]').forEach(function (link) {
            const custom = link.dataset.subject;
            if (!custom && !/apply now/i.test(link.textContent)) return;

            const subject = custom || getProgramSubject(link);
            link.setAttribute(
                'href',
                'contact.html?subject=' + encodeURIComponent(subject) + '#send-message'
            );
        });
    }
    // 10. CONTACT PAGE: PREFILL SUBJECT FROM THE URL (works with <input> or <select>)
    function initContactPrefill() {
        const subjectField = document.getElementById('subject');
        if (!subjectField) return;

        const subject = (new URLSearchParams(window.location.search).get('subject') || '')
            .trim()
            .slice(0, 120);
        if (!subject) return;

        if (subjectField.tagName !== 'SELECT') {
            subjectField.value = subject;
            return;
        }

        // If the URL subject isn't in the list, add it so it is still selected
        const hasOption = Array.from(subjectField.options).some(function (opt) {
            return opt.value === subject;
        });

        if (!hasOption) {
            const extra = document.createElement('option');
            extra.value = subject;
            extra.textContent = subject;
            subjectField.appendChild(extra);
        }

        subjectField.value = subject;
    }
    // 8. FACULTY CARD REVEAL
    function initFacultyReveal() {
        const facultyCards = document.querySelectorAll('.faculty-card');
        if (!facultyCards.length) return;

        const facultyObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        facultyCards.forEach(function (card) {
            facultyObserver.observe(card);
        });
    }

    // INITIALIZE ALL
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initStatsCounter();
    initContactForm();
    initEnquiryForm();
    initFaqAccordion();
    initFacultyReveal();
    initApplyLinks();
    initContactPrefill();
});