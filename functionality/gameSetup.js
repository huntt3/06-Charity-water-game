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

Runner.stop(runner);

// Improve collision detection by increasing the simulation's constraint iterations and time step
engine.positionIterations = 12; // default is 6
engine.velocityIterations = 12; // default is 4
engine.constraintIterations = 6; // default is 2
engine.timing.timeScale = 1;