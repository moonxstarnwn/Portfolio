const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', initialTheme);
themeToggle.textContent = initialTheme === 'dark' ? 'Modo claro' : 'Modo oscuro';

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  themeToggle.textContent = nextTheme === 'dark' ? 'Modo claro' : 'Modo oscuro';
}

themeToggle.addEventListener('click', toggleTheme);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.nombre.value.trim();
  const email = form.email.value.trim();
  const message = form.mensaje.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Por favor completa todos los campos antes de enviar.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMessage.textContent = 'Introduce un correo válido.';
    return;
  }

  formMessage.textContent = 'Gracias, tu mensaje ha sido enviado. Te responderé pronto.';
  form.reset();
});

const revealElements = document.querySelectorAll('.section, .project-card, .about-highlights article, .contact-info');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

revealElements.forEach((element) => observer.observe(element));
