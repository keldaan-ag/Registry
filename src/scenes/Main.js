import {SCENE_MAIN} from '../constants/index';
import {Registry} from '../gameObjects/index';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_MAIN });
  }

  create() {
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();

    this.registryInput = new Registry(this,200,200,200,100,0xff0000);
    this.registryOutput = new Registry(this,200,400,200,100,0x00ff00);
  }
}

export default Main;
