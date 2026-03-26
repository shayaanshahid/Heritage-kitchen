/* =========================================
   Heritage Kitchen — Main Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. SET CURRENT YEAR ──────────────────────────────────────────────────
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── 2. NAVBAR SCROLL EFFECT ──────────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  // ── 3. MOBILE MENU ───────────────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMenuBtn  = document.getElementById('closeMenuBtn');
  const mobileMenu    = document.getElementById('mobileMenu');
  const mobileLinks   = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn)  closeMenuBtn.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ── 4. MENU TABS ─────────────────────────────────────────────────────────
  const menuTabs    = document.querySelectorAll('.menu-tab');
  const menuGrids   = document.querySelectorAll('.menu-grid');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Hide all grids
      menuGrids.forEach(grid => grid.classList.add('hidden'));

      // Show targeted grid with a nice fade
      const targetId = tab.dataset.target;
      const targetGrid = document.getElementById(targetId);
      if (targetGrid) {
        targetGrid.classList.remove('hidden');
        // Animate items in
        const items = targetGrid.querySelectorAll('.menu-item');
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 80);
        });
      }
    });
  });

  // Animate initial menu items on page load
  const initialItems = document.querySelectorAll('#starters .menu-item');
  initialItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 300 + i * 100);
  });

  // ── 5. INTERSECTION OBSERVER (SCROLL ANIMATIONS) ─────────────────────────
  const animatedEls = document.querySelectorAll(
    '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedEls.forEach(el => observer.observe(el));

  // ── 6. RESERVATION FORM ──────────────────────────────────────────────────
  const reservationForm = document.getElementById('reservationForm');
  const formMessage     = document.getElementById('formMessage');

  // Set minimum date to today
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name   = document.getElementById('name').value.trim();
      const phone  = document.getElementById('phone').value.trim();
      const date   = document.getElementById('date').value;
      const time   = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;

      if (!name || !phone || !date || !time || !guests) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate form submission (replace with real API call)
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        showMessage(
          `🎉 Thank you, ${name}! Your reservation for ${guests} guest(s) on ${formatDate(date)} at ${time} has been received. We'll confirm via phone shortly.`,
          'success'
        );
        reservationForm.reset();
        submitBtn.textContent = 'Confirm Reservation';
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showMessage(msg, type) {
    if (!formMessage) return;
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide success after 8s
    if (type === 'success') {
      setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
      }, 8000);
    }
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // ── 7. SMOOTH ACTIVE NAV LINK HIGHLIGHTING ON SCROLL ────────────────────
  const sections  = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.remove('active-nav');
            if (a.getAttribute('href') === `#${entry.target.id}`) {
              a.classList.add('active-nav');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => sectionObserver.observe(sec));

  // ── 8. PARALLAX HERO (subtle) ─────────────────────────────────────────────
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    if (!hero) return;
    const scrollY = window.scrollY;
    hero.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
  }, { passive: true });

});
