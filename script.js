const observer = new IntersectionObserver((e) => {
  e.forEach(el => { if(el.isIntersecting){ el.target.classList.add('visible'); observer.unobserve(el.target); } });
}, {threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  success.style.display = 'none';
  error.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Sending...';
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    btn.disabled = false;
    btn.textContent = 'Send Message →';
    if (response.ok) {
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    } else {
      error.style.display = 'block';
    }
  }).catch(() => {
    btn.disabled = false;
    btn.textContent = 'Send Message →';
    error.style.display = 'block';
  });
});
function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }
document.addEventListener('click', function(e) {
  const m = document.getElementById('mobileMenu');
  const h = document.querySelector('.hamburger');
  if(!m.contains(e.target) && !h.contains(e.target)) m.classList.remove('open');
});
