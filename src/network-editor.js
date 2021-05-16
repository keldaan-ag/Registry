import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import INCREMENT_TYPE from "./constants";

class NetworkEditor{
    constructor(parent){
        let self = this;
        this.parent = parent;
        // create an array with nodes
        var nodes = new DataSet([
        {
            id: 1,
            label: "Input",
            color: '#ffffff',
            font: '12px Verdana #000000',
            fixed: {
                x:true,
                y:true
            },
            x: 0,
            y: 0
        },
            {
                id: 2,
                label: "Output",
                color: '#000000',
                font: '12px Verdana #ffffff',
                fixed: {
                    x:true,
                    y:true
                },
                x: 400,
                y: 400
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
                    self.addNode(nodeData, callback);
                },
                addEdge: function(edgeData,callback) {
                    self.checkEdge(edgeData, callback);
                },
                editNode: function(nodeData,callback) {
                    console.log(nodeData);
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
                color: 'gray',
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
                shadow: true,
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
    addNode(nodeData, callback){
        let e = document.getElementById('node-configuration');
        let id = e.options[e.selectedIndex].text;
        let box = window.boxes.get(id);
        nodeData.color = box.color;
        let el = document.getElementById('node-type');
        nodeData.type = el.options[el.selectedIndex].value;
        nodeData.label = `${box.id}${el.options[el.selectedIndex].textContent}`;

        if(id != 'output' && id != 'input'){
            nodeData.font = '36px Verdana #ffffff';
        }
        callback(nodeData);
    }
}   

export default NetworkEditor;