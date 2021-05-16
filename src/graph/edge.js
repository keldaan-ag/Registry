import uniqid from 'uniqid';

export default class Edge{
    constructor(from, to, type){
        this.id = uniqid();
        this.from = from;
        this.to = to;
        this.type = type;
    }
}