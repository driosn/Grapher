import { Component, OnInit } from '@angular/core';
import { Graph } from './GraphClass/graph-class';

var nodeVal;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})

export class NewProjectComponent implements OnInit {

  canvas: any;
  ctx: CanvasRenderingContext2D;
  

  constructor() {
    nodeVal = 1;
  }

  ngOnInit() {
    this.canvas = document.getElementById('working-canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log(`Ancho del canvas ${this.canvas.width}`);
    console.log(`Alto del canvas ${this.canvas.height}`);
    this.canvas.addEventListener('click', this.newNode);
  }

  newNode(ev){
    let node = new Graph(nodeVal, ev.offsetX, ev.offsetY, this.canvas, this.ctx);
    nodeVal++;
  }




}
