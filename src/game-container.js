import './index.css';
import {  Main } from './phaser/scenes/index';
import {EDGE_TYPE, SCENE_MAIN, COLORS, PHASER_COLORS, IDS} from './constants/index';
import "vis-network/styles/vis-network.css";
import NetworkEditor from './visjs/network-editor';
import Box from './core/Box';
import Graph from './core/graph/graph';

class GameContainer{
    constructor(rule){
    const config = {
        width: 800,
        height: 800,
        title: 'Phaser Template',
        // see `.env` and `package.json`
        url: process.env.WEB_APP_HOMEPAGE,
        version: process.env.WEB_APP_VERSION,
        scene: [Main],
        parent:'phaser-canvas',
        disableContextMenu: true,
        backgroundColor: '#fff'
    };

    this.boxes = new Map();
    
    for (let i = 0; i < 2; i++) {
      let box = new Box(IDS[i], COLORS[i],PHASER_COLORS[i]);
      this.boxes.set(box.id, box);
    }
    
    this.inputValues = [];
    this.correctValues = [];
    this.outputValues = [];

    this.rule = rule;

    this.computeValues();
    this.fillBoxWithInputValues();

    this.graph = new Graph(this);
    this.display = new Phaser.Game(config);
    this.display.parent = this;
    this.editor = new NetworkEditor(this, this.graph.start.id, this.graph.end.id);
    this.simulation = false;
    this.inputIndex = 0;
    this.success = false;
    

    this.fillHTMLSelect();
    this.initListeners();
    this.startEditMode();
    this.fillHTMLValues();
  }

  fillHTMLValues(){
    this.inputValues.forEach(val =>{
      let valHTML = document.createElement('p');
      valHTML.textContent = val;
      document.getElementById('input-values').appendChild(valHTML);
    });
    this.correctValues.forEach(val =>{
      let valHTML = document.createElement('p');
      valHTML.textContent = val;
      document.getElementById('correct-values').appendChild(valHTML);
    });
  }

  fillHTMLSelect(){
    document.getElementById('node-configuration').innerHTML = '';
    this.boxes.forEach(box => {
      let option = document.createElement('option');
      option.style.color = 'white';
      option.style.background = box.color;
      option.textContent = box.id;
      document.getElementById('node-configuration').appendChild(option);
    });
  }

  initListeners(){
      document.getElementById('create-new-node').addEventListener('click',(e)=>{
        this.editor.network.addNodeMode();
      });
      document.getElementById('create-new-edge').addEventListener('click',(e)=>{
        this.editor.network.addEdgeMode();
      });
      document.getElementById('delete-selected').addEventListener('click',(e)=>{
        let selection = this.editor.network.getSelection();
        if(selection.edges.length != 0 || selection.nodes.length != 0){
          this.editor.network.deleteSelected();
        }
        this.editor.network.setSelection({nodes:[],edges:[]});
      });
      document.getElementById('create-box').addEventListener('click',(e)=>{
        if(this.boxes.size <9){
          this.createBox();
        }
      });
      document.getElementById('delete-box').addEventListener('click',(e)=>{
        if(this.boxes.size >2){
          this.deleteBox();
        }
      });
      document.getElementById('step').addEventListener('click', e=>{
        this.step();
      });
      document.getElementById('start-simulation').addEventListener('click', e=>{
        this.startSimulationMode();
      });
      document.getElementById('stop-simulation').addEventListener('click', e=>{
        this.startEditMode();
      });
      document.getElementById('phaser-canvas').addEventListener('ready', e=>{
        this.boxes.forEach(box =>{
          this.display.scene.getScene(SCENE_MAIN).addBox(box.id, box.phaserColor, box.value);
        });
      });
      document.getElementById('lobby-button').addEventListener('click',e =>{
        this.display.destroy(true);
        window.dispatchEvent(new CustomEvent('render-lobby'));
      });
      document.getElementById('close-button').addEventListener('click',e =>{
        $("#myModal").modal('hide');
      });
  }

  addEdge(edgeData,callback){
      if (edgeData.from === edgeData.to) {
      }
      else {
          let e = document.getElementById('edge-type');
          let type = e.options[e.selectedIndex].value;
          edgeData.type = type;
          let edge = this.graph.addEdge(type, edgeData.from, edgeData.to);
          if(edge){
            edgeData.id = edge.id;
            edgeData.dashes = type == EDGE_TYPE.NORMAL_EDGE ? false : true;
            callback(edgeData);
          }
      }
  }

  addNode(nodeData, callback){
      let e = document.getElementById('node-configuration');
      let box = this.boxes.get(e.options[e.selectedIndex].text);
      let el = document.getElementById('node-type');
      let type = el.options[el.selectedIndex].value;
      let node = this.graph.addNode(type, box.id);
      if(node){
        nodeData.id = node.id;
        nodeData.color = box.color;
        nodeData.label = node.getName();
        nodeData.font = '30px Verdana #ffffff';
        callback(nodeData);
      }
  }

  editNode(nodeData, callback){

  }

  editEdge(edgeData, callback){

  }

  deleteNode(nodeData, callback){
    let deleted = false;
    nodeData.nodes.forEach(id =>{
      deleted = this.graph.deleteNode(id);
    });
    if(deleted){
      callback(nodeData);
    }
  }

  deleteEdge(edgeData, callback){
    edgeData.edges.forEach(id =>{
      this.graph.deleteEdge(id);
    });
    callback(edgeData);
  }

  checkSuccess(){
    let check = true;
    this.outputValues.forEach((value, index)=>{
      if(value != this.correctValues[index]){
        check = false;
      }
    });
    if(check){
      this.success = true;
    }
  }

  step(){
    if(this.graph.checkEnd()){

      if(this.outputValues.length < this.inputValues.length){
        this.outputValues.push(this.boxes.get('B').value);
        this.drawOutputValues();
        if(this.outputValues.length == this.inputValues.length){
          this.checkSuccess();
          this.showResults();
          this.startEditMode();
        }
        else{
          this.inputIndex += 1;
          this.updateValues();
          this.graph.reset();
        }
      }
    }
    else{
      this.graph.step();
      this.editor.network.selectNodes(this.graph.getCurrentNode(),false);
    }
  }

  drawOutputValues(){
    document.getElementById('output-values').innerHTML = '';
    this.outputValues.forEach(val =>{
      let valHTML = document.createElement('p');
      valHTML.textContent = val;
      document.getElementById('output-values').appendChild(valHTML);
    });
  }

  incrementBox(boxId){
    this.boxes.get(boxId).value += 1;
    this.display.scene.getScene(SCENE_MAIN).boxes.getChildren().forEach(child =>{
      if(boxId == child.id){
        child.increment();
      }
    });
  }

  startSimulationMode(){

    this.reset();
    if(!this.simulation){
      this.simulation = true;
      document.getElementById('editor-panel').childNodes.forEach(node =>{
        node.disabled = true;
      });
      document.getElementById('simulation-panel').childNodes.forEach(node =>{
        node.disabled = false;
      });
      document.getElementById('start-simulation').disabled = true;
    }
  }

  startEditMode(){

    this.reset();
    if(this.simulation){
      this.simulation = false;
      document.getElementById('editor-panel').childNodes.forEach(node =>{
        node.disabled = false;
      });
      document.getElementById('simulation-panel').childNodes.forEach(node =>{
        node.disabled = true;
      });
      document.getElementById('start-simulation').disabled = false;
    }
  }

  reset(){
    this.inputIndex = 0;
    this.outputValues = [];
    this.drawOutputValues();
    this.updateValues();
    this.graph.reset();
    this.editor.reset(this.graph.start.id);
  }

  updateValues(){
    this.fillBoxWithInputValues();
    if(this.display.scene.getScene(SCENE_MAIN)){
      this.display.scene.getScene(SCENE_MAIN).updateBoxes(this.boxes);
    }
  }
  
  fillBoxWithInputValues(){
    this.boxes.forEach(box=>{
      if(box.id == 'A'){
        box.value = this.inputValues[this.inputIndex];
      }
      else{
        box.value = 0;
      }
    });
  }

  decrementBox(boxId){
    this.boxes.get(boxId).value -= 1;
    this.display.scene.getScene(SCENE_MAIN).boxes.getChildren().forEach(child =>{
      if(boxId == child.id){
        child.decrement();
      }
    });
  }

  computeValues(){

    for (let i = 0; i < 10; i++) {
      this.inputValues.push(parseInt(Math.random() * 30));
    }

    this.inputValues.forEach(value =>{
      this.correctValues.push(this.rule(value));
    });
  }

  createBox(){
    let box = new Box(IDS[this.boxes.size], COLORS[this.boxes.size], PHASER_COLORS[this.boxes.size]);
    this.boxes.set(box.id, box);
    this.display.scene.getScene(SCENE_MAIN).addBox(box.id, box.phaserColor, box.value);
    this.fillHTMLSelect();
  }

  deleteBox(){
    let idToDelete = IDS[this.boxes.size - 1];
    this.display.scene.getScene(SCENE_MAIN).deleteBox(idToDelete);
    this.editor.network.unselectAll();
    this.editor.network.selectNodes(this.graph.deleteNodesWithBox(idToDelete));
    this.editor.network.deleteSelected();
    this.boxes.delete(IDS[this.boxes.size - 1]);
    this.fillHTMLSelect();
  }

  showResults(){
    if(this.success){
      document.getElementById('modal-title').textContent = 'Congratulations !';
    }
    else{
      document.getElementById('modal-title').textContent = 'Failure !';
    }

    document.getElementById('modal-body').innerHTML = '';
    let tableResults = document.createElement('table');
    let theadResults = document.createElement('thead');
    let trTitle = document.createElement('tr');
    let thInput = document.createElement('td');
    thInput.textContent = 'Input';
    let thOutput = document.createElement('td');
    thOutput.textContent = 'Output';
    let thCorrect = document.createElement('td');
    thCorrect.textContent = 'Correct';
    trTitle.appendChild(thInput);
    trTitle.appendChild(thOutput);
    trTitle.appendChild(thCorrect);
    theadResults.appendChild(trTitle);
    tableResults.appendChild(theadResults);
    let tbodyResults = document.createElement('tbody');

    this.inputValues.forEach((value, index)=>{
      let trResult = document.createElement('tr');

      let tdInputResult = document.createElement('td');
      tdInputResult.textContent = value;
      
      let tdOutputResult = document.createElement('td');
      tdOutputResult.textContent = this.outputValues[index];

      if(this.outputValues[index] == this.correctValues[index]){
        tdOutputResult.style.background = "#ccffcc";
      }
      else{
        tdOutputResult.style.background =  "#ffcccc";
      }

      let tdCorrectResult = document.createElement('td');
      tdCorrectResult.textContent = this.correctValues[index];

      trResult.appendChild(tdInputResult);
      trResult.appendChild(tdOutputResult);
      trResult.appendChild(tdCorrectResult);
      tbodyResults.appendChild(trResult);
    });

    tableResults.appendChild(tbodyResults);
    document.getElementById('modal-body').appendChild(tableResults);
    $("#myModal").modal();
  }
}

export default GameContainer;