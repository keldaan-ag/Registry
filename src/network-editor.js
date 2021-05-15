import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

class NetworkEditor{
    constructor(){
        let self = this;
        // create an array with nodes
        var nodes = new DataSet([
            { id: 1, label: "Input", color: '#ffffff', font: '12px Verdana #000000'},
            { id: 2, label: "Output", color: '#000000'}
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
                    let e = document.getElementById('node-configuration');
                    let id = e.options[e.selectedIndex].text;
                    nodeData.label = '+';
                    nodeData.color = window.boxes.get(id).color;
                    if(id != 'output' && id != 'input'){
                        nodeData.font = '36px Verdana #ffffff';
                    }
                    callback(nodeData);
                },
                addEdge: function(edgeData,callback) {
                    self.checkEdge(edgeData, callback);
                },
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
                font: '12px Verdana #ff0000',
                scaling:{
                label: true,
                },
                shadow: true,
                smooth: true,
            },
            nodes:{
            shape:'circle',
            font: '12px Verdana #ffffff',
            shadow: true
            }
        };

        this.network = new Network(container, data, options);
    }
    
    checkEdge(edgeData,callback){
        if (edgeData.from === edgeData.to) {
        }
        else {
          callback(edgeData);
        }
    }
}   

export default NetworkEditor;