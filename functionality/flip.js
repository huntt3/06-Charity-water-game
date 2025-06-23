// Flipper control
let flipping = false;
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        flipping = true;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        flipping = false;
    }
});

// Update flipper angles in the engine's beforeUpdate event
Events.on(engine, 'beforeUpdate', function() {
    // Left flipper: rotate up to -35deg, down to 0deg
    if (flipping) {
        Body.setAngularVelocity(leftFlipper, -0.25);
        Body.setAngularVelocity(rightFlipper, 0.25);
    } else {
        Body.setAngularVelocity(leftFlipper, 0.15);
        Body.setAngularVelocity(rightFlipper, -0.15);
    }
});

// Keep flippers within angle limits
Events.on(engine, 'afterUpdate', function() {
    // Left flipper
    const minLeft = -Math.PI/4; // -45deg
    const maxLeft = 0;
    if (leftFlipper.angle < minLeft) {
        Body.setAngle(leftFlipper, minLeft);
        Body.setAngularVelocity(leftFlipper, 0);
    } else if (leftFlipper.angle > maxLeft) {
        Body.setAngle(leftFlipper, maxLeft);
        Body.setAngularVelocity(leftFlipper, 0);
    }
    // Right flipper
    const maxRight = Math.PI/4; // 45deg
    const minRight = 0;
    if (rightFlipper.angle > maxRight) {
        Body.setAngle(rightFlipper, maxRight);
        Body.setAngularVelocity(rightFlipper, 0);
    } else if (rightFlipper.angle < minRight) {
        Body.setAngle(rightFlipper, minRight);
        Body.setAngularVelocity(rightFlipper, 0);
    }
});