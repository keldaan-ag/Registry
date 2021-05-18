export default class Box extends Phaser.GameObjects.Container {
    constructor(scene, id, width, height, color, value) {
      super(scene, 0, 0);
      this.id = id;
      this.setSize(width, height);
      let border = new Phaser.GameObjects.Rectangle(scene, 0, 0, width, height, color, 1);
      border.setStrokeStyle(2, color, 1);
      this.add(border);
      this.value = value;
      this.add(new Phaser.GameObjects.Text(scene,5 -width/2,5 -height/2,id,{fontSize: "30px", color:"#ffffff"}));
      this.tokenDisplay = new Phaser.GameObjects.Text(scene, -10, -10, this.value,{fontSize: "40px", color:"#ffffff"});
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

    reset(value){
      this.value = value;
      this.tokenDisplay.setText(this.value);
    }
  }
  