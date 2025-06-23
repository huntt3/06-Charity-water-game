// --- Difficulty Toggle Logic ---
document.addEventListener('DOMContentLoaded', function() {
  const difficultySwitch = document.getElementById('difficulty-switch');
  const difficultyLabel = document.getElementById('difficulty-label');
  if (difficultySwitch && difficultyLabel) {
    difficultySwitch.addEventListener('change', function() {
      if (this.checked) {
        difficultyLabel.textContent = 'Hard';
        this.setAttribute('aria-checked', 'true');
        // TODO: Add logic to make the game harder
      } else {
        difficultyLabel.textContent = 'Easy';
        this.setAttribute('aria-checked', 'false');
        // TODO: Add logic to make the game easier
      }
    });
  }
});