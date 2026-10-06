(function () {
  'use strict';
  var WA_NUMBER = '919503248068';

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Preselect service from ?service=
  var form = document.getElementById('inquiry-form');
  if (!form) return;
  var select = form.elements['service'];
  try {
    var wanted = new URLSearchParams(window.location.search).get('service');
    if (wanted) {
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value === wanted) { select.selectedIndex = i; break; }
      }
    }
  } catch (e) {}

  function cleanPhone(raw) {
    var d = raw.replace(/[\s\-().]/g, '');
    if (d.indexOf('+91') === 0) d = d.slice(3);
    else if (d.indexOf('0091') === 0) d = d.slice(4);
    else if (d.indexOf('91') === 0 && d.length === 12) d = d.slice(2);
    else if (d.charAt(0) === '0') d = d.slice(1);
    return d;
  }
  function setBad(field, bad) { field.classList.toggle('bad', bad); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements['name'].value.trim();
    var phone = cleanPhone(form.elements['phone'].value);
    var service = select.value;
    var message = form.elements['message'].value.trim();

    var okName = name.length >= 2;
    var okPhone = /^[6-9]\d{9}$/.test(phone);
    var okService = service !== '';
    setBad(form.elements['name'].closest('.field'), !okName);
    setBad(form.elements['phone'].closest('.field'), !okPhone);
    setBad(select.closest('.field'), !okService);
    if (!okName) { form.elements['name'].focus(); return; }
    if (!okPhone) { form.elements['phone'].focus(); return; }
    if (!okService) { select.focus(); return; }

    var text = 'Hello SK Wheels Multibrand Workshop,\n\n' +
      'I would like to enquire about your car service.\n\n' +
      'Name: ' + name + '\n' +
      'Phone: +91 ' + phone + '\n' +
      'Service Required: ' + service + '\n' +
      'Message: ' + (message || 'Not provided') + '\n\n' +
      'Please contact me regarding this service.';

    window.location.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  });
})();
