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
var isActive: boolean;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})

export class NewProjectComponent implements OnInit {

  canvas: any;
  ctx: CanvasRenderingContext2D;
  node_button;
  simpson_button;
  ur_button;
  dr_button;
  urCost_button;
  drCost_button;
  dfs_button;
  bfs_button;
  dijkstra_button;
  warshall_button;
  prim_button;
  project_graph: Graph;

  constructor() {
    isActive = false;
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
    this.node_button = document.getElementById('add-node');
    this.simpson_button = document.getElementById('simpson-btn');
    this.ur_button = document.getElementById('ur-btn');
    this.dr_button = document.getElementById('dr-btn');
    this.urCost_button = document.getElementById('ur-btn-cost');
    this.drCost_button = document.getElementById('dr-btn-cost');
    this.dfs_button = document.getElementById('dfs-btn');
    this.bfs_button = document.getElementById('bfs-btn');
    this.dijkstra_button = document.getElementById('dijkstra-btn');
    this.warshall_button = document.getElementById('warshall-btn');
    this.prim_button = document.getElementById('prim-btn');
    this.canvas = document.getElementById('working-canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log(`Ancho del canvas ${this.canvas.width}`);
    console.log(`Alto del canvas ${this.canvas.height}`);
    this.canvas.addEventListener('click', (ev) => {
      this.optionSelector(ev);
    });
    this.node_button.addEventListener('click', () => {
      console.log('Add a node clicked');
      if(!isActive) isActive = true;
      this.node_button.style.backgroundColor = "#1976D2";
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
    });
    this.simpson_button.addEventListener('click', () => {
      // alert("Ejemplo simpson");
      this.node_button.style.backgroundColor = "transparent";
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "#1976D2";
      this.simpsonsExample();
    });
    this.ur_button.addEventListener('click', (ev) => {
      this.node_button.style.backgroundColor = "transparent";
      this.ur_button.style.backgroundColor = "#1976D2";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
      this.addUndirectedRelation(ev);
      costOption = false;
    });
    this.dr_button.addEventListener('click', (ev) => {
      this.node_button.style.backgroundColor = "transparent";
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "#1976D2";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
      this.addDirectedRelation(ev);
      costOption = false;
    });
    this.urCost_button.addEventListener('click', (ev) => {
      this.node_button.style.backgroundColor = "transparent";
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "#1976D2";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
      this.addUndirectedRelation(ev);
      costOption = true;
    });
    this.drCost_button.addEventListener('click', (ev) =>{
      this.node_button.style.backgroundColor = "transparent";
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "#1976D2";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
      this.addDirectedRelation(ev);
      costOption = true;
  })
    this.dfs_button.addEventListener('click', () =>{
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "#1976D2";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
      console.log('Inicio DFS');
      this.startDFS(this.project_graph);
    });
    this.bfs_button.addEventListener('click', () => {
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "#1976D2";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.simpson_button.style.backgroundColor = "transparent";
      console.log('Inicio BFS');
      this.startBFS(this.project_graph);
    });
    this.dijkstra_button.addEventListener('click', () => {
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "#1976D2";
      this.simpson_button.style.backgroundColor = "transparent";
      console.log('Inicio Dijkstra');
      this.startDijkstra(this.project_graph);
    });
    this.warshall_button.addEventListener('click', () => {
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.warshall_button.style.backgroundColor = "#1976D2";
      this.simpson_button.style.backgroundColor = "transparent";
      console.log('Inicio Floyd Warshall');
      this.startWarshall(this.project_graph);
    });
    this.prim_button.addEventListener('click', () => {
      this.ur_button.style.backgroundColor = "transparent";
      this.dr_button.style.backgroundColor = "transparent";
      this.urCost_button.style.backgroundColor = "transparent";
      this.drCost_button.style.backgroundColor = "transparent";
      this.dfs_button.style.backgroundColor = "transaprent";
      this.bfs_button.style.backgroundColor = "transparent";
      this.dijkstra_button.style.backgroundColor = "transparent";
      this.warshall_button.style.backgroundColor = "transparent";
      this.prim_button.style.backgroundColor = "#1976D2";
      this.simpson_button.style.backgroundColor = "transparent";
      console.log('Inicio Algoritmo Prim');
      this.startPrim(this.project_graph);
    });
  }

  optionSelector(ev){
    console.log(relationVal);
    if(isActive === true) this.newNode(ev);
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

  simpsonsExample(){
    this.createNodeForSimpsonsExample(100, this.canvas.height/2); //1
    this.createNodeForSimpsonsExample(220, 200); //2
    this.createNodeForSimpsonsExample(220, 500); //3
    this.createNodeForSimpsonsExample(340, 100); //4
    this.createNodeForSimpsonsExample(340, this.canvas.height/2); //5
    this.createNodeForSimpsonsExample(340, 600); //6
    this.createNodeForSimpsonsExample(460, 200); //7
    this.createNodeForSimpsonsExample(460, 500); //8
    this.createNodeForSimpsonsExample(580, 100); //9
    this.createNodeForSimpsonsExample(640, 200); //10
    this.createNodeForSimpsonsExample(610, 400); //11
    this.createNodeForSimpsonsExample(610, 550); //12
    this.createNodeForSimpsonsExample(750, 100); //13
    this.createNodeForSimpsonsExample(800, this.canvas.height/2); //14
    this.createNodeForSimpsonsExample(750, 550); //15

    this.simpleLineDrawer_UR(this.project_graph.nodes[0].positionX, this.project_graph.nodes[0].positionY, this.project_graph.nodes[1].positionX, this.project_graph.nodes[1].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[0].positionX, this.project_graph.nodes[0].positionY, this.project_graph.nodes[2].positionX, this.project_graph.nodes[2].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[0].positionX, this.project_graph.nodes[0].positionY, this.project_graph.nodes[4].positionX, this.project_graph.nodes[4].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[1].positionX, this.project_graph.nodes[1].positionY, this.project_graph.nodes[3].positionX, this.project_graph.nodes[3].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[1].positionX, this.project_graph.nodes[1].positionY, this.project_graph.nodes[6].positionX, this.project_graph.nodes[6].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[1].positionX, this.project_graph.nodes[1].positionY, this.project_graph.nodes[4].positionX, this.project_graph.nodes[4].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[2].positionX, this.project_graph.nodes[2].positionY, this.project_graph.nodes[4].positionX, this.project_graph.nodes[4].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[2].positionX, this.project_graph.nodes[2].positionY, this.project_graph.nodes[5].positionX, this.project_graph.nodes[5].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[3].positionX, this.project_graph.nodes[3].positionY, this.project_graph.nodes[6].positionX, this.project_graph.nodes[6].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[3].positionX, this.project_graph.nodes[3].positionY, this.project_graph.nodes[8].positionX, this.project_graph.nodes[8].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[4].positionX, this.project_graph.nodes[4].positionY, this.project_graph.nodes[6].positionX, this.project_graph.nodes[6].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[4].positionX, this.project_graph.nodes[4].positionY, this.project_graph.nodes[10].positionX, this.project_graph.nodes[10].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[4].positionX, this.project_graph.nodes[4].positionY, this.project_graph.nodes[7].positionX, this.project_graph.nodes[7].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[5].positionX, this.project_graph.nodes[5].positionY, this.project_graph.nodes[7].positionX, this.project_graph.nodes[7].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[5].positionX, this.project_graph.nodes[5].positionY, this.project_graph.nodes[11].positionX, this.project_graph.nodes[11].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[6].positionX, this.project_graph.nodes[6].positionY, this.project_graph.nodes[8].positionX, this.project_graph.nodes[8].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[6].positionX, this.project_graph.nodes[6].positionY, this.project_graph.nodes[9].positionX, this.project_graph.nodes[9].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[7].positionX, this.project_graph.nodes[7].positionY, this.project_graph.nodes[10].positionX, this.project_graph.nodes[10].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[7].positionX, this.project_graph.nodes[7].positionY, this.project_graph.nodes[11].positionX, this.project_graph.nodes[11].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[8].positionX, this.project_graph.nodes[8].positionY, this.project_graph.nodes[9].positionX, this.project_graph.nodes[9].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[8].positionX, this.project_graph.nodes[8].positionY, this.project_graph.nodes[12].positionX, this.project_graph.nodes[12].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[9].positionX, this.project_graph.nodes[9].positionY, this.project_graph.nodes[10].positionX, this.project_graph.nodes[10].positionY); 
    this.simpleLineDrawer_UR(this.project_graph.nodes[9].positionX, this.project_graph.nodes[9].positionY, this.project_graph.nodes[12].positionX, this.project_graph.nodes[12].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[9].positionX, this.project_graph.nodes[9].positionY, this.project_graph.nodes[13].positionX, this.project_graph.nodes[13].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[10].positionX, this.project_graph.nodes[10].positionY, this.project_graph.nodes[14].positionX, this.project_graph.nodes[14].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[8].positionX, this.project_graph.nodes[8].positionY, this.project_graph.nodes[12].positionX, this.project_graph.nodes[12].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[11].positionX, this.project_graph.nodes[11].positionY, this.project_graph.nodes[14].positionX, this.project_graph.nodes[14].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[12].positionX, this.project_graph.nodes[12].positionY, this.project_graph.nodes[13].positionX, this.project_graph.nodes[13].positionY);
    this.simpleLineDrawer_UR(this.project_graph.nodes[13].positionX, this.project_graph.nodes[13].positionY, this.project_graph.nodes[14].positionX, this.project_graph.nodes[14].positionY);

    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[0].positionX+this.project_graph.nodes[1].positionX)/2, (this.project_graph.nodes[0].positionY+this.project_graph.nodes[1].positionY)/2 - 10, "8");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[0].positionX+this.project_graph.nodes[4].positionX)/2, (this.project_graph.nodes[0].positionY+this.project_graph.nodes[4].positionY)/2 - 10, "10");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[0].positionX+this.project_graph.nodes[2].positionX)/2, (this.project_graph.nodes[0].positionY+this.project_graph.nodes[2].positionY)/2 - 10, "17");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[1].positionX+this.project_graph.nodes[3].positionX)/2, (this.project_graph.nodes[1].positionY+this.project_graph.nodes[3].positionY)/2 - 10, "6");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[1].positionX+this.project_graph.nodes[6].positionX)/2, (this.project_graph.nodes[1].positionY+this.project_graph.nodes[6].positionY)/2 - 10, "11");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[1].positionX+this.project_graph.nodes[4].positionX)/2, (this.project_graph.nodes[1].positionY+this.project_graph.nodes[4].positionY)/2 - 10, "12");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[2].positionX+this.project_graph.nodes[4].positionX)/2, (this.project_graph.nodes[2].positionY+this.project_graph.nodes[4].positionY)/2 - 10, "6");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[2].positionX+this.project_graph.nodes[5].positionX)/2, (this.project_graph.nodes[2].positionY+this.project_graph.nodes[5].positionY)/2 - 10, "8");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[3].positionX+this.project_graph.nodes[6].positionX)/2, (this.project_graph.nodes[3].positionY+this.project_graph.nodes[6].positionY)/2 - 10, "9");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[3].positionX+this.project_graph.nodes[8].positionX)/2, (this.project_graph.nodes[3].positionY+this.project_graph.nodes[8].positionY)/2 - 10, "12");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[4].positionX+this.project_graph.nodes[6].positionX)/2, (this.project_graph.nodes[4].positionY+this.project_graph.nodes[6].positionY)/2 - 10, "9");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[4].positionX+this.project_graph.nodes[10].positionX)/2, (this.project_graph.nodes[4].positionY+this.project_graph.nodes[10].positionY)/2 - 10, "25");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[4].positionX+this.project_graph.nodes[7].positionX)/2, (this.project_graph.nodes[4].positionY+this.project_graph.nodes[7].positionY)/2 - 10, "21");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[5].positionX+this.project_graph.nodes[7].positionX)/2, (this.project_graph.nodes[5].positionY+this.project_graph.nodes[7].positionY)/2 - 10, "10");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[5].positionX+this.project_graph.nodes[11].positionX)/2, (this.project_graph.nodes[5].positionY+this.project_graph.nodes[11].positionY)/2 - 10, "1");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[6].positionX+this.project_graph.nodes[8].positionX)/2, (this.project_graph.nodes[6].positionY+this.project_graph.nodes[8].positionY)/2 - 10, "10");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[6].positionX+this.project_graph.nodes[9].positionX)/2, (this.project_graph.nodes[6].positionY+this.project_graph.nodes[9].positionY)/2 - 10, "15");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[7].positionX+this.project_graph.nodes[10].positionX)/2, (this.project_graph.nodes[7].positionY+this.project_graph.nodes[10].positionY)/2 - 10, "4");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[7].positionX+this.project_graph.nodes[11].positionX)/2, (this.project_graph.nodes[7].positionY+this.project_graph.nodes[11].positionY)/2 - 10, "5");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[8].positionX+this.project_graph.nodes[9].positionX)/2, (this.project_graph.nodes[8].positionY+this.project_graph.nodes[9].positionY)/2 - 10, "8");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[8].positionX+this.project_graph.nodes[12].positionX)/2, (this.project_graph.nodes[8].positionY+this.project_graph.nodes[12].positionY)/2 - 10, "13");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[9].positionX+this.project_graph.nodes[12].positionX)/2, (this.project_graph.nodes[9].positionY+this.project_graph.nodes[12].positionY)/2 - 10, "5");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[9].positionX+this.project_graph.nodes[13].positionX)/2, (this.project_graph.nodes[9].positionY+this.project_graph.nodes[13].positionY)/2 - 10, "10");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[9].positionX+this.project_graph.nodes[10].positionX)/2, (this.project_graph.nodes[9].positionY+this.project_graph.nodes[10].positionY)/2 - 10, "6");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[10].positionX+this.project_graph.nodes[14].positionX)/2, (this.project_graph.nodes[10].positionY+this.project_graph.nodes[14].positionY)/2 - 10, "2");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[11].positionX+this.project_graph.nodes[14].positionX)/2, (this.project_graph.nodes[11].positionY+this.project_graph.nodes[14].positionY)/2 - 10, "12");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[12].positionX+this.project_graph.nodes[13].positionX)/2, (this.project_graph.nodes[12].positionY+this.project_graph.nodes[13].positionY)/2 - 10, "8");
    this.project_graph.drawText(this.canvas, this.ctx, (this.project_graph.nodes[13].positionX+this.project_graph.nodes[14].positionX)/2, (this.project_graph.nodes[13].positionY+this.project_graph.nodes[14].positionY)/2 - 10, "7");



    



    console.log(this.canvas.height);
    console.log(this.canvas.width);
  }
  
  // Alto del canvas es 700
  // Ancho del canvas es 900
  createNodeForSimpsonsExample(posX, posY){
    var node = new Node(nodeVal, posX, posY, this.canvas, this.ctx);
    this.project_graph.addNode(node);
    nodeVal++;
  }

  addUndirectedRelation(ev){
    if(isActive) isActive = !isActive;
    relationVal = false;
  }

  addDirectedRelation(ev){
    if(isActive) isActive = !isActive;
    relationVal = true;
  }

  startDFS(mygraph: Graph){
    let initial_node: number = parseInt(prompt(`En que nodo quiere terminar(numeros): `));
    this.project_graph.dfs(this.project_graph.nodes[initial_node-1], this.canvas, this.ctx);

  }

  startBFS(myGraph: Graph){
    let initial_node: number = parseInt(prompt('En que nodo quiere empezar(numero): '));
    this.project_graph.bfs(this.project_graph.nodes[initial_node-1], this.canvas, this.ctx);
  }

  startDijkstra(myGraph: Graph){
    let initial_node: number = parseInt(prompt('En que nodo quiere empezar(numero): '));
    let final_node: number = parseInt(prompt('En que nodo quiere terminar(numero): '));
    this.project_graph.dijkstra(this.project_graph.nodes[initial_node-1], this.project_graph.nodes[final_node -1], this.canvas, this.ctx);
  }

  startWarshall(myGraph: Graph){
    this.project_graph.floydWarshall(this.canvas, this.ctx);
  }

  startPrim(myGraph: Graph){
    this.project_graph.prim(this.canvas, this.ctx);
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

  simpleLineDrawer_UR(posX_initial, posY_initial, posX_final, posY_final){
    this.canvas = document.getElementById('working-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.moveTo(posX_initial, posY_initial);
      this.ctx.lineTo(posX_final, posY_final);
      this.ctx.stroke();
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
