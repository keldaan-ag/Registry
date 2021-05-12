export default class Block extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height) {
    super(scene, x, y);
    this.setSize(width, height);
    this.setInteractive()
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState())
        .on('pointerdown', () => this.enterButtonActiveState())
        .on('pointerup', () => this.enterButtonHoverState());
    this.scene.add.existing(this);
  }

  enterButtonHoverState() {

  }

  enterButtonRestState() {

  }

  enterButtonActiveState() {

  }
}
