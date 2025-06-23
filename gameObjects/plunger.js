// Plunger class for pinball game
// This class creates a plunger that retracts when holding space and launches the ball when released
// Uses Matter.js for physics

class Plunger {
  constructor(x, y, width, height, world, Matter, ball) {
    // Store references
    this.Matter = Matter;
    this.world = world;
    this.ball = ball;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isRetracting = false;
    this.maxRetract = 60; // Max distance to retract
    this.retractSpeed = 2; // Pixels per frame
    this.springPower = 0;
    this.maxSpringPower = 18; // Max launch force
    // Create the plunger body as a dynamic body
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: false, // Dynamic so collisions work
      inertia: Infinity, // Prevent rotation
      friction: 1,
      frictionStatic: 1,
      frictionAir: 0.05,
      render: { fillStyle: '#1976D2' },
      label: 'plunger'
    });
    // Constrain the plunger to only move vertically (like a pinball spring)
    this.constraint = Matter.Constraint.create({
      bodyA: this.body,
      pointB: { x: x, y: y },
      length: 0,
      stiffness: 1
    });
    Matter.Composite.add(world, [this.body, this.constraint]);
    // Listen for spacebar events
    this._addEventListeners();
  }

  _addEventListeners() {
    // Use arrow functions to keep 'this' context
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.isRetracting) {
        this.isRetracting = true;
        this.springPower = 0;
        this._retract();
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space' && this.isRetracting) {
        this.isRetracting = false;
        this._launch();
        this._resetPlunger();
      }
    });
  }

  _retract() {
    // Retract the plunger while space is held
    if (!this.isRetracting) return;
    const { Body } = this.Matter;
    // Only allow the plunger to move down to maxRetract
    if (this.body.position.y < this.y + this.maxRetract) {
      // Apply a downward force to retract
      Body.applyForce(this.body, this.body.position, { x: 0, y: 0.02 });
      // Increase spring power (capped)
      this.springPower = Math.min(this.springPower + 0.4, this.maxSpringPower);
      requestAnimationFrame(() => this._retract());
    }
  }

  _launch() {
    // Launch the ball by applying a force upward if the ball is close to the plunger
    const { Body } = this.Matter;
    // Check if ball is close to plunger (simple distance check)
    const dx = this.ball.position.x - this.body.position.x;
    const dy = this.ball.position.y - this.body.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 40) {
      // Apply force upward (negative y)
      Body.applyForce(this.ball, this.ball.position, {
        x: 0,
        y: -this.springPower * 0.002
      });
    }
  }

  _resetPlunger() {
    // Let the constraint pull the plunger back to its original position
    // No need to manually set position
  }
}