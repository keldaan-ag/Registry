import './index.css';
import {  Main } from './scenes';

import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

class GameContainer{
    constructor(){
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
    
    this.game = new Phaser.Game(config);
    
    // create an array with nodes
    var nodes = new DataSet([
        { id: 1, label: "Start", color: "red"},
        { id: 2, label: "End", color:"green"}
    ]);
    
    // create an array with edges
    var edges = new DataSet([

    ]);
    
    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    
    var options = {
        interaction: { hover: true },
        manipulation: {
            enabled: false,
            initiallyActive: false,
            addNode: true,
            addEdge: true,
            editNode: function(nodeData,callback) {
                nodeData.label = 'hello world';
                callback(nodeData);
              },
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
            controlNodeStyle:{
              // all node options are valid.
            }
          },
        edges:{
            arrows: 'to',
            color: 'red',
            font: '12px arial #ff0000',
            scaling:{
              label: true,
            },
            shadow: true,
            smooth: true,
          }
    };
    
    this.network = new Network(container, data, options);
    }
}

export default GameContainer;