import {SCENE_MAIN} from '../constants/index';
import {Box} from '../gameObjects/index';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_MAIN });
  }

  create() {
    let self = this;
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();

    this.boxes = new Phaser.GameObjects.Group(this);
    window.boxes.forEach(box => {
      self.addBox(box.id, box.phaserColor);
    });
  }

  addBox(id, color)
  {
    this.boxes.add(new Box(this, id, 100, 100, color));
    const circle = new Phaser.Geom.Circle(300, 300, 100);
    Phaser.Actions.PlaceOnCircle(this.boxes.getChildren(), circle);
  }
}

export default Main;
