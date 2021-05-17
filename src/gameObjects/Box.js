export default class Box extends Phaser.GameObjects.Container {
    constructor(scene, id, width, height, color) {
      super(scene, 0, 0);
      this.id = id;
      this.setSize(width, height);
      let border = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, color, 0.1);
      border.setStrokeStyle(2, color, 1);
      this.add(border);
      this.value = 0;
      this.add(new Phaser.GameObjects.Text(scene,5 -width/2,5 -height/2,id,{fontSize: "20px", color:"#000000"}));
      this.tokenDisplay = new Phaser.GameObjects.Text(scene, -10, -10, "0",{fontSize: "30px", color:"#000000"});
      this.add(this.tokenDisplay);
      this.scene.add.existing(this);
    }

    increment(){
      this.value ++;
      this.tokenDisplay.setText(this.value);
    }

    decrement(){
      this.value --;
      this.tokenDisplay.setText(this.value);
    }
  }
  