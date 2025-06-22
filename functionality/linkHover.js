//Credits:

//Matter.js
//Bootstrap
//Alex_Jauk | Water Drops Splashing | https://pixabay.com/sound-effects/water-drops-splashing-228918/
//Universfield | Water Splash | https://pixabay.com/sound-effects/water-splash-199583/

// --- Water Drop Sound Logic ---
// Get audio elements for the three water drop sounds
const waterDropSounds = [
  drop1 = new Audio('../sounds/waterDrop1Alex_Jauk.wav'),
  drop2 = new Audio('../sounds/waterDrop2Alex_Jauk.wav'),
  drop3 = new Audio('../sounds/waterDrop3Alex_Jauk.wav')
];

let canPlaySound = true;

// Track SFX volume globally
let sfxVolume = 1;

// Helper to update SFX volume for all water drop sounds
function setSFXVolume(vol) {
  sfxVolume = vol;
  waterDropSounds.forEach(snd => { if (snd) snd.volume = vol; });
}
// Update waterDropSounds and SFX volume after DOM is loaded
// and allow external scripts to call setSFXVolume
window.setSFXVolume = setSFXVolume;
document.addEventListener('DOMContentLoaded', () => {
  sfxSounds = [
    document.getElementById('waterDrop1'),
    document.getElementById('waterDrop2'),
    document.getElementById('waterDrop3'),
    document.getElementById()
  ];
  setSFXVolume(sfxVolume);
});

// Function to play a random water drop sound
const playRandomWaterDropSound = () => {
    if(canPlaySound){
      // Pick a random sound
      const randomIndex = Math.floor(Math.random() * waterDropSounds.length);
      const sound = waterDropSounds[randomIndex];
      // Reset sound to start and play
      sound.currentTime = 0;
      sound.play();
      // Prevent another sound for 0.3 seconds
      canPlaySound = false;
      setTimeout(() => {
        canPlaySound = true;
      }, 100);
  }
}

// --- Play water drop sound on button hover for accessibility and fun ---
document.addEventListener('DOMContentLoaded', () => {
  // Select all buttons with class 'index-btn' or 'level-btn'
  const soundButtons = [
    ...document.querySelectorAll('.index-btn'),
    ...document.querySelectorAll('.level-btn')
  ];
  // Add mouseenter event to play sound on hover
  soundButtons.forEach(btn => {
    btn.addEventListener('mouseenter', playRandomWaterDropSound);
  });
});
playRandomWaterDropSound();

// --- Volume Controls for Pause Modal ---
document.addEventListener('DOMContentLoaded', function() {
  // Music volume slider
  const musicSlider = document.getElementById('music-volume');
  const musicIcon = document.getElementById('music-icon');
  // SFX volume slider
  const sfxSlider = document.getElementById('sfx-volume');
  const sfxIcon = document.getElementById('sfx-icon');
  // Music audio (from global music.js)
  const music = window._charityWaterMusic;
  // Water splash SFX (if you have one, add its element here)
  const waterSplash = document.getElementById('waterSplash');
  // Helper to set SFX volume
  function setSFXVolume(vol) {
    waterDropSounds.forEach(snd => { if (snd) snd.volume = vol; });
    waterSplash.volume = vol;
  }
  // Update music volume and icon
  musicSlider.addEventListener('input', function() {
    if (music) music.volume = parseFloat(this.value);
    if (this.value == '0') {
      musicIcon.textContent = 'music_off';
    } else {
      musicIcon.textContent = 'music_note';
    }
  });
  // Update SFX volume and icon
  sfxSlider.addEventListener('input', function() {
    if (window.setSFXVolume) window.setSFXVolume(parseFloat(this.value));
    if (this.value == '0') {
      sfxIcon.textContent = 'volume_off';
    } else {
      sfxIcon.textContent = 'volume_up';
    }
  });
  // Set initial volumes
  if (music) music.volume = parseFloat(musicSlider.value);
  if (window.setSFXVolume) window.setSFXVolume(parseFloat(sfxSlider.value));
});

document.addEventListener('DOMContentLoaded', function() {
  if (window.startMusic) {
    window.startMusic();
  }
});