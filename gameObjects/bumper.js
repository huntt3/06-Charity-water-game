// Bumper class for pinball bumpers using Matter.js
// This class creates a static circle with high restitution (bouncy)
// Usage: const bumper = new Bumper(x, y, radius, world, Matter);

class Bumper {
  constructor(x, y, radius, world, Matter) {
    // Create a static circle body with high restitution (bounciness)
    this.body = Matter.Bodies.circle(x, y, radius, {
      isStatic: true,
      render: {
        fillStyle: '#FF902A', // Bright yellow for visibility
        strokeStyle: '#F5402C', // Red border
        lineWidth: 4
      }
    });
    // Add the bumper to the world
    Matter.Composite.add(world, this.body);
  }
}