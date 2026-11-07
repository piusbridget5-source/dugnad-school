// Mobile menu
const menuButton = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// "A day with us" tabs
const tabs = [...document.querySelectorAll('.timeline [role="tab"]')];
const dayText = document.getElementById('day-text');

function selectTab(tab, moveFocus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  if (dayText) {
    dayText.textContent = tab.dataset.t || '';
    dayText.setAttribute('aria-labelledby', tab.id);
  }

  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));

  tab.addEventListener('keydown', (event) => {
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectTab(tabs[nextIndex], true);
    }
  });
});

// Front-end validation only. Connect a backend to actually submit requests.
const form = document.getElementById('visit');
const formMessage = document.getElementById('form-msg');

if (form && formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalidField = null;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach((field) => {
      const isInvalid = !field.value.trim();
      field.classList.toggle('bad', isInvalid);
      field.setAttribute('aria-invalid', String(isInvalid));

      if (isInvalid && !firstInvalidField) firstInvalidField = field;
    });

    if (firstInvalidField) {
      formMessage.style.color = '#b3261e';
      formMessage.textContent = 'Please fill in your name and phone number.';
      firstInvalidField.focus();
      return;
    }

    formMessage.style.color = '#1f5c3a';
    formMessage.textContent =
      'Your details passed the checks, but this demo does not send requests. Please contact the school directly.';
  });

  form.addEventListener('input', (event) => {
    if (event.target.matches('[required]')) {
      const isInvalid = !event.target.value.trim();
      event.target.classList.toggle('bad', isInvalid);
      event.target.setAttribute('aria-invalid', String(isInvalid));
    }
  });
}

// Footer year
const year = document.getElementById('yr');
if (year) year.textContent = new Date().getFullYear();
