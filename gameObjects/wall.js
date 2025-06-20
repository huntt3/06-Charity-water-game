// Wall class for modular OOP
class Wall {
  constructor(x, y, width, height, world, Matter) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, { isStatic: true });
    Matter.Composite.add(world, this.body);
  }
}
export default Wall;
