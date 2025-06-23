//Credits:

//Matter.js
//Bootstrap
//Alex_Jauk | Water Drops Splashing | https://pixabay.com/sound-effects/water-drops-splashing-228918/
//Universfield | Water Splash | https://pixabay.com/sound-effects/water-splash-199583/
//lofidreams99 | Rainy Lofi City | https://pixabay.com/music/beats-rainy-lofi-city-lofi-music-332746/



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

// Ball bearing
const ball = Bodies.circle(130, 60, 16, {
    restitution: 0.45,
    render: { fillStyle: 'deepskyblue' }
});
Composite.add(world, ball);

// Add the water can as a static sensor body in the center
const waterCan = Bodies.rectangle(300, 200, 40, 40, {
    isStatic: true,
    isSensor: true, // so the ball passes through
    render: { sprite: { texture: '../img/water-can-transparent.png', xScale: 4/40, yScale: 4/40 } }
});
Composite.add(world, waterCan);

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

// Create ramps using Ramp class
const rampEndLeftObj = new Ramp(40, 250, 100, 16, Math.PI / 3, '#4FCB53', world, Matter);
const rampEndRightObj = new Ramp(360, 250, 100, 16, -Math.PI / 3, '#4FCB53', world, Matter);

// Improve collision detection by increasing the simulation's constraint iterations and time step
engine.positionIterations = 12; // default is 6
engine.velocityIterations = 12; // default is 4
engine.constraintIterations = 6; // default is 2
engine.timing.timeScale = 1;