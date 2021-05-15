import './index.css';
import {  Main } from './scenes';
import "vis-network/styles/vis-network.css";
import NetworkEditor from './network-editor';
import Box from './Box';

class GameContainer{
    constructor(numberOfBox){
      let self = this;
        /**
     * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
     */
    const config = {
        width: 600,
        height: 600,
        title: 'Phaser Template',
        // see `.env` and `package.json`
        url: process.env.WEB_APP_HOMEPAGE,
        version: process.env.WEB_APP_VERSION,
        scene: [Main],
        parent:'phaser-canvas',
        disableContextMenu: true,
        backgroundColor: '#fff'
    };

    window.boxes = new Map();
    let colors = ['red','green','blue'];
    let phaserColors = [0xff0000,0x00ff00,0x0000ff];
    let ids = ['A', 'B', 'C'];
    for (let i = 0; i < numberOfBox; i++) {
      let box = new Box(ids[i], colors[i],phaserColors[i]);
      window.boxes.set(box.id, box);
    }
    
    this.display = new Phaser.Game(config, this.boxes);
    this.editor = new NetworkEditor(this);

    this.fillHTMLSelect();
    this.initListeners();
    }

    fillHTMLSelect(){
      window.boxes.forEach(box => {
        let option = document.createElement('option');
        option.style.color = 'white';
        option.style.background = box.color;
        option.textContent = box.id;
        document.getElementById('node-configuration').appendChild(option);
      });
    }

    initListeners(){
        let self = this;
        document.getElementById('create-new-node').addEventListener('click',(e)=>{
          self.editor.network.addNodeMode();
        });
        document.getElementById('create-new-edge').addEventListener('click',(e)=>{
            self.editor.network.addEdgeMode();
        });
        document.getElementById('delete-selected').addEventListener('click',(e)=>{
          self.editor.network.deleteSelected();
        });
    }
}

export default GameContainer;