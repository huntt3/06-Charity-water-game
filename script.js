/*
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
        background: '#e0f7fa'
    }
});
Render.run(render);

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

// Ball bearing
const ball = Bodies.circle(200, 60, 16, {
    restitution: 0.8,
    render: { fillStyle: 'deepskyblue' }
});
Composite.add(world, ball);

// Walls
const walls = [
    Bodies.rectangle(200, 0, 400, 20, { isStatic: true }), // top
    Bodies.rectangle(200, 400, 400, 20, { isStatic: true }), // bottom
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
    render: { fillStyle: 'gray' }
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
    render: { fillStyle: 'gray' }
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
*/