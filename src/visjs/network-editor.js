import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";


class NetworkEditor{
    constructor(parent, startId, endId){
        let self = this;
        this.parent = parent;
        // create an array with nodes
        var nodes = new DataSet([
        {
            id: startId,
            label: "Start",
            color: {
                background:'#ffffff',
                border:'#000000',
                highlight: {
                    border: '#000000',
                    background: '#ffffff'
                  },
                  hover: {
                    border: '#000000',
                    background: '#ffffff'
                  }
                },
            font: '20px Verdana #000000',
            fixed: {
                x:true,
                y:false
            },
            x: 0,
            y: 0,
            size: 50
        },
            {
                id: endId,
                label: "End",
                color: {
                    background:'#ffffff',
                    border:'#000000',
                    highlight: {
                        border: '#000000',
                        background: '#ffffff'
                      },
                      hover: {
                        border: '#000000',
                        background: '#ffffff'
                      }
                    },
                font: '20px Verdana #000000',
                fixed: {
                    x:true,
                    y:false
                },
                x: 600,
                y: 600
            }
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
                addNode: function(nodeData, callback){
                    self.parent.addNode(nodeData, callback);
                },
                addEdge: function(edgeData,callback) {
                    self.parent.addEdge(edgeData, callback);
                },
                editNode: function(nodeData,callback) {
                    self.parent.editNode(nodeData, callback);
                },
                editEdge: function(nodeData,callback) {
                    self.parent.editEdge(nodeData, callback);
                },
                deleteNode: function(nodeData, callback){
                    self.parent.deleteNode(nodeData, callback);
                },
                deleteEdge: function(nodeData, callback){
                    self.parent.deleteEdge(nodeData, callback);
                },
                controlNodeStyle:{
                // all node options are valid.
                }
            },
            edges:{
                arrows: 'to',
                color: '#000000',
                font: '12px Verdana #ff0000',
                scaling:{
                label: true,
                },
                shadow: true,
                smooth: true,
            },
            nodes:{
                shape:'circle',
                font: '15px Verdana #ffffff',
                shadow: true,
                borderWidthSelected: 10,
            },
            physics: false
        };

        this.network = new Network(container, data, options);
    }

    reset(startId){
        this.network.selectNodes([startId], false);
    }
}   

export default NetworkEditor;