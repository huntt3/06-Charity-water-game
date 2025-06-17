window.addEventListener('DOMContentLoaded', () => {
        const giantBox = document.getElementById('giant-box');
        if (giantBox) {
          setTimeout(() => {
            giantBox.remove();
          }, 4000);
        }
        setTimeout(() => {
          const element = document.getElementById("logo-fade-img");
          element.remove();
        }, 4000);
      });