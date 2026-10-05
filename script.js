const menuButton = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    navMenu.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    navMenu.classList.toggle('active', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
            const isCurrent = link.hash === `#${entry.target.id}`;
            link.classList.toggle('active', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const partnerSection = document.querySelector('#partner');

if (partnerSection) {
    const moneyRainObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        observer.disconnect();

        const moneyRain = document.createElement('div');
        moneyRain.className = 'money-rain';
        moneyRain.setAttribute('aria-hidden', 'true');

        for (let index = 0; index < 24; index += 1) {
            const bill = document.createElement('span');
            const startRotation = Math.round(Math.random() * 70 - 35);
            bill.className = 'money-rain-bill';
            bill.textContent = '$';
            bill.style.left = `${Math.random() * 100}%`;
            bill.style.setProperty('--drift', `${Math.round(Math.random() * 180 - 90)}px`);
            bill.style.setProperty('--start-rotation', `${startRotation}deg`);
            bill.style.setProperty('--end-rotation', `${startRotation + Math.round(Math.random() * 500 - 250)}deg`);
            bill.style.setProperty('--fall-delay', `${Math.random() * 0.8}s`);
            bill.style.setProperty('--fall-duration', `${2.5 + Math.random() * 0.9}s`);
            moneyRain.append(bill);
        }

        document.body.append(moneyRain);
        window.setTimeout(() => moneyRain.remove(), 5000);
    }, { threshold: 0.15 });

    moneyRainObserver.observe(partnerSection);
}

document.querySelectorAll('.work-gallery-toggle').forEach((button) => {
    const galleryArea = document.getElementById(button.getAttribute('aria-controls'));
    const label = button.querySelector('.work-gallery-toggle-label');

    if (!galleryArea || !label) return;

    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));
        label.textContent = isExpanded ? 'View' : 'Hide';
        galleryArea.hidden = isExpanded;
    });
});

document.querySelectorAll('.work-gallery-area').forEach((area) => {
    const gallery = area.querySelector('.work-gallery');
    const track = gallery && gallery.querySelector('.work-gallery-track');
    const set = track && track.querySelector('.work-gallery-set');
    if (!gallery || !track || !set) return;

    function monitorImage(image) {
        const imageFrame = image.parentElement;
        image.addEventListener('error', () => imageFrame.classList.add('is-empty'), { once: true });
        image.addEventListener('load', () => imageFrame.classList.remove('is-empty'));
        if (image.complete && image.naturalWidth === 0) imageFrame.classList.add('is-empty');
    }

    set.querySelectorAll('.work-slide-image img').forEach(monitorImage);

    if (set.querySelectorAll('.work-slide').length < 2) return;

    const duplicate = set.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    duplicate.querySelectorAll('img').forEach((image) => {
        image.alt = '';
        image.loading = 'eager';
        monitorImage(image);
    });
    track.append(duplicate);
});