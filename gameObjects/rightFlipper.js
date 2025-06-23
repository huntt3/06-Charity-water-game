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