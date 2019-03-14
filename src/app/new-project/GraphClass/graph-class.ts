import { Node } from '../NodeClass/node-class';

export class Graph{
  public nodes: Array<Node>;

  constructor(){
    this.nodes = new Array();
  }

  addNode(newNode: Node){
    this.nodes.push(newNode);
  }

}