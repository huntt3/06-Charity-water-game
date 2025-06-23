// Instructions button
const instructionsBtn = document.getElementById('instructions-btn-top');
if (instructionsBtn) {
  instructionsBtn.addEventListener('click', function() {
    const instructionsModal = new bootstrap.Modal(instructionsModalEl, { backdrop: 'static', keyboard: true });
    instructionsModal.show();
  });
}

// On first load, pause the physics engine until instructionsModal is closed

// Pause physics engine while instructionsModal is open, resume when closed
const instructionsModalEl = document.getElementById('instructionsModal');
const instructionsModal = new bootstrap.Modal(instructionsModalEl, { backdrop: 'static', keyboard: true });
if (instructionsModalEl) {
  instructionsModalEl.addEventListener('show.bs.modal', function() {
    Runner.stop(runner);
  });
  instructionsModalEl.addEventListener('hidden.bs.modal', function() {
    if(!runner.enabled){
      Runner.run(runner, engine);
    }
  });
}
