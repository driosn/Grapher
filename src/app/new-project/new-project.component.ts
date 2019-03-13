import { Component, OnInit } from '@angular/core';
import { Graph } from './GraphClass/graph-class';

var nodeVal;
var relationVal: boolean;
var clickCounter: number;
var clickX: number;
var clickY: number;
var clickX_ant: number;
var clickY_ant: number;

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

  constructor() {
    nodeVal = 1;
    relationVal = true;
    clickCounter = 0;
    clickX = 0;
    clickY = 0;
    clickX_ant = 0; 
    clickY_ant = 0;
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
      }
    }
  }

  newNode(pos){
    var node = new Graph(nodeVal, pos.offsetX, pos.offsetY, this.canvas, this.ctx);
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
    clickCounter++;
    clickX_ant = clickX;
    clickY_ant = clickY;
    clickX = ev.offsetX;
    clickY = ev.offsetY;
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
}
