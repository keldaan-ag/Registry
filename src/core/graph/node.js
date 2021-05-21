import {NODE_TYPE} from '../../constants/index';
import uniqid from 'uniqid';

export default class Node{
    constructor(type, box){
        this.id = uniqid();
        this.type = type;
        this.box = box;
        this.symbol = '';
        switch (this.type) {
            case NODE_TYPE.START:
                break;
            
            case NODE_TYPE.END:
                break;
            
            case NODE_TYPE.INCREMENT:
                this.symbol = '+';
                break;
            
            case NODE_TYPE.DECREMENT:
                this.symbol = '-';
                break;
                
            default:
                break;
        }
        this.fromEdges = new Set();
    }

    getName(){
        return `${this.box}${this.symbol}`;
    }
}