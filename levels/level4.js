// level4.js - Procedurally generated pinball level
// The goal is to get the ball to the waterCan using flippers, bumpers, ramps, and a plunger

// Ball
const ball = Bodies.circle(130, 60, 16, {
    restitution: 0.45,
    render: { fillStyle: 'deepskyblue' }
});
Composite.add(world, ball);

// Water can (goal)
const waterCanObj = new WaterCan(340, 60, 40, 40, world, Matter);
const waterCan = waterCanObj.body;

// Plunger in bottom left
const plunger = new Plunger(40, 370, 16, 48, world, Matter, ball);

// Walls
const wallTop = new Wall(200, 0, 400, 20, world, Matter);
const wallLeft = new Wall(0, 200, 20, 400, world, Matter);
const wallRight = new Wall(400, 200, 20, 400, world, Matter);

// Bumpers
const bumper1 = new Bumper(120, 120, 16, world, Matter);
bumper1.body.restitution = 1.2;
const bumper2 = new Bumper(200, 200, 16, world, Matter);
bumper2.body.restitution = 1.2;
const bumper3 = new Bumper(280, 120, 16, world, Matter);
bumper3.body.restitution = 1.2;

// Flippers
const flipperLength = 70;
const flipperWidth = 16;
const flipperY = 340;
const leftFlipperObj = new LeftFlipper(120, flipperY, flipperLength, flipperWidth, world, Matter);
const rightFlipperObj = new RightFlipper(280, flipperY, flipperLength, flipperWidth, world, Matter);
const leftFlipper = leftFlipperObj.body;
const rightFlipper = rightFlipperObj.body;
Body.setAngularVelocity(leftFlipper, 0);
Body.setAngularVelocity(rightFlipper, 0);

// Ramps
const rampLeft = new Ramp(60, 250, 100, 16, Math.PI / 4, '#BBDEB2', world, Matter);
const rampRight = new Ramp(340, 250, 100, 16, -Math.PI / 4, '#BBDEB2', world, Matter);
