import {IDS, PHASER_COLORS, SCENE_MAIN} from '../../constants/index';
import {Box} from '../gameObjects/index';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_MAIN });
    this.circle = new Phaser.Geom.Circle(400, 400, 200);
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
    this.boxes.add(new Box(this, id, 100, 100, color, value));
    Phaser.Actions.PlaceOnCircle(this.boxes.getChildren(), this.circle);
  }

  deleteBox(id){
    this.boxes.getChildren().forEach(box =>{
      if(box.id == id){
        box.destroy(true);
      }
    });
    Phaser.Actions.PlaceOnCircle(this.boxes.getChildren(), this.circle);
  }

  updateBoxes(boxes){
    this.boxes.getChildren().forEach(box =>{
      box.updateValue(boxes.get(box.id).value);
    });
  }
}

export default Main;
