export default class Block extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);
    this.setSize(width, height);
    this.setInteractive({ cursor: 'pointer' })
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState())
        .on('pointerdown', (pointer, localX, localY, event) => this.enterButtonActiveState(pointer, localX, localY, event))
        .on('pointerup', () => this.enterButtonHoverState());
    let border = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, 0x0000ff, 0.1);
    border.setStrokeStyle(2, 0x0000ff, 1);
    this.add(border);

    this.scene.input.setDraggable(this);
    this.scene.add.existing(this);
  }

  enterButtonHoverState() {

  }

  enterButtonRestState() {

  }

  enterButtonActiveState(pointer, localX, localY, event) {
    event.stopPropagation();
  }
}
