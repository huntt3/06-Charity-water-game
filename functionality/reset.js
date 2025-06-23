// Retry button functionality
document.addEventListener('DOMContentLoaded', function() {
  function resetGame() {
    // Reset ball position and velocity
    Runner.stop(runner);
    Matter.Body.setPosition(ball, { x: 140, y: 60 });
    Matter.Body.setVelocity(ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(ball, 0);
    // Reset flipper positions and velocities
    Matter.Body.setAngle(leftFlipper, 0);
    Matter.Body.setAngularVelocity(leftFlipper, 0);
    Matter.Body.setAngle(rightFlipper, 0);
    Matter.Body.setAngularVelocity(rightFlipper, 0);
    // Reset goal state
    goalReached = false;
    // Resume physics
    Runner.run(runner, engine);
    // Hide all modals if open
    ['congratsModal', 'pauseModal', 'failureModal', 'instructionsModal'].forEach(id => {
      const modalEl = document.getElementById(id);
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    });
  }

  // Retry buttons
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) retryBtn.addEventListener('click', resetGame);
  const retryBtnTop = document.getElementById('retry-btn-top');
  if (retryBtnTop) retryBtnTop.addEventListener('click', resetGame);
  const retryBtnPause = document.getElementById('retry-btn-pause');
  if (retryBtnPause) retryBtnPause.addEventListener('click', resetGame);
  const retryBtnFailure = document.getElementById('retry-btn-failure');
  if (retryBtnFailure) retryBtnFailure.addEventListener('click', resetGame);

  // Pause button
  const pauseBtnTop = document.getElementById('pause-btn-top');
  if (pauseBtnTop) {
    pauseBtnTop.addEventListener('click', function() {
      Runner.stop(runner);
      const modal = new bootstrap.Modal(document.getElementById('pauseModal'), { backdrop: 'static', keyboard: true });
      modal.show();
    });
  }

  // Keyboard shortcut: press 'r' to reset
  document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') {
      resetGame();
    }
  });
});