let levelNumber = location.href.split("/level").slice(-1)[0];
levelNumber = levelNumber.slice(0, -5);

let nextLevelNumber = levelNumber;
if(nextLevelNumber!= "10"){
  nextLevelNumber++;
}
else{
  nextLevelNumber = 1;
}


const modals = document.createElement("div");
modals.innerHTML = `
<!-- Congratulations Modal -->
    <div class="modal fade" id="congratsModal" tabindex="-1" aria-labelledby="congratsModalLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title w-100 text-center" id="congratsModalLabel">Congratulations!</h5>
          </div>
          <div class="modal-body text-center">
            <p class="fs-4">You completed Level ${levelNumber}!</p>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button type="button" class="index-btn" id="retry-btn">Retry</button>
            <a href="./level${nextLevelNumber}.html" class="index-btn">Next Level</a>
            <a href="../levelSelector.html" class="index-btn">Level Selector</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pause Modal -->
    <div class="modal fade" id="pauseModal" tabindex="-1" aria-labelledby="pauseModalLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title w-100 text-center" id="pauseModalLabel">Paused</h5>
            <button type="button" class="btn-close position-absolute end-0 top-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button type="button" class="index-btn" id="retry-btn-pause">Retry</button>
            <a href="./level${nextLevelNumber}.html" class="index-btn">Next Level</a>
            <a href="../levelSelector.html" class="index-btn">Level Selector</a>
          </div>
          <div class="modal-footer justify-content-center border-0 flex-column align-items-center gap-3">
            <div class="volume-control" style="width: 80%; max-width: 300px;">
              <label for="music-volume" class="form-label d-flex align-items-center gap-2">
                <span id="music-icon" class="material-symbols-outlined" aria-label="Music volume">music_note</span>
                Music
              </label>
              <input type="range" class="form-range" id="music-volume" min="0" max="1" step="0.01" value="1" aria-valuetext="Music volume slider">
            </div>
            <div class="volume-control" style="width: 80%; max-width: 300px;">
              <label for="sfx-volume" class="form-label d-flex align-items-center gap-2">
                <span id="sfx-icon" class="material-symbols-outlined" aria-label="Sound effects volume">volume_up</span>
                Sound Effects
              </label>
              <input type="range" class="form-range" id="sfx-volume" min="0" max="1" step="0.01" value="1" aria-valuetext="Sound effects volume slider">
            </div>
            <div class="difficulty-toggle d-flex flex-column align-items-center mb-2" style="width: 80%; max-width: 300px;">
              <label class="form-label d-flex align-items-center gap-2" for="difficulty-switch">
                <span class="fw-bold">Difficulty:</span>
                <span id="difficulty-label" class="ms-2">Easy</span>
              </label>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="difficulty-switch" aria-checked="false" aria-label="Toggle difficulty">
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <a href="https://www.charitywater.org/" class="index-btn" target="_blank" rel="noopener noreferrer">Learn more about Charity: Water</a>
            <a href="https://www.charitywater.org/donate" class="index-btn" target="_blank" rel="noopener noreferrer">Donate to Charity: Water</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Failure Modal -->
    <div class="modal fade" id="failureModal" tabindex="-1" aria-labelledby="failureModalLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title w-100 text-center" id="failureModalLabel">Try Again!</h5>
          </div>
          <div class="modal-body text-center">
            <p class="fs-4">Better luck next time!</p>
          </div>
          <div class="modal-footer justify-content-center border-0">
            <button type="button" class="index-btn" id="retry-btn-failure">Retry</button>
            <a href="./level${nextLevelNumber}.html" class="index-btn">Next Level</a>
            <a href="../levelSelector.html" class="index-btn">Level Selector</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Instructions Modal -->
    <div class="modal fade" id="instructionsModal" tabindex="-1" aria-labelledby="instructionsModalLabel" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title w-100 text-center" id="instructionsModalLabel">Instructions</h5>
            <button type="button" class="btn-close position-absolute end-0 top-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <p class="fs-5">Press <strong>space</strong> to move flippers.<br> Press <strong>R</strong> to reset the level.<br>The Charity: Water Jerry Can is the goal.</p>
          </div>
        </div>
      </div>
    </div>
    ${levelNumber}${nextLevelNumber}`;
document.body.appendChild(modals);