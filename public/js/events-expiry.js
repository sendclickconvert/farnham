// Medicare 101 sessions: hide any session whose end time has passed, in the visitor's browser,
// so the list stays correct between site updates. Without JavaScript the list is still the
// one built at the last update.
(function () {
  var wrap = document.querySelector('[data-sessions]');
  if (!wrap) return;
  var now = Date.now();
  var cards = wrap.querySelectorAll('[data-session-end]');
  var left = 0;
  for (var i = 0; i < cards.length; i++) {
    var end = Date.parse(cards[i].getAttribute('data-session-end'));
    if (end && end <= now) cards[i].style.display = 'none';
    else left++;
  }
  if (left === 0) {
    wrap.style.display = 'none';
    var empty = document.querySelector('[data-no-sessions-later]');
    if (empty) empty.classList.remove('hidden');
  }
})();
