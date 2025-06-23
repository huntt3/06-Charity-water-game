// --- Cookie Helpers ---
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Show the correct star(s) and save result in cookie
function showLevel1Star() {
  const star1 = document.getElementById('star1');
  const star2 = document.getElementById('star2');
  const difficultySwitch = document.getElementById('difficulty-switch');
  let val = getCookie('level1star') || '';
  if (difficultySwitch && difficultySwitch.checked) {
    // Hard mode
    if (!val.includes('2')) val += '2';
    if (star2) star2.style.visibility = 'visible';
  } else {
    // Easy mode
    if (!val.includes('1')) val += '1';
    if (star1) star1.style.visibility = 'visible';
  }
  // Sort and deduplicate
  val = Array.from(new Set(val.split(''))).sort().join('');
  setCookie('level1star', val);
}

// On page load, show star(s) if cookie exists
window.addEventListener('DOMContentLoaded', function() {
  const star1 = document.getElementById('star1');
  const star2 = document.getElementById('star2');
  const val = getCookie('level1star') || '';
  if (val.includes('1') && star1) star1.style.visibility = 'visible';
  if (val.includes('2') && star2) star2.style.visibility = 'visible';
});

// Helper to open the modal and trigger confetti
function showCongratulationsModal() {
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('congratsModal'), { backdrop: 'static', keyboard: true });
    modal.show();
    // Trigger confetti
    if (window.confetti) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}

// Only trigger once
let goalReached = false;
// Make sure to always use window.waterCan in collision checks
Events.on(engine, 'collisionStart', function(event) {
    playRandomWaterDropSound();
    if (goalReached) return;
    for (const pair of event.pairs) {
        if ((pair.bodyA === ball && pair.bodyB === window.waterCan) || (pair.bodyB === ball && pair.bodyA === window.waterCan)) {
            goalReached = true;
            // Pause physics
            Runner.stop(runner);
            showCongratulationsModal();
            splash = new Audio('../sounds/waterSplashUniversfield.wav')
            splash.play();
            showLevel1Star(); // Show the correct star and save result
        }
    }
});