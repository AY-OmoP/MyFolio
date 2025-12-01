// Custom Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Animate outline with a slight delay
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ["Web Applications", "AI Solutions", "Python Scripts", "User Experiences"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before next word
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

document.addEventListener('DOMContentLoaded', type);

// Scroll Reveal
const sections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

sections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Add CSS for hidden sections dynamically
const style = document.createElement('style');
style.innerHTML = `
    .section--hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s;
    }
`;
document.head.appendChild(style);

// Open Credential in Modal
function openCredential(event, source, type = 'url') {
    event.preventDefault();
    const modal = document.getElementById('credential-modal');
    const iframe = document.getElementById('credential-frame');
    const imageWrapper = document.getElementById('image-wrapper');
    const image = document.getElementById('credential-image');

    if (type === 'popup') {
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(source, 'CredentialPopup', `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`);
        return; // Don't open the modal
    }

    if (type === 'image') {
        iframe.style.display = 'none';
        iframe.src = '';
        image.src = source;
        imageWrapper.style.display = 'flex';
    } else {
        imageWrapper.style.display = 'none';
        image.src = '';
        iframe.src = source;
        iframe.style.display = 'block';
    }

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('credential-modal');
    const iframe = document.getElementById('credential-frame');
    const image = document.getElementById('credential-image');
    const imageWrapper = document.getElementById('image-wrapper');

    modal.classList.remove('active');
    setTimeout(() => {
        iframe.src = '';
        image.src = '';
        imageWrapper.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
document.getElementById('credential-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Disable context menu on protected images and overlay
document.addEventListener('contextmenu', function (e) {
    if (e.target.classList.contains('protected-image') || e.target.classList.contains('protection-overlay')) {
        e.preventDefault();
    }
});
