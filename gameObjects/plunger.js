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
    // Create the plunger body
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      render: { fillStyle: '#1976D2' },
      label: 'plunger'
    });
    Matter.Composite.add(world, this.body);
    // Create a DOM element for the plunger for accessibility and visibility
    this.domElement = document.createElement('div');
    this.domElement.className = 'plunger';
    this.domElement.setAttribute('role', 'region');
    this.domElement.setAttribute('aria-label', 'Pinball plunger');
    // Ensure a game area container exists for the DOM plunger
    let gameArea = document.getElementById('game-area');
    if (!gameArea) {
      gameArea = document.createElement('main');
      gameArea.id = 'game-area';
      gameArea.setAttribute('tabindex', '0');
      gameArea.setAttribute('aria-label', 'Pinball game area');
      document.body.appendChild(gameArea);
    }
    // Add to the game area (assumes a container with id 'game-area' exists)
    gameArea.appendChild(this.domElement);
    // Listen for spacebar events
    this._addEventListeners();
    // Start syncing DOM with physics
    this._updateDomPosition();
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

  _updateDomPosition() {
    // Sync the DOM element with the Matter.js body position
    // Assumes the game area is 400x400 and uses absolute positioning
    this.domElement.style.position = 'absolute';
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.height = `${this.height}px`;
    this.domElement.style.left = `${this.body.position.x - this.width / 2}px`;
    this.domElement.style.top = `${this.body.position.y - this.height / 2}px`;
    this.domElement.style.background = '#1976D2';
    this.domElement.style.borderRadius = '6px';
    this.domElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    this.domElement.style.zIndex = '2';
    // Responsive: scale for mobile
    this.domElement.style.maxWidth = '10vw';
    this.domElement.style.maxHeight = '20vh';
    requestAnimationFrame(() => this._updateDomPosition());
  }

  _retract() {
    // Retract the plunger while space is held
    if (!this.isRetracting) return;
    // Move plunger down by retractSpeed, up to maxRetract
    const { Body } = this.Matter;
    if (this.body.position.y < this.y + this.maxRetract) {
      Body.setPosition(this.body, {
        x: this.body.position.x,
        y: this.body.position.y + this.retractSpeed
      });
      // Increase spring power (capped)
      this.springPower = Math.min(this.springPower + 0.4, this.maxSpringPower);
      // Keep retracting next frame
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
    // Move plunger back to original position
    const { Body } = this.Matter;
    Body.setPosition(this.body, { x: this.x, y: this.y });
  }
}