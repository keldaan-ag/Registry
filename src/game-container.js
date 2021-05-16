import './index.css';
import {  Main } from './scenes';
import {EDGE_TYPE} from './constants/index';
import "vis-network/styles/vis-network.css";
import NetworkEditor from './network-editor';
import Box from './Box';
import Graph from './graph/graph';

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
    
    this.graph = new Graph();
    this.display = new Phaser.Game(config, this.boxes);
    this.editor = new NetworkEditor(this, this.graph.nodes);

   this.currentNode = undefined;

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
        document.getElementById('step').addEventListener('click', e=>{
          self.step();
        });
    }

  addEdge(edgeData,callback){
      if (edgeData.from === edgeData.to) {
      }
      else {
          let e = document.getElementById('edge-type');
          let type = e.options[e.selectedIndex].value;
          edgeData.type = type;
          let edge = this.graph.addEdge(edgeData.id ,type ,edgeData.from, edgeData.to);
          if(edge){
            edgeData.dashes = type == EDGE_TYPE.NORMAL_EDGE ? false : true;
            callback(edgeData);
          }
      }
  }

  addNode(nodeData, callback){
      let e = document.getElementById('node-configuration');
      let box = window.boxes.get(e.options[e.selectedIndex].text);
      let el = document.getElementById('node-type');
      let type = el.options[el.selectedIndex].value;
      let node = this.graph.addNode(nodeData.id, type, box.id);
      if(node){
        nodeData.color = box.color;
        nodeData.label = node.getName();
        nodeData.font = '30px Verdana #ffffff';
        callback(nodeData);
      }
  }

    step(){
      if(!this.currentNode){
        this.currentNode = 'Input';
        this.editor.network.setSelection({nodes: [this.currentNode]});
      }
      if(this.currentNode == 'Output'){
        this.currentNode = 'Input';
      }
      else{
        let connectedNodes = this.editor.network.getConnectedNodes(this.currentNode,'to');
        this.currentNode = connectedNodes[0];
        this.editor.network.setSelection({nodes: [this.currentNode],edges:[]});
      }
      console.log(this.editor.network.body.nodes._data[this.currentNode]);
      console.log(this.editor.network.getSelection());
    }
}

export default GameContainer;