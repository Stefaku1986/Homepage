'use strict';

(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');
  const backdrop = document.querySelector('[data-nav-backdrop]');
  const body = document.body;

  if (!toggle || !nav || !backdrop) {
    return;
  }

  function setOpen(nextState) {
    nav.classList.toggle('is-open', nextState);
    toggle.classList.toggle('is-open', nextState);
    toggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
    body.classList.toggle('nav-open', nextState);
  }

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  backdrop.addEventListener('click', function () {
    setOpen(false);
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setOpen(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) {
      setOpen(false);
    }
  });
})();

(function () {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('cookie-accept');
  const closeButton = document.getElementById('cookie-close');
  const storageKey = 'ifk_cookie_notice_v2';

  if (!cookieBanner || !acceptButton || !closeButton) {
    return;
  }

  if (localStorage.getItem(storageKey) === '1') {
    cookieBanner.classList.add('is-hidden');
    return;
  }

  window.setTimeout(function () {
    cookieBanner.classList.remove('is-hidden');
  }, 550);

  function dismissBanner() {
    localStorage.setItem(storageKey, '1');
    cookieBanner.classList.add('is-hidden');
  }

  acceptButton.addEventListener('click', dismissBanner);
  closeButton.addEventListener('click', dismissBanner);
})();

(function () {
  const yearNodes = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();

  yearNodes.forEach(function (node) {
    node.textContent = String(currentYear);
  });
})();

(function () {
  const form = document.querySelector('[data-mailto-form]');

  if (!form) {
    return;
  }

  const statusNode = form.querySelector('[data-form-status]');
  const targetEmail = form.getAttribute('data-mailto-target');

  if (!targetEmail) {
    return;
  }

  function setStatus(message) {
    if (!statusNode) {
      return;
    }

    statusNode.hidden = false;
    statusNode.textContent = message;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const firstName = String(formData.get('vorname') || '').trim();
    const lastName = String(formData.get('nachname') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('telefon') || '').trim();
    const topic = String(formData.get('anliegen') || '').trim();
    const message = String(formData.get('nachricht') || '').trim();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const subject = ['Anfrage Ingenieurbuero Kuehl', topic].filter(Boolean).join(' - ');
    const lines = [
      'Guten Tag,',
      '',
      'ich moechte folgende Anfrage stellen:',
      '',
      'Name: ' + fullName,
      'E-Mail: ' + email,
      'Telefon: ' + (phone || 'nicht angegeben'),
      'Anliegen: ' + topic,
      '',
      'Nachricht:',
      message,
      '',
      'Mit freundlichen Gruessen',
      fullName
    ];
    const mailtoUrl =
      'mailto:' +
      encodeURIComponent(targetEmail) +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(lines.join('\n'));

    setStatus(
      'Ihr E-Mail-Programm sollte sich jetzt oeffnen. Falls nichts passiert, schreiben Sie bitte direkt an ' +
        targetEmail +
        '.'
    );

    window.location.href = mailtoUrl;
  });
})();
