import GameContainer from '../game-container';
import {LEVEL_CONFIG} from '../constants/index';

class GamePage {
  constructor(args) {

    this.level = args.level;
    this.rule = LEVEL_CONFIG[this.level - 1].rule;
    this.title = LEVEL_CONFIG[this.level - 1].title;
    this.description = LEVEL_CONFIG[this.level - 1].description;
    this.inputBoxes = LEVEL_CONFIG[this.level - 1].inputBoxes;
    this.outputBox = LEVEL_CONFIG[this.level - 1].outputBox;
    this.render();
    this.container = document.getElementById('game');
    this.game = new GameContainer(this.rule, this.title, this.description, this.inputBoxes, this.outputBox);
  };


  render() {
    const content = document.createElement('div');
    content.setAttribute('id', 'game');
    content.innerHTML = 
    `
    <div id="myModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="modal-title" class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="modal-body" class="modal-body">
          </div>
          <div class="modal-footer">
            <button id="lobby-button" type="button" class="btn btn-primary" data-dismiss="modal">Main Menu</button>
            <button type="button" id="close-button" class="btn btn-secondary">Retry</button>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;">
      <div id="editor-panel">
        <button id="main-menu" type="button" class="btn">Main Menu</button>
        <span>
          <h4 id="level-title" style="text-align:center;">${this.title}</h4>
          <h4 id="level-description" style="text-align:center;">${this.description}</h4>
        </span>
        <select name="node-configuration" id="node-configuration"></select>
        <select name="node-type" id="node-type">
          <option value="INCREMENT">+</option>
          <option value="DECREMENT">-</option>
        </select>
        <button type="button" class="btn"  id="create-new-node">Create new node</button>
        <select name="edge-type" id="edge-type">
          <option value="NORMAL_EDGE">Normal</option>
          <option value="IFZERO_EDGE">If Zero</option>
        </select>
        <button type="button" class="btn"  id="create-new-edge">Create new edge</button>
        <button type="button" class="btn"  id="delete-selected">Delete selected</button>
        <button type="button" class="btn"  id="create-box">Create box</button>
        <button type="button" class="btn"  id="delete-box">Delete box</button>
      </div>
      <div id="mynetwork"></div>
      <div id="phaser-canvas"></div>
      <div style="border: 1px solid lightgray; width: 80px;">
        <p>Input</p>
        <div id="input-values" style="display: flex; justify-content: space-between; flex-flow: column;">
        </div>
      </div>
      <div style="border: 1px solid lightgray; width: 80px;">
        <p>Output</p>
        <div id="output-values" style="display: flex; justify-content: space-between; flex-flow: column;">
        </div>
      </div>
    </div>
    <div id="simulation-panel">
      <button type="button" class="btn"  id = "stop-simulation" disabled="true">Stop</button>
      <button type="button" class="btn"  id = "start-simulation">Start</button>
      <input type="range" class="form-range" id="simulation-speed" min="1" max="30"/>
      <button type="button" class="btn"  id ="step">Step</button>
    </div>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(content);
  }

}

export default GamePage;
