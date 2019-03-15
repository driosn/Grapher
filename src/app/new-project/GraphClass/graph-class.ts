import { Node } from '../NodeClass/node-class';

export class Graph{
  public nodes: Array<Node>;

  constructor(){
    this.nodes = new Array();
  }

  addNode(newNode: Node){
    this.nodes.push(newNode);
  }

  dfs(nodo: Node){
    nodo.visited = true;
    console.log(nodo);
    for(let i=0; i<nodo.relations.length; i++){
      var sig_nodo: Node = nodo.relations[i]; 
        if(!sig_nodo.visited){
          this.dfs(sig_nodo);
        }
    }
  }

}