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