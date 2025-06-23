document.addEventListener('DOMContentLoaded', function() {
  const difficultySwitch = document.getElementById('difficulty-switch');
  if (difficultySwitch) {
    difficultySwitch.addEventListener('change', function() {
      setWaterCanDifficulty(this.checked);
    });
    // Set initial state
    setWaterCanDifficulty(difficultySwitch.checked);
  }
});

// Listen for difficulty toggle and resize waterCanObj
function setWaterCanDifficulty(isHard) {
  // Remove old body from world
  Composite.remove(world, waterCanObj.body);
  // Set new size (hard = 20, easy = 40)
  let size = isHard ? 20 : 40;
  // Get current position of the can
  const pos = waterCanObj.body.position;
  // Create new body at the same position
  const newBody = Matter.Bodies.rectangle(pos.x, pos.y, size, size, {
    isStatic: true,
    isSensor: true,
    render: {
      sprite: {
        texture: '../img/water-can-transparent.png',
        xScale: size / 40 * 0.1, // 0.1 for 40, 0.05 for 20
        yScale: size / 40 * 0.1
      }
    }
  });
  waterCanObj.body = newBody;
  // Update global reference for collision
  window.waterCan = newBody;
  // Add new body to world
  Composite.add(world, newBody);
}