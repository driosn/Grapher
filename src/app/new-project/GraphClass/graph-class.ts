import { Node } from '../NodeClass/node-class';

var travVal = 0;
export default travVal;

export class Graph{
  public nodes: Array<Node>;

  constructor(){
    this.nodes = new Array();
  }

  addNode(newNode: Node){
    this.nodes.push(newNode);
  }

  dfs(nodo: Node, canvas: any, ctx: CanvasRenderingContext2D){
    nodo.visited = true;
    console.log(nodo);
    travVal++;
    this.drawNodeTravel(nodo.positionX, nodo.positionY , canvas, ctx);
    for(let i=0; i<nodo.relations.length; i++){
      var sig_nodo: Node = nodo.relations[i]; 
        if(!sig_nodo.visited){
          this.dfs(sig_nodo, canvas, ctx);
        }
    }
  }

  bfs(nodo: Node, canvas: any, ctx: CanvasRenderingContext2D){
    var nodeAnt : Node;
    var nodeFin: Node;
    var front_node : Node, sig_node : Node;
    var queue = [];
    queue.push(nodo);
    console.log(nodo);
    nodeAnt = nodo;
    nodo.visited = true;
    while(queue.length !== 0){
      front_node = queue.shift();
      for(let i=0; i<front_node.relations.length; i++){
        sig_node = front_node.relations[i];
        if(sig_node.visited === false){
          queue.push(sig_node);
          nodeFin = sig_node;
          this.drawArrowBetweenNode(canvas, ctx, nodeAnt, nodeFin);
          travVal++;
          nodeAnt = nodeFin;
          console.log(sig_node);
          sig_node.visited = true;
         
        }
      }
    }
  }

  drawNodeTravel(posX: number, posY: number, canvas: any, ctx: CanvasRenderingContext2D){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.font = "bold 20px Arial";
    ctx.fillText(travVal.toString(), posX - 20, posY);
  }

  drawArrowBetweenNode(canvas: any, ctx: CanvasRenderingContext2D, nodeA: Node, nodeB: Node){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(nodeB.positionY-nodeA.positionY,nodeB.positionX - nodeA.positionX);
    ctx.strokeStyle = "#1976D2";
    ctx.moveTo(nodeA.positionX, nodeA.positionY);
    ctx.lineTo(nodeB.positionX, nodeB.positionY);
    ctx.lineTo(nodeB.positionX-headlen*Math.cos(angle-Math.PI/6),nodeB.positionY-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(nodeB.positionX, nodeB.positionY);
    ctx.lineTo(nodeB.positionX-headlen*Math.cos(angle+Math.PI/6),nodeB.positionY-headlen*Math.sin(angle+Math.PI/6));
    ctx.stroke();
  }
}