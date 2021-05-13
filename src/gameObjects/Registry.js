export default class Registry extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, color) {
      super(scene, x, y);
      this.setSize(width, height);
      let border = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, color, 0.1);
      border.setStrokeStyle(2, color, 1);
      this.add(border);

      this.scene.add.existing(this);
    }
  }
  