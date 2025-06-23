
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
Events.on(engine, 'collisionStart', function(event) {
    playRandomWaterDropSound();
    if (goalReached) return;
    for (const pair of event.pairs) {
        if ((pair.bodyA === ball && pair.bodyB === waterCan) || (pair.bodyB === ball && pair.bodyA === waterCan)) {
            goalReached = true;
            // Pause physics
            Runner.stop(runner);
            showCongratulationsModal();
            splash = new Audio('../sounds/waterSplashUniversfield.wav')
            splash.play();
        }
    }
});