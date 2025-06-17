// Use Matter.js for pinball physics
// Make sure Matter.js is loaded via CDN in index.html

// Alias Matter.js modules for easier use
const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;
const Events = Matter.Events;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

// Create engine and world
const engine = Engine.create();
const world = engine.world;

// Set up renderer for the canvas
const render = Render.create({
    element: document.getElementById('game-container'),
    engine: engine,
    options: {
        width: 400,
        height: 400,
        wireframes: false,
        background: '#F8EED3'
    }
});
Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Ball bearing
const ball = Bodies.circle(130, 60, 16, {
    restitution: 0.8,
    render: { fillStyle: 'deepskyblue' }
});
Composite.add(world, ball);

// Walls
const walls = [
    Bodies.rectangle(200, 0, 400, 20, { isStatic: true }), // top
    /*Bodies.rectangle(200, 400, 400, 20, { isStatic: true }),*/ // bottom
    Bodies.rectangle(0, 200, 20, 400, { isStatic: true }), // left
    Bodies.rectangle(400, 200, 20, 400, { isStatic: true }) // right
];
Composite.add(world, walls);

// Flipper properties
const flipperLength = 70;
const flipperWidth = 16;
const flipperY = 340;

// Left flipper
const leftFlipper = Bodies.rectangle(120, flipperY, flipperLength, flipperWidth, {
    isStatic: false,
    chamfer: { radius: 8 },
    render: { fillStyle: '#F16061' }
});
const leftHinge = Constraint.create({
    bodyA: leftFlipper,
    pointB: { x: 85, y: flipperY },
    pointA: { x: -flipperLength/2 + 5, y: 0 },
    stiffness: 1,
    length: 0
});
Composite.add(world, [leftFlipper, leftHinge]);

// Right flipper
const rightFlipper = Bodies.rectangle(280, flipperY, flipperLength, flipperWidth, {
    isStatic: false,
    chamfer: { radius: 8 },
    render: { fillStyle: '#F16061' }
});
const rightHinge = Constraint.create({
    bodyA: rightFlipper,
    pointB: { x: 315, y: flipperY },
    pointA: { x: flipperLength/2 - 5, y: 0 },
    stiffness: 1,
    length: 0
});
Composite.add(world, [rightFlipper, rightHinge]);

// Make flippers static until game starts
Body.setAngularVelocity(leftFlipper, 0);
Body.setAngularVelocity(rightFlipper, 0);

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

// Add mouse drag functionality for the ball using Matter.js MouseConstraint
// Create a mouse object for the renderer
const mouse = Mouse.create(render.canvas);

// Create a mouse constraint that only allows dragging the ball
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    },
    // Only allow the ball to be draggable
    collisionFilter: {
        mask: ball.collisionFilter.category
    }
});
Composite.add(world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Add the water can as a static sensor body in the center
const waterCan = Bodies.rectangle(300, 200, 40, 40, {
    isStatic: true,
    isSensor: true, // so the ball passes through
    render: { sprite: { texture: '../img/water-can-transparent.png', xScale: 4/40, yScale: 4/40 } }
});
Composite.add(world, waterCan);

// Add end ramps as static bodies for collision, sloping toward the flippers
const rampEndLeft = Bodies.rectangle(40, 250, 100, 16, {
    isStatic: true,
    angle: Math.PI / 3, // ~36 degrees
    chamfer: { radius: 8 },
    render: { fillStyle: '#4FCB53' }
});
const rampEndRight = Bodies.rectangle(360, 250, 100, 16, {
    isStatic: true,
    angle: -Math.PI / 3, // ~-36 degrees
    chamfer: { radius: 8 },
    render: { fillStyle: '#4FCB53' }
});
Composite.add(world, [rampEndLeft, rampEndRight]);

// Increase flipper density and restitution to improve collision reliability
Body.setDensity(leftFlipper, 0.1); // higher density
Body.setDensity(rightFlipper, 0.1);
leftFlipper.restitution = .25;
rightFlipper.restitution = .25;

// Improve collision detection by increasing the simulation's constraint iterations and time step
engine.positionIterations = 12; // default is 6
engine.velocityIterations = 12; // default is 4
engine.constraintIterations = 6; // default is 2
engine.timing.timeScale = 1;

// Optionally, make the ball slightly less bouncy to help with stability
ball.restitution = 0.45;

// Helper to open the modal and trigger confetti
function showCongratulationsModal() {
    // Pause physics
    Runner.stop(runner);
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('congratsModal'));
    modal.show();
    // Trigger confetti
    if (window.confetti) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}

// Only trigger once
let goalReached = false;
Events.on(engine, 'collisionStart', function(event) {
    if (goalReached) return;
    for (const pair of event.pairs) {
        if ((pair.bodyA === ball && pair.bodyB === waterCan) || (pair.bodyB === ball && pair.bodyA === waterCan)) {
            goalReached = true;
            showCongratulationsModal();
        }
    }
});

// Detect if the ball leaves the canvas (stage) and show failure modal
Events.on(engine, 'afterUpdate', function() {
    if (!goalReached && (
        ball.position.x < -30 || ball.position.x > 430 ||
        ball.position.y < -30 || ball.position.y > 430
    )) {
        Runner.stop(runner);
        const modal = new bootstrap.Modal(document.getElementById('failureModal'));
        modal.show();
        goalReached = true;
    }
});

// Retry button functionality
document.addEventListener('DOMContentLoaded', function() {
  function resetGame() {
    // Reset ball position and velocity
    Runner.stop(runner);
    Matter.Body.setPosition(ball, { x: 140, y: 60 });
    Matter.Body.setVelocity(ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(ball, 0);
    // Reset flipper positions and velocities
    Matter.Body.setAngle(leftFlipper, 0);
    Matter.Body.setAngularVelocity(leftFlipper, 0);
    Matter.Body.setAngle(rightFlipper, 0);
    Matter.Body.setAngularVelocity(rightFlipper, 0);
    // Reset goal state
    goalReached = false;
    // Resume physics
    Runner.run(runner, engine);
    // Hide all modals if open
    ['congratsModal', 'pauseModal', 'failureModal'].forEach(id => {
      const modalEl = document.getElementById(id);
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    });
  }

  // Retry buttons
  const retryBtn = document.getElementById('retry-btn');
  if (retryBtn) retryBtn.addEventListener('click', resetGame);
  const retryBtnTop = document.getElementById('retry-btn-top');
  if (retryBtnTop) retryBtnTop.addEventListener('click', resetGame);
  const retryBtnPause = document.getElementById('retry-btn-pause');
  if (retryBtnPause) retryBtnPause.addEventListener('click', resetGame);
  const retryBtnFailure = document.getElementById('retry-btn-failure');
  if (retryBtnFailure) retryBtnFailure.addEventListener('click', resetGame);

  // Pause button
  const pauseBtnTop = document.getElementById('pause-btn-top');
  if (pauseBtnTop) {
    pauseBtnTop.addEventListener('click', function() {
      Runner.stop(runner);
      const modal = new bootstrap.Modal(document.getElementById('pauseModal'));
      modal.show();
    });
  }

  // Keyboard shortcut: press 'r' to reset
  document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') {
      resetGame();
    }
  });
});

// On first load, pause the physics engine until instructionsModal is closed
Runner.stop(runner);
// Pause physics engine while instructionsModal is open, resume when closed
const instructionsModalEl = document.getElementById('instructionsModal');
const instructionsModal = new bootstrap.Modal(instructionsModalEl, { backdrop: 'static', keyboard: true });
instructionsModal.show();
if (instructionsModalEl) {
  instructionsModalEl.addEventListener('show.bs.modal', function() {
    Runner.stop(runner);
  });
  instructionsModalEl.addEventListener('hidden.bs.modal', function() {
    Runner.run(runner, engine);
  });
}

// Instructions button
const instructionsBtn = document.getElementById('instructions-btn-top');
if (instructionsBtn) {
  instructionsBtn.addEventListener('click', function() {
    const modal = new bootstrap.Modal(document.getElementById('instructionsModal'));
    modal.show();
  });
}