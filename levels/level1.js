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

// Import OOP game objects
//import LeftFlipper from '../gameObjects/leftFlipper.js';
//import RightFlipper from '../gameObjects/rightFlipper.js';
//import Wall from '../gameObjects/wall.js';
//import Ramp from '../gameObjects/ramp.js';

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

// Ball bearing
const ball = Bodies.circle(130, 60, 16, {
    restitution: 0.8,
    render: { fillStyle: 'deepskyblue' }
});
Composite.add(world, ball);

// Wall class for modular OOP
class Wall {
  constructor(x, y, width, height, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, { isStatic: true });
    Matter.Composite.add(world, this.body);
  }
}

// LeftFlipper class for modular OOP
class LeftFlipper {
  constructor(x, y, length, width, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, length, width, {
      isStatic: false,
      chamfer: { radius: 8 },
      render: { fillStyle: '#F16061' }
    });
    this.hinge = Matter.Constraint.create({
      bodyA: this.body,
      pointB: { x: x - length/2 + 5, y: y },
      pointA: { x: -length/2 + 5, y: 0 },
      stiffness: 1,
      length: 0
    });
    Matter.Composite.add(world, [this.body, this.hinge]);
    Matter.Body.setAngularVelocity(this.body, 0);
    Matter.Body.setDensity(this.body, 0.1);
    this.body.restitution = 0.25;
  }
}

// RightFlipper class for modular OOP
class RightFlipper {
  constructor(x, y, length, width, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, length, width, {
      isStatic: false,
      chamfer: { radius: 8 },
      render: { fillStyle: '#F16061' }
    });
    this.hinge = Matter.Constraint.create({
      bodyA: this.body,
      pointB: { x: x + length/2 - 5, y: y },
      pointA: { x: length/2 - 5, y: 0 },
      stiffness: 1,
      length: 0
    });
    Matter.Composite.add(world, [this.body, this.hinge]);
    Matter.Body.setAngularVelocity(this.body, 0);
    Matter.Body.setDensity(this.body, 0.1);
    this.body.restitution = 0.25;
  }
}

// Ramp class for modular OOP
class Ramp {
  constructor(x, y, width, height, angle, color, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      angle: angle,
      chamfer: { radius: 8 },
      render: { fillStyle: color }
    });
    Matter.Composite.add(world, this.body);
  }
}

// Create walls using Wall class
const wallTop = new Wall(200, 0, 400, 20, world, Matter);
const wallLeft = new Wall(0, 200, 20, 400, world, Matter);
const wallRight = new Wall(400, 200, 20, 400, world, Matter);

// Flipper properties
const flipperLength = 70;
const flipperWidth = 16;
const flipperY = 340;

// Create flippers using OOP classes
const leftFlipperObj = new LeftFlipper(120, flipperY, flipperLength, flipperWidth, world, Matter);
const rightFlipperObj = new RightFlipper(280, flipperY, flipperLength, flipperWidth, world, Matter);
const leftFlipper = leftFlipperObj.body;
const rightFlipper = rightFlipperObj.body;

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

// Add the water can as a static sensor body in the center
const waterCan = Bodies.rectangle(300, 200, 40, 40, {
    isStatic: true,
    isSensor: true, // so the ball passes through
    render: { sprite: { texture: '../img/water-can-transparent.png', xScale: 4/40, yScale: 4/40 } }
});
Composite.add(world, waterCan);

// Create ramps using Ramp class
const rampEndLeftObj = new Ramp(40, 250, 100, 16, Math.PI / 3, '#4FCB53', world, Matter);
const rampEndRightObj = new Ramp(360, 250, 100, 16, -Math.PI / 3, '#4FCB53', world, Matter);

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
    const modal = new bootstrap.Modal(document.getElementById('congratsModal'), { backdrop: 'static', keyboard: true });
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
        const modal = new bootstrap.Modal(document.getElementById('failureModal'), { backdrop: 'static', keyboard: true });
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
    ['congratsModal', 'pauseModal', 'failureModal', 'instructionsModal'].forEach(id => {
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
      const modal = new bootstrap.Modal(document.getElementById('pauseModal'), { backdrop: 'static', keyboard: true });
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
    if(!runner.enabled){
      Runner.run(runner, engine);
    }
  });
}

// Pause physics engine while pauseModal is open, resume when closed
const pauseModalEl = document.getElementById('pauseModal');
if (pauseModalEl) {
  pauseModalEl.addEventListener('show.bs.modal', function() {
    Runner.stop(runner);
  });
  pauseModalEl.addEventListener('hidden.bs.modal', function() {
    if(!runner.enabled){
      Runner.run(runner, engine);
    }
  });
}

// Instructions button
const instructionsBtn = document.getElementById('instructions-btn-top');
if (instructionsBtn) {
  instructionsBtn.addEventListener('click', function() {
    const instructionsModal = new bootstrap.Modal(instructionsModalEl, { backdrop: 'static', keyboard: true });
    instructionsModal.show();
  });
}

// Ensure physics resumes when any .btn-close is clicked (for accessibility and mobile)
document.querySelectorAll('.btn-close').forEach(btn => {
  btn.addEventListener('click', function() {
    Runner.run(runner, engine);
  });
});