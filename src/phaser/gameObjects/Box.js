export default class Box extends Phaser.GameObjects.Container {
    constructor(scene, id, radius, color, value) {
      super(scene, 0, 0);
      this.id = id;
      this.color = color;
      let border = new Phaser.GameObjects.Arc(scene, 0, 0, radius, 0, 360, false, color, 1);
      border.setStrokeStyle(1,0x000000);
      this.add(border);
      this.value = value;
      this.add(new Phaser.GameObjects.Text(scene, -10, -radius*1.8, id, {fontSize: "40px", color:"#000000"}));
      this.tokenDisplay = new Phaser.GameObjects.Text(scene, -20, -20, this.value, {fontSize: "40px", color:"#ffffff"});
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

    updateValue(value){
      this.value = value;
      this.tokenDisplay.setText(this.value);
    }
  }
  