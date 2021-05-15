export default class Box extends Phaser.GameObjects.Container {
    constructor(scene, id, width, height, color) {
      super(scene, id, 0, 0);
      this.setSize(width, height);
      let border = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, color, 0.1);
      border.setStrokeStyle(2, color, 1);
      this.add(border);
      this.tokenCount = 0;
      this.tokenDisplay = new Phaser.GameObjects.Text(scene, -10, -10, "0",{fontSize: "20px", color:"#000000"});
      this.add(this.tokenDisplay);
      this.scene.add.existing(this);
    }

    increment(){
      this.tokenCount ++;
      this.tokenDisplay.setText(this.tokenCount);
    }

    decrement(){
      this.tokenCount --;
      this.tokenDisplay.setText(this.tokenCount);
    }
  }
  