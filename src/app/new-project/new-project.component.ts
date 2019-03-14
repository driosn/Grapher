import { Component, OnInit } from '@angular/core';
import { Node } from './NodeClass/node-class';
import { Graph } from './GraphClass/graph-class';

var nodeVal;
var relationVal: boolean;
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
  project_graph: Graph;

  constructor() {
    posNodeIni = -1;
    posNodeFin = -1;
    nodeVal = 1;
    relationVal = true;
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
    this.canvas = document.getElementById('working-canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log(`Ancho del canvas ${this.canvas.width}`);
    console.log(`Alto del canvas ${this.canvas.height}`);
    this.canvas.addEventListener('click', (ev) => {
      this.optionSelector(ev);
    });
    this.ur_button.addEventListener('click', (ev) => {
      this.addUndirectedRelation(ev);
    });
    this.dr_button.addEventListener('click', (ev) => {
      this.addDirectedRelation(ev);
    });
  }

  optionSelector(ev){
    if(this.isActive === true) this.newNode(ev);
    else{
      if(relationVal){
        console.log(relationVal);
        this.setClicks(ev);
        this.lineDrawer_DR();
      }else{
        console.log(relationVal);
        this.setClicks(ev);
        this.lineDrawer_UR();
        console.log(`Relaciones`);
        console.log(this.project_graph.nodes[posNodeIni]);
        console.log(this.project_graph.nodes[posNodeFin]);
      }
    }
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
  
  lineDrawer_UR(){
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
      clickCounter = 0;
      // Añadiendo la relacion
      console.log(`Relacion entre nodos ${posNodeIni} y nodo ${posNodeFin}`);
      this.project_graph.nodes[posNodeIni].addRelation(this.project_graph.nodes[posNodeFin]);
      this.project_graph.nodes[posNodeFin].addRelation(this.project_graph.nodes[posNodeIni]);
    }
  }

  lineDrawer_DR(){
    if(clickCounter === 2){
      this.canvas = document.getElementById('working-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.moveTo(clickX_ant, clickY_ant);
      this.ctx.moveTo(clickX, clickY);
      this.ctx.stroke(); 
      clickCounter = 0;
    }
  }

  evalateQuadrant(ev){
    if(ev.offsetX < 450 && ev.offsetY < 350) return 1;
    if(ev.offsetX > 450 && ev.offsetY < 350) return 2;
    if(ev.offsetX < 450 && ev.offsetY > 350) return 3;
    if(ev.offsetX > 450 && ev.offsetY > 350) return 4;
  }
  
}
