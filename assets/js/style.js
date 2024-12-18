document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const email = document.querySelector('input[placeholder="E-mail"]').value.trim();
    const message = document.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        alert('Harap isi semua bidang!');
        return;
    }

    // Display a thank you message with a slight fade-in effect
    const thankYouMessage = document.createElement('div');
    thankYouMessage.textContent = 'Terima kasih! Pesan Anda telah dikirim.';
    thankYouMessage.style.position = 'fixed';
    thankYouMessage.style.bottom = '20px';
    thankYouMessage.style.left = '50%';
    thankYouMessage.style.transform = 'translateX(-50%)';
    thankYouMessage.style.padding = '10px 20px';
    thankYouMessage.style.backgroundColor = '#505050';
    thankYouMessage.style.color = '#fff';
    thankYouMessage.style.fontSize = '16px';
    thankYouMessage.style.borderRadius = '5px';
    thankYouMessage.style.opacity = '0';
    thankYouMessage.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(thankYouMessage);

    setTimeout(() => {
        thankYouMessage.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        thankYouMessage.style.opacity = '0';
        setTimeout(() => {
            thankYouMessage.remove();
        }, 500);
    }, 3000);
});

// Show the "Back to Top" button when scrolling down
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 2) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Smooth scroll to top when clicking the "Back to Top" button
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('appear');
        }
    });
});
