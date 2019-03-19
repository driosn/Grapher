import { Node } from '../NodeClass/node-class';
import * as Collections from 'typescript-collections';

var travVal = 0;
var resultX = 400;
const INF = 100000;
var previo: Array <number> = new Array();
var dijkstra_results: Array<number> = new Array();

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
    resultX += 40;
    this.drawNodeTravel(nodo.positionX, nodo.positionY , canvas, ctx);
    this.drawNodeResult(nodo, resultX, 600, canvas, ctx);
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

  dijkstra(initialNode: Node, finalNode: Node, canvas: any, ctx: CanvasRenderingContext2D){
    var inicial = initialNode.value - 1;
    var distancia: Array <number> = new Array();
    var visitado: Array <Boolean> = new Array();
    var Q = new Collections.PriorityQueue();
    var actual: any;
    var peso: number;
    var adyacente: number;
    var indices: Array<number> = new Array();
    var pesosArray: Array<number> = new Array();
    var minimo = 1000;
    var borrar: number;
    // Init Dijkstra
    for(let i=0; i<this.nodes.length; i++){
      distancia.push(INF);
      visitado.push(false);
      previo.push(-1);
    }

    Q.add(0);
    pesosArray.push(0);
    indices.push(this.nodes[inicial].value - 1);
    distancia[inicial] = 0;
    while(!Q.isEmpty()){
      minimo = 1000;
      for(let i=0; i<pesosArray.length; i++){
        if(pesosArray[i] < minimo){
          minimo = pesosArray[i];
          actual = indices[i];
          borrar = i;
        }
      }      
      pesosArray.splice(borrar, 1);
      indices.splice(borrar, 1);
      Q.dequeue();
      if(visitado[actual]) continue;
      visitado[actual] = true;
      var ady = this.nodes[actual];
      for(let i=0; i<ady.relations.length; i++){
        adyacente = ady.relations[i].value - 1;
        peso = ady.costs[i];
        if(!visitado[adyacente]){
          if((distancia[actual] + peso) < distancia[adyacente]){
            distancia[adyacente] = distancia[actual] + peso;
            previo[adyacente] = actual;
            Q.add(distancia[adyacente]);
            pesosArray.push(distancia[adyacente]);
            indices.push(this.nodes[adyacente].value -1)
          }
        }
      }
      console.log("----------------------");
      console.log(`Distancia: ${distancia}`);
      console.log(`Visitado: ${visitado}`);
      console.log(`Previo: ${previo}`);
    }
    console.log(`Distancia minima: ${distancia[finalNode.value - 1]}`);
    this.printTravel(finalNode.value - 1);

    this.drawDijkstra(canvas, ctx);
    this.drawMinimumDistance(canvas, ctx, distancia[finalNode.value - 1]);
    this.drawDijkstraTravel(canvas, ctx);
  }

  printTravel(destino: number){
    if(previo[destino] != -1){
      this.printTravel(previo[destino]);
    }
    console.log(destino);
    dijkstra_results.push(destino);
  }

  drawDijkstra(canvas: any, ctx: CanvasRenderingContext2D){
    for(let i=0; i<dijkstra_results.length-1; i++){
      this.drawArrowBetweenNode(canvas, ctx, this.nodes[dijkstra_results[i]], this.nodes[dijkstra_results[i+1]]);
    }
  }

  drawDijkstraTravel(canvas: any, ctx: CanvasRenderingContext2D){
    var posX: number = 580;
    const posY: number = 570;
    this.drawText(canvas, ctx, 550, 530, "The Dijkstra travel is: ");
    for(let i=0; i<dijkstra_results.length; i++){
      this.drawText(canvas, ctx, posX, posY, (dijkstra_results[i]+1).toString());
      posX += 30;
    }
  }

  drawMinimumDistance(canvas: any, ctx: CanvasRenderingContext2D, distance: number){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText(`The minimum distance is: ${distance}`, 550, 500);
  }

  drawText(canvas: any, ctx: CanvasRenderingContext2D, posX: number, posY: number, dijkstraResults: string){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText(`${dijkstraResults} `, posX, posY);
  }
 
  drawNodeTravel(posX: number, posY: number, canvas: any, ctx: CanvasRenderingContext2D){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.font = "bold 20px Arial";
    ctx.fillText(travVal.toString(), posX - 20, posY);
  }

  drawNodeResult(nodo: Node, posX: number, posY: number, canvas: any, ctx: CanvasRenderingContext2D){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText(nodo.value.toString(), posX, posY);
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