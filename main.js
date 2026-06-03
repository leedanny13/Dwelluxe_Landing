const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = nav?.querySelectorAll('a') ?? [];
const contactForm = document.querySelector('.contact-form');

const setNavState = (isOpen) => {
  document.body.classList.toggle('nav-open', isOpen);
  nav?.classList.toggle('is-open', isOpen);
  navToggle?.setAttribute('aria-expanded', String(isOpen));
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setNavState(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setNavState(false));
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');

  if (!button) {
    return;
  }

  const originalText = button.textContent;
  button.textContent = 'Request Sent';
  button.setAttribute('disabled', 'true');

  window.setTimeout(() => {
    button.textContent = originalText;
    button.removeAttribute('disabled');
    contactForm.reset();
  }, 1800);
});
