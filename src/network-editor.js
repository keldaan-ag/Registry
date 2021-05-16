import { DataSet } from "vis-data";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import {EDGE_TYPE} from "./constants";


class NetworkEditor{
    constructor(parent){
        let self = this;
        this.parent = parent;
        // create an array with nodes
        var nodes = new DataSet([
        {
            id: "input",
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
                id: "output",
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
                    self.parent.addNode(nodeData, callback);
                },
                addEdge: function(edgeData,callback) {
                    self.parent.addEdge(edgeData, callback);
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
}   

export default NetworkEditor;