import Node from './node';
import {NODE_TYPE, EDGE_TYPE} from '../constants/index';
import Edge from './edge';

export default class Graph{
    constructor(){
        this.nodes = new Map();
        this.edges = new Map();
        this.input = new Node(NODE_TYPE.INPUT,undefined);
        this.output = new Node(NODE_TYPE.OUTPUT,undefined);
        this.nodes.set(this.input.id, this.input);
        this.nodes.set(this.output.id, this.output);
    }

    addNode(type, box){
        let node = new Node(type, box);
        this.nodes.set(node.id, node);
        return node;
    }

    addEdge(type, from, to){
        if(to == NODE_TYPE.INPUT){
            return;
        }
        else{
            let fromNodeEdges = this.getFromNodeEdges(from);
            let fromNodeType = this.nodes.get(from).type;
    
            let edge;
            switch (fromNodeType) {
                case NODE_TYPE.INPUT:
                    if(fromNodeEdges.length > 0 || type != EDGE_TYPE.NORMAL_EDGE){
                        // only one normal edge allowed from input
                        break;
                    }
                    else{
                        edge = new Edge(from, to, type);
                        break;
                    }
                
                case NODE_TYPE.OUTPUT:
                    //no from output node edge allowed
                    break;
                
                case NODE_TYPE.INCREMENT:
                    // only one normal link allowed from increment link
                    if(type == EDGE_TYPE.IFZERO_EDGE || fromNodeEdges.length > 0){
                        break;
                    }
                    else{
                        edge = new Edge(from, to, type);
                        break;
                    }
                    
                case NODE_TYPE.DECREMENT:
    
                    // only one normal link and one if zero link allowed
                    if(fromNodeEdges.length > 2){
                        break;
                    }
                    
                    if(type == EDGE_TYPE.NORMAL_EDGE){
    
                    }
                    if(type == EDGE_TYPE.IFZERO_EDGE){
    
                    }
    
                default:
                    break;
            }
            if(edge){
                this.edges.set(edge.id, edge);
                return edge;
            }
        }
        
    }

    getFromNodeEdges(nodeId){
        let ids = [];
        this.edges.forEach(edge=>{
            if(edge.from == nodeId){
                ids.push(edge.id);
            }
        });
        return ids;
    }
}