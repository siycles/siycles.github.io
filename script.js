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