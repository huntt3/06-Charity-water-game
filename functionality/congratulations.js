// Helper to open the modal and trigger confetti
export default function showCongratulationsModal() {
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('congratsModal'), { backdrop: 'static', keyboard: true });
    modal.show();
    // Trigger confetti
    if (window.confetti) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}