// WaterCan class for modular OOP
class WaterCan {
  constructor(x, y, width, height, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      isSensor: true, // so the ball passes through
      render: {
        sprite: {
          texture: '../img/water-can-transparent.png',
          xScale: 4/40,
          yScale: 4/40
        }
      }
    });
    Matter.Composite.add(world, this.body);
  }
}