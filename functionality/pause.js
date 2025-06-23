// Pause physics engine while pauseModal is open, resume when closed
const pauseModalEl = document.getElementById('pauseModal');
if (pauseModalEl) {
  pauseModalEl.addEventListener('show.bs.modal', function() {
    Runner.stop(runner);
  });
  pauseModalEl.addEventListener('hidden.bs.modal', function() {
    if(!runner.enabled){
      Runner.run(runner, engine);
    }
  });
}
