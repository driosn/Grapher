import { Component, OnInit } from '@angular/core';
import { Node } from './NodeClass/node-class';
import { Graph } from './GraphClass/graph-class';

var nodeVal;
var relationVal: boolean;
var costOption: boolean;
var clickCounter: number;
var clickX: number;
var clickY: number;
var clickX_ant: number;
var clickY_ant: number;
var posNodeIni: number;
var posNodeFin: number;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})

export class NewProjectComponent implements OnInit {

  isActive = true;
  canvas: any;
  ctx: CanvasRenderingContext2D;
  ur_button;
  dr_button;
  urCost_button;
  drCost_button;
  dfs_button;
  bfs_button;
  dijkstra_button;
  project_graph: Graph;

  constructor() {
    posNodeIni = -1;
    posNodeFin = -1;
    nodeVal = 1;
    relationVal = true;
    costOption = false;
    clickCounter = 0;
    clickX = 0;
    clickY = 0;
    clickX_ant = 0; 
    clickY_ant = 0;
    this.project_graph = new Graph();
  }

  ngOnInit() {
    this.ur_button = document.getElementById('ur-btn');
    this.dr_button = document.getElementById('dr-btn');
    this.urCost_button = document.getElementById('ur-btn-cost');
    this.drCost_button = document.getElementById('dr-btn-cost');
    this.dfs_button = document.getElementById('dfs-btn');
    this.bfs_button = document.getElementById('bfs-btn');
    this.dijkstra_button = document.getElementById('dijkstra-btn');
    this.canvas = document.getElementById('working-canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log(`Ancho del canvas ${this.canvas.width}`);
    console.log(`Alto del canvas ${this.canvas.height}`);
    this.canvas.addEventListener('click', (ev) => {
      this.optionSelector(ev);
    });
    this.ur_button.addEventListener('click', (ev) => {
      this.addUndirectedRelation(ev);
      costOption = false;
    });
    this.dr_button.addEventListener('click', (ev) => {
      this.addDirectedRelation(ev);
      costOption = false;
    });
    this.urCost_button.addEventListener('click', (ev) => {
      this.addUndirectedRelation(ev);
      costOption = true;
    });
    this.drCost_button.addEventListener('click', (ev) =>{
      this.addDirectedRelation(ev);
      costOption = true;
  })
    this.dfs_button.addEventListener('click', () =>{
      console.log('Inicio DFS');
      this.startDFS(this.project_graph);
    });
    this.bfs_button.addEventListener('click', () => {
      console.log('Inicio BFS');
      this.startBFS(this.project_graph);
    });
    this.dijkstra_button.addEventListener('click', () => {
      console.log('Inicio Dijkstra');
      this.startDijkstra(this.project_graph);
    })
  }

  optionSelector(ev){
    console.log(relationVal);
    if(this.isActive === true) this.newNode(ev);
    else{
      if(relationVal){
        console.log(relationVal);
        this.setClicks(ev);
        this.lineDrawer_DR(costOption);
      }else{
        console.log(relationVal);
        this.setClicks(ev);
        this.lineDrawer_UR(costOption);
        console.log(`Relaciones`);
        console.log(this.project_graph.nodes[posNodeIni]);
        console.log(this.project_graph.nodes[posNodeFin]);
      }
    }
    console.log(this.project_graph);
  }

  newNode(pos){
    var node = new Node(nodeVal, pos.offsetX, pos.offsetY, this.canvas, this.ctx);
    this.project_graph.addNode(node);
    console.log(this.project_graph);
    nodeVal++;
  }

  addUndirectedRelation(ev){
    if(this.isActive) this.isActive = !this.isActive;
    relationVal = false;
  }

  addDirectedRelation(ev){
    if(this.isActive) this.isActive = !this.isActive;
    relationVal = true;
  }

  startDFS(mygraph: Graph){
    let initial_node: number = parseInt(prompt(`In which node you want to start(number): `));
    this.project_graph.dfs(this.project_graph.nodes[initial_node-1], this.canvas, this.ctx);

  }

  startBFS(myGraph: Graph){
    let initial_node: number = parseInt(prompt('In which node you want to start(number): '));
    this.project_graph.bfs(this.project_graph.nodes[initial_node-1], this.canvas, this.ctx);
  }

  startDijkstra(myGraph: Graph){
    let initial_node: number = parseInt(prompt('In which node you want to start(number): '));
    let final_node: number = parseInt(prompt('In which node you want to finish(number): '));
    this.project_graph.dijkstra(this.project_graph.nodes[initial_node-1], this.project_graph.nodes[final_node -1], this.canvas, this.ctx);
  }

  setClicks(ev){
    let clickQuadrant = this.evalateQuadrant(ev);
    let minPointDistance = 500;
    let pointDistance;
    clickCounter++;
    clickX_ant = clickX;
    clickY_ant = clickY;
    posNodeIni = posNodeFin;
    for(let i=0; i<this.project_graph.nodes.length; i++){
      if(this.project_graph.nodes[i].quadrant === clickQuadrant){
        pointDistance = Math.sqrt(Math.pow((this.project_graph.nodes[i].positionX - ev.offsetX), 2) + (Math.pow((this.project_graph.nodes[i].positionY - ev.offsetY), 2)));
        if(pointDistance < minPointDistance){
          minPointDistance = pointDistance;
          clickX = this.project_graph.nodes[i].positionX;
          clickY = this.project_graph.nodes[i].positionY;
          posNodeFin = i;
        }
      }
    }
  }
  
  lineDrawer_UR(drawNumber: boolean){
    if(clickCounter === 2){
      console.log(`El click counter es: ${clickCounter}`)
      console.log(`ClickX: ${clickX}, ClickY: ${clickY}, ClickX_ant: ${clickX_ant}, ClickY_ant: ${clickY_ant}`)
      this.canvas = document.getElementById('working-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.moveTo(clickX_ant, clickY_ant);
      this.ctx.lineTo(clickX, clickY);
      this.ctx.stroke();
      if(drawNumber){
        let costValue = prompt('Enter the cost of the arist');
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText(costValue.toString(), (clickX_ant + clickX)/2 - 10, (clickY_ant + clickY)/2 - 10);
        // Añadiendo el costo
        this.project_graph.nodes[posNodeIni].addCost(parseInt(costValue));
        this.project_graph.nodes[posNodeFin].addCost(parseInt(costValue));
      }else{
        this.project_graph.nodes[posNodeIni].addCost(0);
        this.project_graph.nodes[posNodeFin].addCost(0);
      }
      clickCounter = 0;
      // Añadiendo la relacion
      console.log(`Relacion entre nodos ${posNodeIni} y nodo ${posNodeFin}`);
      this.project_graph.nodes[posNodeIni].addRelation(this.project_graph.nodes[posNodeFin]);
      this.project_graph.nodes[posNodeFin].addRelation(this.project_graph.nodes[posNodeIni]);
    }
  }

  lineDrawer_DR(drawNumber: boolean){
    if(clickCounter === 2){
      this.canvas = document.getElementById('working-canvas');
      this.ctx = this.canvas.getContext('2d');
      var headlen = 10;   // length of head in pixels
      var angle = Math.atan2(clickY-clickY_ant,clickX-clickX_ant);
      this.ctx.moveTo(clickX_ant, clickY_ant);
      this.ctx.lineTo(clickX, clickY);
      this.ctx.lineTo(clickX-headlen*Math.cos(angle-Math.PI/6),clickY-headlen*Math.sin(angle-Math.PI/6));
      this.ctx.moveTo(clickX, clickY);
      this.ctx.lineTo(clickX-headlen*Math.cos(angle+Math.PI/6),clickY-headlen*Math.sin(angle+Math.PI/6));
      this.ctx.stroke();
      if(drawNumber){
        let costValue = prompt('Enter the cost of the arist');
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText(costValue.toString(), (clickX_ant + clickX)/2 - 10, (clickY_ant + clickY)/2 - 10);
        // Añadiendo el costo
        this.project_graph.nodes[posNodeIni].addCost(parseInt(costValue));
      }else{
        this.project_graph.nodes[posNodeIni].addCost(0);
      }
      clickCounter = 0;
      //Añadiendo la relacion
      console.log(`Relacion entre nodos ${posNodeIni} y nodo ${posNodeFin}`);
      this.project_graph.nodes[posNodeIni].addRelation(this.project_graph.nodes[posNodeFin]);
    }
  }

  evalateQuadrant(ev){
    if(ev.offsetX < 450 && ev.offsetY < 350) return 1;
    if(ev.offsetX > 450 && ev.offsetY < 350) return 2;
    if(ev.offsetX < 450 && ev.offsetY > 350) return 3;
    if(ev.offsetX > 450 && ev.offsetY > 350) return 4;
  }
  
}
