import Node from './node';
import {NODE_TYPE, EDGE_TYPE} from '../../constants/index';
import Edge from './edge';

export default class Graph{
    constructor(parent){
        this.nodes = new Map();
        this.edges = new Map();
        this.start = new Node(NODE_TYPE.START,undefined);
        this.end = new Node(NODE_TYPE.END,undefined);
        this.nodes.set(this.start.id, this.start);
        this.nodes.set(this.end.id, this.end);
        this.currentId = '';
        this.parent = parent;
    }

    reset(){
        this.currentId = '';
    }

    addNode(type, box){
        let node = new Node(type, box);
        this.nodes.set(node.id, node);
        return node;
    }

    addEdge(type, from, to){
        if(this.nodes.get(to).type == NODE_TYPE.START){
            return;
        }
        else{
            let fromNodeEdges = this.nodes.get(from).fromEdges;
            let fromNodeType = this.nodes.get(from).type;
    
            let edge;
            switch (fromNodeType) {
                case NODE_TYPE.START:
                    if(fromNodeEdges.size > 0 || type != EDGE_TYPE.NORMAL_EDGE){
                        // only one normal edge allowed from start
                        break;
                    }
                    else{
                        edge = new Edge(from, to, type);
                        break;
                    }
                
                case NODE_TYPE.END:
                    //no from output node edge allowed
                    break;
                
                case NODE_TYPE.INCREMENT:
                    // only one normal link allowed from increment link
                    if(type == EDGE_TYPE.IFZERO_EDGE || fromNodeEdges.size > 0){
                        break;
                    }
                    else{
                        edge = new Edge(from, to, type);
                        break;
                    }
                    
                case NODE_TYPE.DECREMENT:
    
                    // only one normal link and one if zero link allowed
                    if(fromNodeEdges.size > 2){
                        break;
                    }
                    
                    let isAlreadyEdge = false;
                    this.edges.forEach(edge =>{
                        if(edge.from == from && edge.type == type){
                            isAlreadyEdge = true;
                        }
                    });

                    if(isAlreadyEdge){
                        break;
                    }
                    else{
                        edge = new Edge(from, to, type);
                    }
    
                default:
                    break;
            }
            if(edge){
                this.nodes.get(edge.from).fromEdges.add(edge.id);
                this.edges.set(edge.id, edge);
                return edge;
            }
        }
    }

    deleteNode(id){
        if(this.nodes.get(id).type == NODE_TYPE.START || this.nodes.get(id).type == NODE_TYPE.END){
            return false;
        }
        else{
            let edgesIdsToDelete = [];
            this.edges.forEach(edge =>{
                if(edge.from == id || edge.to == id){
                    edgesIdsToDelete.push(edge.id);
                }
            });
            edgesIdsToDelete.forEach(id =>{
                this.deleteEdge(id);
            });
            this.nodes.delete(id);
            return true;
        }
    }

    deleteEdge(id){
        let fromNode = this.nodes.get(this.edges.get(id).from);
        fromNode.fromEdges.delete(id);
        this.edges.delete(id);
    }

    step(){
        if(this.currentId == ''){
            this.currentId = this.start.id;
        }
        else{
            let currentNode = this.nodes.get(this.currentId);
            switch (currentNode.type) {
                case NODE_TYPE.INCREMENT:
                    this.parent.incrementBox(currentNode.box);
                    // should be only one
                    currentNode.fromEdges.forEach(id =>{
                        this.currentId = this.edges.get(id).to;
                    });
                    break;

                case NODE_TYPE.DECREMENT:
                    if(this.parent.boxes.get(currentNode.box).value == 0){
                        currentNode.fromEdges.forEach(id =>{
                            if(this.edges.get(id).type == EDGE_TYPE.IFZERO_EDGE){
                                this.currentId = this.edges.get(id).to;
                            }
                        });
                    }
                    else{
                        this.parent.decrementBox(currentNode.box);
                        currentNode.fromEdges.forEach(id =>{
                            if(this.edges.get(id).type == EDGE_TYPE.NORMAL_EDGE){
                                this.currentId = this.edges.get(id).to;
                            }
                        });
                    }
                    break;

                case NODE_TYPE.START:
                    currentNode.fromEdges.forEach(id =>{
                        this.currentId = this.edges.get(id).to;
                    });
                    break;

                case NODE_TYPE.END:
                    break;

                default:
                    break;
            }
        }
    }

    deleteNodesWithBox(boxId){
        let idsToDelete = [];
        this.nodes.forEach(node =>{
            if(node.box == boxId){
                idsToDelete.push(node.id);
            }
        });
        return idsToDelete;
    }

    checkEnd(){
        if(this.currentId != '' && this.nodes.get(this.currentId).type == NODE_TYPE.END){
            return true;
        }
        else{
            return false;
        }
    }

    getCurrentNode(){
        return[this.currentId];
    }

    getCurrentEdges(){
        let edges = [];
        this.nodes.get(this.currentId).fromEdges.forEach(id =>{
            edges.push(id);
        });
        return edges;
    }
}