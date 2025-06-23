// Ramp class for modular OOP
class Ramp {
  constructor(x, y, width, height, angle, color, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      angle: angle,
      chamfer: { radius: 8 },
      render: { fillStyle: color }
    });
    Matter.Composite.add(world, this.body);
  }
}