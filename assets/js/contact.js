// assets/js/contact.js

// ================= CONTACT FORM HANDLER =================
document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
    initMobileMenu();
});

/**
 * Initializes the contact form to convert submissions into WhatsApp messages
 * instead of submitting to a non-existent backend.
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation (though HTML5 'required' should handle most cases)
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields before sending your message.');
            return;
        }

        // Build WhatsApp message with proper formatting
        const whatsappMessage = `*New Contact Form Submission*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Subject:* ${encodeURIComponent(subject)}%0A` +
            `*Message:* ${encodeURIComponent(message)}`;

        // Use the real WhatsApp number from the contact page
        const whatsappNumber = '923004016622'; // +92 300 4016622
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');

        // Optional: Show success message and reset form
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Opening WhatsApp...';
        submitButton.disabled = true;

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

/**
 * Initializes the mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    // Toggle mobile menu visibility
    menuBtn.addEventListener('click', function () {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            // Update aria-expanded for accessibility
            menuBtn.setAttribute('aria-expanded', 'true');

            // Change icon to X (close) when menu is open
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');

            // Change icon back to bars
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');

            // Reset icon to bars
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close mobile menu when window is resized to desktop view
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) { // md breakpoint
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');

            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * Smooth scroll for all internal anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" or empty
        if (href === '#' || href === '') return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Back to top button functionality (if needed on this page)
 */
function initBackToTop() {
    const topBtn = document.getElementById('topBtn');
    if (!topBtn) return;

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
    }, { passive: true });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize back to top if the button exists
if (document.getElementById('topBtn')) {
    initBackToTop();
}