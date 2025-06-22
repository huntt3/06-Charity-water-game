//lofidreams99 | Rainy Lofi City | https://pixabay.com/music/beats-rainy-lofi-city-lofi-music-332746/

// Modular music player for all pages
// Uses cookies to remember where the user left off in the song

(function() {
  // Determine correct path for music file based on current page location
  let musicPath = './sounds/rainyLofiCityLofidream99.mp3';
  if (window.location.pathname.includes('/levels/')) {
    musicPath = '../sounds/rainyLofiCityLofidream99.mp3';
  }
  // Only create one global music instance
  if (!window._charityWaterMusic) {
    const music = new Audio(musicPath);
    music.loop = true;
    music.volume = 1;
    window._charityWaterMusic = music;
  }
  const music = window._charityWaterMusic;

  // Helper to get a cookie value by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Helper to set a cookie
  function setCookie(name, value, days = 1) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // Start music and restore position from cookie
  function startMusic() {
    // Get last position from cookie
    const lastTime = parseFloat(getCookie('musicTime'));
    if (!isNaN(lastTime)) {
      music.currentTime = lastTime;
    }
    // Play music if allowed by browser
    music.play().catch(() => {
      // Some browsers block autoplay, so wait for user interaction
      document.addEventListener('click', () => {
        music.play();
      }, { once: true });
    });
  }

  // Save current time to cookie every 2 seconds
  setInterval(() => {
    setCookie('musicTime', music.currentTime);
  }, 2000);

  // Also save when user leaves the page
  window.addEventListener('beforeunload', () => {
    setCookie('musicTime', music.currentTime);
  });

  // Export startMusic for use in other scripts
  window.startMusic = startMusic;
})();