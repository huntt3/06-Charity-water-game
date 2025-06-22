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
