// Back to top
document.querySelectorAll('.back-to-top').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Close mobile nav after clicking a link
document.querySelectorAll('#mainNav .nav-link-custom').forEach(function (link) {
  link.addEventListener('click', function () {
    var nav = document.getElementById('mainNav');
    if (nav.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

// Contact form: simple front-end validation + confirmation (no backend wired up)
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      e.stopPropagation();
      contactForm.classList.add('was-validated');
      return;
    }
    var successEl = document.getElementById('formSuccess');
    if (successEl) {
      successEl.classList.remove('d-none');
    }
    contactForm.reset();
    contactForm.classList.remove('was-validated');
  });
}

// Work page: simple category filter
var filterButtons = document.querySelectorAll('.filter-pill');
var projectCards = document.querySelectorAll('[data-category]');
if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Case study page: scrollspy-lite active state on sidebar TOC
var tocLinks = document.querySelectorAll('.case-toc a');
if (tocLinks.length) {
  var sections = Array.from(tocLinks).map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (sec, i) {
      if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
        tocLinks.forEach(function (l) { l.classList.remove('active'); });
        tocLinks[i].classList.add('active');
      }
    });
  });
}
