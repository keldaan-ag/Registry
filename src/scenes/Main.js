import {SCENE_MAIN} from '../constants/index';

class Main extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_MAIN });
  }

  create() {
    let self = this;
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();
    
    this.input.on('pointerdown', function (pointer) {

      if (pointer.leftButtonDown())
      {
        let graphics = self.add.graphics();

        var color = 0xff0000;
        var thickness = 4;
        var alpha = 1;
    
        graphics.lineStyle(thickness, color, alpha);
    
        var a = new Phaser.Geom.Point(pointer.x, pointer.y);
        var radius = 50;
    
        graphics.strokeCircle(a.x, a.y, radius);
      }

    });

  }
}

export default Main;
