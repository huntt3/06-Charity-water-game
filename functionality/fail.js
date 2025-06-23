// Detect if the ball leaves the canvas (stage) and show failure modal
Events.on(engine, 'afterUpdate', function() {
    if (!goalReached && (
        ball.position.x < -30 || ball.position.x > 430 ||
        ball.position.y < -30 || ball.position.y > 430
    )) {
        Runner.stop(runner);
        const modal = new bootstrap.Modal(document.getElementById('failureModal'), { backdrop: 'static', keyboard: true });
        modal.show();
        goalReached = true;
    }
});