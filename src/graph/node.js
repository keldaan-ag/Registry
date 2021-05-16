import {NODE_TYPE} from '../constants/index';

export default class Node{
    constructor(id, type, box){
        this.id = id;
        this.type = type;
        this.box = box;
        this.symbol = '';
        switch (this.type) {
            case NODE_TYPE.INPUT:
                break;
            
            case NODE_TYPE.OUTPUT:
                break;
            
            case NODE_TYPE.INCREMENT:
                this.symbol = '+';
                break;
            
            case NODE_TYPE.DECREMENT:
                this.symbol = '-';
        
            default:
                break;
        }
    }

    getName(){
        return `${this.box}${this.symbol}`;
    }
}