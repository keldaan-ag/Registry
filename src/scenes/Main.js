import {SCENE_MAIN} from '../constants/index';
import {Block, Registry} from '../gameObjects/index';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_MAIN });
  }

  create() {
    let self = this;
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();

    this.registryInput = new Registry(this,1600,200,300,200,0xff0000);
    this.registryOutput = new Registry(this,1600,600,300,200,0x00ff00);
    
    this.input.on('pointerdown', function (pointer) {

      if (pointer.leftButtonDown())
      {
        new Block(self, pointer.x, pointer.y, 50, 50);
      }
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;

    });

  }
}

export default Main;
