//Credits:

//Matter.js
//Bootstrap
//Alex_Jauk | Water Drops Splashing | https://pixabay.com/sound-effects/water-drops-splashing-228918/
//Universfield | Water Splash | https://pixabay.com/sound-effects/water-splash-199583/
//lofidreams99 | Rainy Lofi City | https://pixabay.com/music/beats-rainy-lofi-city-lofi-music-332746/

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