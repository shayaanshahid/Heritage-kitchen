/* =========================================
   Heritage Kitchen — Main Script (with i18n)
   Languages: English (en), Dutch (nl), French (fr)
   ========================================= */

// ── TRANSLATIONS ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    'nav.about':        'About',
    'nav.menu':         'Menu',
    'nav.location':     'Location',
    'nav.reservations': 'Reservations',
    'nav.book':         'Book a Table',

    'hero.title':   'Fusion South East Asian\nRestaurant',
    'hero.openFor': 'Now Open For',
    'hero.meals':   'Brunch • Lunch • Dinner',
    'hero.cta1':    'Reserve Your Table',
    'hero.cta2':    'View Menu',

    'menu.heading':    'Our Menu',
    'menu.subheading': 'A harmonious blend of authentic South East Asian flavors, elevated for the modern palate.',
    'menu.starters':   'Starters',
    'menu.mains':      'Mains',
    'menu.desserts':   'Desserts',

    'menu.s1.name': 'Vietnamese Fresh Spring Rolls',
    'menu.s1.desc': 'Rice paper, fresh herbs, vermicelli, peanut dipping sauce. Choice of shrimp or tofu.',
    'menu.s2.name': 'Chicken Satay Skewers',
    'menu.s2.desc': 'Grilled marinated chicken with a rich, spiced peanut sauce and cucumber relish.',
    'menu.s3.name': 'Tom Yum Soup',
    'menu.s3.desc': 'Classic Thai hot and sour broth with lemongrass, galangal, kaffir lime leaves, and prawns.',
    'menu.s4.name': 'Bao Buns',
    'menu.s4.desc': 'Steamed fluffy buns filled with slow-cooked pork belly, hoisin, and pickled vegetables.',

    'menu.m1.name': 'Signature Pad Thai',
    'menu.m1.desc': 'Stir-fried rice noodles, egg, peanuts, bean sprouts, and tangy tamarind sauce.',
    'menu.m2.name': 'Malaysian Beef Rendang',
    'menu.m2.desc': 'Slow-cooked beef in a rich coconut milk and spice paste, served with jasmine rice.',
    'menu.m3.name': 'Green Curry',
    'menu.m3.desc': 'Aromatic Thai green chili paste, coconut milk, bamboo shoots, and Thai basil. Choice of chicken or tofu.',
    'menu.m4.name': 'Nasi Goreng Kampung',
    'menu.m4.desc': 'Indonesian fried rice topped with a sunny-side-up egg, accompanied by chicken satay and shrimp crackers.',

    'menu.d1.name': 'Mango Sticky Rice',
    'menu.d1.desc': 'Sweet coconut glutinous rice, fresh ripe mango, and toasted mung beans.',
    'menu.d2.name': 'Pandan Panna Cotta',
    'menu.d2.desc': 'Silky pandan-infused cream topped with a lightly spiced palm sugar syrup.',

    'res.heading':     'Book Your Table',
    'res.subheading':  'Join us for an unforgettable dining experience. Reserve your table online or give us a call.',
    'res.callUs':      'Call Us',
    'res.hours':       'Opening Hours',
    'res.hoursDetail': 'Brunch & Lunch: 11:00 – 15:00<br>Dinner: 18:00 – 23:00<br>Closed on Mondays',

    'form.name':       'Name',
    'form.namePh':     'John Doe',
    'form.phone':      'Phone Number',
    'form.phonePh':    '+32 ...',
    'form.date':       'Date',
    'form.time':       'Time',
    'form.selectTime': 'Select Time',
    'form.groupBrunch':'Brunch & Lunch',
    'form.groupDinner':'Dinner',
    'form.guests':     'Number of Guests',
    'form.p1':         '1 Person',
    'form.p2':         '2 People',
    'form.p3':         '3 People',
    'form.p4':         '4 People',
    'form.p5':         '5 People',
    'form.p6':         '6 People',
    'form.pLarger':    'Larger Group (Please call)',
    'form.special':    'Special Requests',
    'form.specialPh':  'Dietary requirements, celebrations...',
    'form.submit':     'Confirm Reservation',
    'form.successMsg': '🎉 Thank you, {name}! Your reservation for {guests} guest(s) on {date} at {time} has been received. We\'ll confirm by phone shortly.',
    'form.errorMsg':   'Please fill in all required fields.',
    'form.sending':    'Sending…',

    'loc.heading':    'Find Us',
    'loc.subheading': 'Located in the heart of Brussels.',
    'loc.directions': 'Get Directions',

    'footer.desc':       'A culinary journey through South East Asia, served with elegance in Brussels.',
    'footer.quickLinks': 'Quick Links',
    'footer.home':       'Home',
    'footer.contactUs':  'Contact Us',
    'footer.rights':     'All Rights Reserved.',
  },

  nl: {
    'nav.about':        'Over Ons',
    'nav.menu':         'Menu',
    'nav.location':     'Locatie',
    'nav.reservations': 'Reserveringen',
    'nav.book':         'Reserveer een Tafel',

    'hero.title':   'Fusion Zuid-Oost Aziatisch\nRestaurant',
    'hero.openFor': 'Nu Open Voor',
    'hero.meals':   'Brunch • Lunch • Diner',
    'hero.cta1':    'Reserveer Uw Tafel',
    'hero.cta2':    'Bekijk Menu',

    'menu.heading':    'Ons Menu',
    'menu.subheading': 'Een harmonieuze mix van authentieke Zuid-Oost Aziatische smaken, verfijnd voor het moderne gehemelte.',
    'menu.starters':   'Voorgerechten',
    'menu.mains':      'Hoofdgerechten',
    'menu.desserts':   'Desserts',

    'menu.s1.name': 'Vietnamees Voorjaarsrollen',
    'menu.s1.desc': 'Rijstpapier, verse kruiden, vermicelli, pindasaus. Keuze uit garnalen of tofu.',
    'menu.s2.name': 'Kip Satéspiesjes',
    'menu.s2.desc': 'Gegrilde gemarineerde kip met een rijke, gekruide pindasaus en komkommerrelish.',
    'menu.s3.name': 'Tom Yum Soep',
    'menu.s3.desc': 'Klassieke Thaise pikante en zure bouillon met citroengras, galanga, kaffirlimoenblad en garnalen.',
    'menu.s4.name': 'Bao Broodjes',
    'menu.s4.desc': 'Gestoomde zachte broodjes gevuld met langzaam gegaard buikspek, hoisin en ingelegde groenten.',

    'menu.m1.name': 'Signature Pad Thai',
    'menu.m1.desc': 'Geroerbakte rijstnoedels, ei, pinda\'s, taugé en pittige tamarindensaus.',
    'menu.m2.name': 'Maleisische Beef Rendang',
    'menu.m2.desc': 'Langzaam gestoofde rundvlees in rijke kokosmelk en kruidenpasta, geserveerd met jasmijnrijst.',
    'menu.m3.name': 'Groene Curry',
    'menu.m3.desc': 'Aromatische Thaise groene chilipasta, kokosmelk, bamboescheuten en Thaise basilicum. Keuze uit kip of tofu.',
    'menu.m4.name': 'Nasi Goreng Kampung',
    'menu.m4.desc': 'Indonesische gebakken rijst met een gebakken ei, kip saté en kroepoek.',

    'menu.d1.name': 'Mango Kleefrijst',
    'menu.d1.desc': 'Zoete kokos kleefrijst, verse rijpe mango en geroosterde mungbonen.',
    'menu.d2.name': 'Pandan Panna Cotta',
    'menu.d2.desc': 'Zijdezachte pandan room met een licht gekruide palmsuikersiroop.',

    'res.heading':     'Reserveer Uw Tafel',
    'res.subheading':  'Kom genieten van een onvergetelijke eetervaring. Reserveer online of bel ons.',
    'res.callUs':      'Bel Ons',
    'res.hours':       'Openingstijden',
    'res.hoursDetail': 'Brunch &amp; Lunch: 11:00 – 15:00<br>Diner: 18:00 – 23:00<br>Gesloten op maandag',

    'form.name':       'Naam',
    'form.namePh':     'Jan Janssen',
    'form.phone':      'Telefoonnummer',
    'form.phonePh':    '+32 ...',
    'form.date':       'Datum',
    'form.time':       'Tijdstip',
    'form.selectTime': 'Kies Tijdstip',
    'form.groupBrunch':'Brunch & Lunch',
    'form.groupDinner':'Diner',
    'form.guests':     'Aantal Gasten',
    'form.p1':         '1 Persoon',
    'form.p2':         '2 Personen',
    'form.p3':         '3 Personen',
    'form.p4':         '4 Personen',
    'form.p5':         '5 Personen',
    'form.p6':         '6 Personen',
    'form.pLarger':    'Grotere Groep (Gelieve te bellen)',
    'form.special':    'Speciale Verzoeken',
    'form.specialPh':  'Dieetwensen, feesten...',
    'form.submit':     'Bevestig Reservering',
    'form.successMsg': '🎉 Dank u, {name}! Uw reservering voor {guests} gast(en) op {date} om {time} is ontvangen. We bevestigen spoedig telefonisch.',
    'form.errorMsg':   'Vul alle verplichte velden in.',
    'form.sending':    'Bezig met verzenden…',

    'loc.heading':    'Vind Ons',
    'loc.subheading': 'Gelegen in het hart van Brussel.',
    'loc.directions': 'Routebeschrijving',

    'footer.desc':       'Een culinaire reis door Zuid-Oost Azië, met elegantie geserveerd in Brussel.',
    'footer.quickLinks': 'Snelle Links',
    'footer.home':       'Home',
    'footer.contactUs':  'Contacteer Ons',
    'footer.rights':     'Alle Rechten Voorbehouden.',
  },

  fr: {
    'nav.about':        'À Propos',
    'nav.menu':         'Menu',
    'nav.location':     'Localisation',
    'nav.reservations': 'Réservations',
    'nav.book':         'Réserver une Table',

    'hero.title':   'Restaurant Fusion\nSud-Est Asiatique',
    'hero.openFor': 'Maintenant Ouvert Pour',
    'hero.meals':   'Brunch • Déjeuner • Dîner',
    'hero.cta1':    'Réserver Votre Table',
    'hero.cta2':    'Voir le Menu',

    'menu.heading':    'Notre Menu',
    'menu.subheading': 'Un mélange harmonieux de saveurs authentiques d\'Asie du Sud-Est, élevées pour le palais moderne.',
    'menu.starters':   'Entrées',
    'menu.mains':      'Plats Principaux',
    'menu.desserts':   'Desserts',

    'menu.s1.name': 'Rouleaux de Printemps Vietnamiens',
    'menu.s1.desc': 'Papier de riz, herbes fraîches, vermicelle, sauce aux cacahuètes. Au choix : crevettes ou tofu.',
    'menu.s2.name': 'Brochettes de Poulet Saté',
    'menu.s2.desc': 'Poulet grillé mariné avec une sauce aux arachides épicée et un relish de concombre.',
    'menu.s3.name': 'Soupe Tom Yum',
    'menu.s3.desc': 'Bouillon thaï piquant et aigre avec citronnelle, galanga, feuilles de kaffir et crevettes.',
    'menu.s4.name': 'Bao Buns',
    'menu.s4.desc': 'Brioches vapeur moelleuses garnies de poitrine de porc mijotée, hoisin et légumes marinés.',

    'menu.m1.name': 'Pad Thai Signature',
    'menu.m1.desc': 'Nouilles de riz sautées, œuf, cacahuètes, germes de soja et sauce tamarin acidulée.',
    'menu.m2.name': 'Rendang de Bœuf Malaisien',
    'menu.m2.desc': 'Bœuf mijoté dans une riche pâte de lait de coco et d\'épices, servi avec du riz jasmin.',
    'menu.m3.name': 'Curry Vert',
    'menu.m3.desc': 'Pâte de piment vert thaï, lait de coco, pousses de bambou et basilic thaï. Au choix : poulet ou tofu.',
    'menu.m4.name': 'Nasi Goreng Kampung',
    'menu.m4.desc': 'Riz frit indonésien garni d\'un œuf sur le plat, accompagné de saté de poulet et de crackers aux crevettes.',

    'menu.d1.name': 'Riz Gluant à la Mangue',
    'menu.d1.desc': 'Riz gluant à la noix de coco, mangue fraîche mûre et haricots mungo grillés.',
    'menu.d2.name': 'Panna Cotta au Pandan',
    'menu.d2.desc': 'Crème soyeuse infusée au pandan et sirop de sucre de palme légèrement épicé.',

    'res.heading':     'Réserver Votre Table',
    'res.subheading':  'Rejoignez-nous pour une expérience gastronomique inoubliable. Réservez en ligne ou appelez-nous.',
    'res.callUs':      'Appelez-Nous',
    'res.hours':       'Heures d\'Ouverture',
    'res.hoursDetail': 'Brunch &amp; Déjeuner: 11:00 – 15:00<br>Dîner: 18:00 – 23:00<br>Fermé le lundi',

    'form.name':       'Nom',
    'form.namePh':     'Jean Dupont',
    'form.phone':      'Numéro de Téléphone',
    'form.phonePh':    '+32 ...',
    'form.date':       'Date',
    'form.time':       'Heure',
    'form.selectTime': 'Choisir l\'Heure',
    'form.groupBrunch':'Brunch & Déjeuner',
    'form.groupDinner':'Dîner',
    'form.guests':     'Nombre de Convives',
    'form.p1':         '1 Personne',
    'form.p2':         '2 Personnes',
    'form.p3':         '3 Personnes',
    'form.p4':         '4 Personnes',
    'form.p5':         '5 Personnes',
    'form.p6':         '6 Personnes',
    'form.pLarger':    'Grand Groupe (Veuillez appeler)',
    'form.special':    'Demandes Spéciales',
    'form.specialPh':  'Régime alimentaire, célébrations...',
    'form.submit':     'Confirmer la Réservation',
    'form.successMsg': '🎉 Merci, {name} ! Votre réservation pour {guests} convive(s) le {date} à {time} a bien été reçue. Nous confirmerons par téléphone.',
    'form.errorMsg':   'Veuillez remplir tous les champs obligatoires.',
    'form.sending':    'Envoi en cours…',

    'loc.heading':    'Nous Trouver',
    'loc.subheading': 'Situé au cœur de Bruxelles.',
    'loc.directions': 'Obtenir l\'Itinéraire',

    'footer.desc':       'Un voyage culinaire à travers l\'Asie du Sud-Est, servi avec élégance à Bruxelles.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.home':       'Accueil',
    'footer.contactUs':  'Contactez-Nous',
    'footer.rights':     'Tous Droits Réservés.',
  }
};

// ── STATE ────────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('hk-lang') || 'en';

// ── TRANSLATE ────────────────────────────────────────────────────────────────
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
         (TRANSLATIONS['en'][key]) || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;

  // Text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // input labels handled separately
    } else {
      el.innerHTML = val;            // allow <br> in translations
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // optgroup labels
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    el.label = t(el.dataset.i18nLabel);
  });

  // Update both lang label badges
  const label = currentLang.toUpperCase();
  const labelEl1 = document.getElementById('currentLangLabel');
  const labelEl2 = document.getElementById('currentLangLabelMobile');
  if (labelEl1) labelEl1.textContent = label;
  if (labelEl2) labelEl2.textContent = label;

  // Mark active option in all dropdowns
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

// ── LANGUAGE SWITCHER LOGIC ──────────────────────────────────────────────────
function setupLangSwitcher(btnId, dropdownId, switcherId) {
  const btn      = document.getElementById(btnId);
  const dropdown = document.getElementById(dropdownId);
  const switcher = document.getElementById(switcherId);
  if (!btn || !dropdown || !switcher) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // Close any other open switcher first
    document.querySelectorAll('.lang-switcher.open').forEach(s => {
      if (s !== switcher) s.classList.remove('open');
    });
    switcher.classList.toggle('open');
  });

  dropdown.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
      currentLang = option.dataset.lang;
      localStorage.setItem('hk-lang', currentLang);
      applyTranslations();
      // Close all switchers
      document.querySelectorAll('.lang-switcher').forEach(s => s.classList.remove('open'));
    });
  });
}

// Close dropdowns on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.lang-switcher.open').forEach(s => s.classList.remove('open'));
});

// ── MAIN ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // 1. Current year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMenuBtn  = document.getElementById('closeMenuBtn');
  const mobileMenu    = document.getElementById('mobileMenu');

  function openMobileMenu()  { mobileMenu.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeMobileMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = '';       }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn)  closeMenuBtn.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobileMenu));

  // 4. Language switchers
  setupLangSwitcher('langBtn',       'langDropdown',       'langSwitcher');
  setupLangSwitcher('langBtnMobile', 'langDropdownMobile', 'langSwitcherMobile');

  // 5. Apply saved / default language
  applyTranslations();

  // 6. Menu tabs
  const menuTabs  = document.querySelectorAll('.menu-tab');
  const menuGrids = document.querySelectorAll('.menu-grid');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      menuGrids.forEach(g => g.classList.add('hidden'));
      const target = document.getElementById(tab.dataset.target);
      if (target) {
        target.classList.remove('hidden');
        target.querySelectorAll('.menu-item').forEach((item, i) => {
          item.style.opacity   = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity    = '1';
            item.style.transform  = 'translateY(0)';
          }, i * 80);
        });
      }
    });
  });

  // Animate initial starters
  document.querySelectorAll('#starters .menu-item').forEach((item, i) => {
    item.style.opacity   = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      item.style.opacity    = '1';
      item.style.transform  = 'translateY(0)';
    }, 300 + i * 100);
  });

  // 7. Scroll animations
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

  // 8. Reservation form
  const reservationForm = document.getElementById('reservationForm');
  const formMessage     = document.getElementById('formMessage');
  const dateInput       = document.getElementById('date');
  if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name   = document.getElementById('name').value.trim();
      const phone  = document.getElementById('phone').value.trim();
      const date   = document.getElementById('date').value;
      const time   = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;

      if (!name || !phone || !date || !time || !guests) {
        showMessage(t('form.errorMsg'), 'error'); return;
      }

      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      submitBtn.textContent = t('form.sending');
      submitBtn.disabled    = true;

      setTimeout(() => {
        const msg = t('form.successMsg')
          .replace('{name}',   name)
          .replace('{guests}', guests)
          .replace('{date}',   formatDate(date))
          .replace('{time}',   time);
        showMessage(msg, 'success');
        reservationForm.reset();
        submitBtn.textContent = t('form.submit');
        submitBtn.disabled    = false;
      }, 1500);
    });
  }

  function showMessage(msg, type) {
    if (!formMessage) return;
    formMessage.textContent = msg;
    formMessage.className   = `form-message ${type}`;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
      setTimeout(() => { formMessage.className = 'form-message'; formMessage.textContent = ''; }, 8000);
    }
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const localeMap = { en: 'en-GB', nl: 'nl-BE', fr: 'fr-BE' };
    return d.toLocaleDateString(localeMap[currentLang] || 'en-GB', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // 9. Parallax hero
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    if (hero) hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.3}px)`;
  }, { passive: true });

});
