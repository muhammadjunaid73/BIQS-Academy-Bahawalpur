
        // Optimized Inline Scripts

    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
        menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        });

    // Back to top button visibility
    const topBtn = document.getElementById('topBtn');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
        topBtn.classList.remove('hidden');
    topBtn.classList.add('flex');
            } else {
        topBtn.classList.add('hidden');
    topBtn.classList.remove('flex');
            }
        });
        topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        });

    // WhatsApp Form Handler
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fname').value;
            const phone = document.getElementById('fphone').value;
            const prog = document.getElementById('fprog').value;
            const msg = document.getElementById('fmsg').value;

            if (!name || !phone || !prog) {
                alert('Please fill in all required fields.');
                return;
            }

            const text = `Hi, my name is ${name}. Phone: ${phone}. Interested in: ${prog}. Message: ${msg}`;
            const whatsappUrl = `https://wa.me/923000000000?text=${encodeURIComponent(text)}`;

            document.getElementById('formSuccess').classList.log?.('hidden'); // fallback handled safely
            const successDiv = document.getElementById('formSuccess');
            if (successDiv) successDiv.classList.remove('hidden');
            window.open(whatsappUrl, '_blank');
        });
        }
