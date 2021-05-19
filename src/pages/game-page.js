import GameContainer from '../game-container';

class GamePage {
  constructor(args) {
    this.render();
    this.level = args.level;
    this.container = document.getElementById('game');
    let testValues = [1,2,3,4,5];
    let rule = (a)=>{return a * 2};
    this.game = new GameContainer(testValues, rule);
  };


  render() {
    const content = document.createElement('div');
    content.setAttribute('id', 'game');
    content.innerHTML = 
    `
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;">
      <div id="editor-panel" style="display:flex; flex-flow: column; justify-content: space-around;">
        <select name="node-configuration" id="node-configuration"></select>
        <select name="node-type" id="node-type">
          <option value="INCREMENT">+</option>
          <option value="DECREMENT">-</option>
        </select>
        <button id="create-new-node">Create new node</button>
        <select name="edge-type" id="edge-type">
          <option value="NORMAL_EDGE">Normal</option>
          <option value="IFZERO_EDGE">If Zero</option>
        </select>
        <button id="create-new-edge">Create new edge</button>
        <button id="delete-selected">Delete selected</button>
        <button id="create-box">Create box</button>
        <button id="delete-box">Delete box</button>
      </div>
      <div id="mynetwork"></div>
      <div id="phaser-canvas"></div>
      <div style="border: 1px solid lightgray; width: 80px;">
        <h4>Input</h4>
        <div id="input-values" style="display: flex; justify-content: space-between; flex-flow: column;">
        </div>
      </div>
      <div style="border: 1px solid lightgray; width: 80px;">
        <h4>Output</h4>
        <div id="output-values" style="display: flex; justify-content: space-between; flex-flow: column;">
        </div>
      </div>
      <div style="border: 1px solid lightgray; width: 80px;">
        <h4>Correct</h4>
        <div id="correct-values" style="display: flex; justify-content: space-between; flex-flow: column;">
        </div>
      </div>
    </div>
    <div id="simulation-panel">
      <button id = "start-simulation">Start</button>
      <button id = "stop-simulation" disabled="true">Stop</button>
      <button id ="step" disabled="true">Step</button>
    </div>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(content);
  }

}

export default GamePage;
