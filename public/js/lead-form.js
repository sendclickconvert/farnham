// Contact form enhancement. Without JavaScript the form still POSTs to /api/lead (and the
// server redirects to /thank-you). With it: stamp the load time (bots submit instantly),
// send the form in the background, and show a plain error with the phone number on failure.
(function () {
  var form = document.querySelector('form[data-form="lead"]');
  if (!form) return;
  var stamp = form.querySelector('input[name="t"]');
  if (stamp) stamp.value = String(Date.now());
  var errorBox = form.querySelector('[data-form-error]');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (errorBox) errorBox.classList.add('hidden');
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(form)),
      headers: { Accept: 'application/json' },
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && res.j && res.j.ok) { window.location.assign('/thank-you'); return; }
        throw new Error('rejected');
      })
      .catch(function () {
        if (errorBox) errorBox.classList.remove('hidden');
        if (button) { button.disabled = false; button.textContent = 'Request my call'; }
        if (window.turnstile) { try { window.turnstile.reset(); } catch (e) {} }
      });
  });
})();
