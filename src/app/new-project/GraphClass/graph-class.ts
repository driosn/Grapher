import { Node } from '../NodeClass/node-class';
import * as Collections from 'typescript-collections';

var travVal = 0;
var resultX = 400;
const INF = 100000;
var previo: Array <number> = new Array();
var dijkstra_results: Array<number> = new Array();
var warshall_travel: Array<number> = new Array();
var prim_travel: Array<number> = new Array();

export default travVal;

export class Graph{
  public nodes: Array<Node>;
  public reached: Array<Node>;
  public unreached: Array<Node>;


  constructor(){
    this.nodes = new Array();
    this.reached = new Array();
    this.unreached = new Array();
  }

  addNode(newNode: Node){
    this.nodes.push(newNode);
    this.unreached.push(newNode);
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

  floydWarshall(canvas: any, ctx: CanvasRenderingContext2D){
    const INF: Number = 999999;
    const NULL: Number = 0;
    var distances = [];
    var travel = [];
    var row_controller = new Array<Number>();
    var toShow: String = "";
    //Inicialización de matriz de distancias
    for(let i=0; i<this.nodes.length; i++){
      for(let j=0; j<this.nodes.length; j++){
        row_controller.push(INF);
      }
      distances.push(row_controller);
      row_controller = [];
    }
    //Inicialización de matriz de recorridos
    for(let i=0; i<this.nodes.length; i++){
      for(let j=0; j<this.nodes.length; j++){
        if(i === j) row_controller.push(NULL);
        else row_controller.push(j+1);  
      }
      travel.push(row_controller);
      row_controller = [];
    }
    //Llenado de matriz de distancias
    console.log(this.nodes);
    for(let i=0; i<this.nodes.length; i++){
      for(let j=0; j<this.nodes[i].relations.length; j++){
        distances[i][this.nodes[i].relations[j].value - 1] = this.nodes[i].costs[j];
      }
    }
    console.log("Matriz de distancias: ");
    this.printMatrixDistances(distances, this.nodes.length);
    console.log("Matriz de recorridos: ");
    this.printMatrixTravel(travel, this.nodes.length);

    for(let k=0; k<this.nodes.length; k++){
      for(let i=0; i<this.nodes.length; i++){
        for(let j=0; j<this.nodes.length; j++){
          if(distances[i][k] + distances[k][j] < distances[i][j]){
            if(i !== j){
              distances[i][j] = distances[i][k] + distances[k][j];
              travel[i][j] = k+1;
            }
          } 
        }
      }
      console.log(`ITERACION ${k+1}`);
      console.log("Matriz distancias");
      this.printMatrixDistances(distances, this.nodes.length)
      console.log("Matriz Recorridos: ");
      this.printMatrixTravel(travel, this.nodes.length);
    }
    var startNode = parseInt(prompt("Ingrese el nodo inicial"));
    var finishNode = parseInt(prompt("Ingrese el nodo final"));
    this.createWarshallTravelArray(travel, startNode - 1, finishNode - 1);
    console.log(warshall_travel);
    //console.log(startNode - 1);
    //console.log(finishNode - 1);
    // console.log(travel[startNode - 1][finishNode - 1]);
    warshall_travel.sort();
    console.log(warshall_travel);
    this.drawWarshall(canvas, ctx);
    this.drawWarshallTravel(canvas, ctx);
    this.drawTravelMatrix(canvas, ctx, travel);
    this.drawDistancesMatrix(canvas, ctx, distances);
  }

  prim(canvas: any, ctx: CanvasRenderingContext2D){
    //Creacion de las distancias entre todos los nodos
    const INF: Number = 999999;
    const NULL: Number = 0;
    var distances = [];
    var travel = [];
    var row_controller = new Array<Number>();
    var toShow: String = "";
    //Inicialización de matriz de distancias
    for(let i=0; i<this.nodes.length; i++){
      for(let j=0; j<this.nodes.length; j++){
        row_controller.push(INF);
      }
      distances.push(row_controller);
      row_controller = [];
    }
    //Inicialización de matriz de recorridos
    for(let i=0; i<this.nodes.length; i++){
      for(let j=0; j<this.nodes.length; j++){
        if(i === j) row_controller.push(NULL);
        else row_controller.push(j+1);  
      }
      travel.push(row_controller);
      row_controller = [];
    }
    //Llenado de matriz de distancias
    console.log(this.nodes);
    for(let i=0; i<this.nodes.length; i++){
      for(let j=0; j<this.nodes[i].relations.length; j++){
        distances[i][this.nodes[i].relations[j].value - 1] = this.nodes[i].costs[j];
      }
    }
    
    //Algoritmo de Prim
    this.reached.push(this.unreached[0]);
    this.unreached.splice(0, 1);

    while(this.unreached.length > 0){
      var record = 1000000;
      var rIndex;
      var uIndex;
      for(let i=0; i<this.reached.length; i++){
        for(let j=0; j<this.unreached.length; j++){
          var d = distances[this.reached[i].value -1 ][this.unreached[j].value -1]; 
          if(d < record){
            record = d;
            rIndex = i;
            uIndex = j;
          } 
        }
      }
      
      this.drawArrowBetweenNode(canvas, ctx, this.reached[rIndex], this.unreached[uIndex]);
      this.reached.push(this.unreached[uIndex]);
      this.unreached.splice(uIndex, 1);

    }

  }

  createWarshallTravelArray(travelDistances: any, initialNode: any, finalNode: any){
    var aux = travelDistances[initialNode][finalNode];
    warshall_travel.push(initialNode + 1);
    warshall_travel.push(finalNode + 1);  
    while(aux !== finalNode + 1){
      console.log(aux);
      warshall_travel.push(aux);
      finalNode = travelDistances[initialNode][finalNode] - 1;
      aux = travelDistances[initialNode][finalNode];
    }
  }


  printMatrixDistances(matrix: any, length: number){
    var toShow: String  = "  ";
    for(let i=1; i<=length; i++){
      toShow += i.toString() + "          ";
    }
    console.log(toShow);
    toShow = "";
    for(let i=0; i<length; i++){
      toShow += (i+1).toString() + " ";
      for(let j=0; j<length; j++){
        toShow += matrix[i][j].toString() + "        ";
      }
      console.log(toShow);
      toShow = "";
    }
  }

  printMatrixTravel(matrix: any, length: number){
    var toShow: String  = "  ";
    for(let i=1; i<=length; i++){
      toShow += i.toString() + "          ";
    }
    console.log(toShow);
    toShow = "";
    for(let i=0; i<length; i++){
      toShow += (i+1).toString() + " ";
      for(let j=0; j<length; j++){
        toShow += matrix[i][j].toString() + "          ";
      }
      console.log(toShow);
      toShow = "";
    }
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

  drawWarshall(canvas: any, ctx: CanvasRenderingContext2D){
    for(let i=0; i<warshall_travel.length-1; i++){
      this.drawArrowBetweenNode(canvas, ctx, this.nodes[warshall_travel[i] - 1], this.nodes[warshall_travel[i + 1] - 1]);
    }
  }


  drawDijkstraTravel(canvas: any, ctx: CanvasRenderingContext2D){
    var posX: number = 580;
    const posY: number = 570;
    this.drawText(canvas, ctx, 550, 530, "El recorrido es el siguiente: ");
    for(let i=0; i<dijkstra_results.length; i++){
      this.drawText(canvas, ctx, posX, posY, (dijkstra_results[i]+1).toString());
      posX += 30;
    }
  }

  drawDistancesMatrix(canvas: any, ctx: CanvasRenderingContext2D, distances: any){
    var posX: number = 380;
    var posY: number = 470;
    this.drawText(canvas, ctx, 365, 430, "Matriz de distancias: ");
    for(let i=1; i<=this.nodes.length; i++){
      this.drawTextWithColor(canvas, ctx, posX, posY, i.toString(), "blue");
      posX += 40;
    }
    posY += 40;
    posX = 380;
    for(let i=0; i<this.nodes.length; i++){
      this.drawTextWithColor(canvas, ctx, posX - 40, posY, (i+1).toString(), "blue")
      for(let j=0; j<this.nodes.length; j++){
        if(distances[i][j] === 999999){
          this.drawText(canvas, ctx, posX, posY, "0");
        }else{
          this.drawText(canvas, ctx, posX, posY, distances[i][j].toString());
        }
        posX += 40;
      }
      posX = 380;
      posY += 40;
    }
  }

  drawTravelMatrix(canvas: any, ctx: CanvasRenderingContext2D, travel: any){
    var posX: number = 680;
    var posY: number = 470;
    this.drawText(canvas, ctx, 665, 430, "Matriz de recorridos: ");
    for(let i=1; i<=this.nodes.length; i++){
      this.drawTextWithColor(canvas, ctx, posX, posY, i.toString(), "blue");
      posX += 40;
    }
    posY += 40;
    posX = 680;
    for(let i=0; i<this.nodes.length; i++){
      this.drawTextWithColor(canvas, ctx, posX - 40, posY, (i+1).toString(), "blue")
      for(let j=0; j<this.nodes.length; j++){
        if(travel[i][j] === 0){
          this.drawText(canvas, ctx, posX, posY, "-");
        }else{
          this.drawText(canvas, ctx, posX, posY, travel[i][j].toString());
        }
        posX += 40;
      }
      posX = 680;
      posY += 40;
    }
  }

  drawWarshallTravel(canvas: any, ctx: CanvasRenderingContext2D){
    var posX = 100;
    var posY = 550;
    this.drawTextWithColor(canvas, ctx, posX, posY, "Recorrido Mínimo: ", "blue");
    for(let i=0; i<warshall_travel.length; i++){
      posX += 20;
      this.drawText(canvas, ctx, posX, posY + 40, warshall_travel[i].toString());
    }
  }

  drawMinimumDistance(canvas: any, ctx: CanvasRenderingContext2D, distance: number){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText(`La distancia minima es: ${distance}`, 550, 500);
  }

  drawText(canvas: any, ctx: CanvasRenderingContext2D, posX: number, posY: number, myText: string){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText(`${myText} `, posX, posY);
  }

  drawTextWithColor(canvas: any, ctx: CanvasRenderingContext2D, posX: number, posY: number, text: string, color: string){
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = "bold 20px Arial";
    ctx.fillText(`${text} `, posX, posY);
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