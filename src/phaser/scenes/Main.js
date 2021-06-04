import {SCENE_MAIN} from '../../constants/index';
import {Box} from '../gameObjects/index';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_MAIN });
    this.circle = new Phaser.Geom.Circle(400, 400, 200);
  }

  preload(){
    this.load.image('ball', 'assets/ball.png');
  }

  create() {
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();
    this.boxes = new Phaser.GameObjects.Group(this);
    this.game.parent.boxes.forEach(box=>{
      this.addBox(box.id, box.phaserColor, box.value);
    });
  }

  addBox(id, color, value){
    this.boxes.add(new Box(this, id, 50, color, value));
    Phaser.Actions.PlaceOnCircle(this.boxes.getChildren(), this.circle);
  }

  deleteBox(id){
    this.boxes.getChildren().forEach(box =>{
      if(box.id === id){
        box.destroy(true);
      }
    });
    Phaser.Actions.PlaceOnCircle(this.boxes.getChildren(), this.circle);
  }

  incrementBox(id){
    this.boxes.getChildren().forEach(child =>{
      if(id === child.id){
        let particle = this.add.arc(this.circle.x, this.circle.y, 20, 0, 360, false, child.color, 1);
        particle.setStrokeStyle(1,0x000000);
        this.tweens.add({
          targets: particle,
          x: child.x,
          y: child.y,
          duration: 500,
          ease: Phaser.Math.Easing.Expo.InOut,
          yoyo: false,
          onComplete: function () {
            particle.destroy();
          }
        });
        child.increment();
      }
    });
  }

  decrementBox(id){
    this.boxes.getChildren().forEach(child =>{
      if(id === child.id){
        let particle = this.add.arc(child.x, child.y, 20, 0, 360, false, child.color, 1);
        particle.setStrokeStyle(1,0x000000);
        this.tweens.add({
          targets: particle,
          x: this.circle.x,
          y: this.circle.y,
          duration: 500,
          ease: Phaser.Math.Easing.Expo.InOut,
          yoyo: false,
          onComplete: function () {
            particle.destroy();
          }
        });
        child.decrement();
      }
    });
  }

  updateBoxes(boxes){
    this.boxes.getChildren().forEach(box =>{
      box.updateValue(boxes.get(box.id).value);
    });
  }
}

export default Main;
