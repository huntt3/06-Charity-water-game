// Ensure physics resumes when any .btn-close is clicked (for accessibility and mobile)
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', function() {
    Runner.run(runner, engine);
  });
});
