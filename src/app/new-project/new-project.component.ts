import { Component, OnInit } from '@angular/core';
import { Graph } from './GraphClass/graph-class';

var nodeVal;

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
  }

  ngOnInit() {
    this.ur_button = document.getElementById('ur-btn');
    this.dr_button = document.getElementById('dr-btn');
    this.canvas = document.getElementById('working-canvas');
    this.ctx = this.canvas.getContext('2d');
    console.log(`Ancho del canvas ${this.canvas.width}`);
    console.log(`Alto del canvas ${this.canvas.height}`);
    this.canvas.addEventListener('click', (ev) => {
      this.newNode(ev);
    });
    this.ur_button.addEventListener('click', () => {
      this.addUndirectedRelation();
    });
    this.dr_button.addEventListener('click', () => {
      this.addDirectedRelation();
    });
  }

  newNode(ev){
    if(this.isActive === true){
      var node = new Graph(nodeVal, ev.offsetX, ev.offsetY, this.canvas, this.ctx);
      nodeVal++;
    }
  }

  addUndirectedRelation(){
    if(this.isActive) this.isActive = !this.isActive;
    alert('Undirected Relation');
  }

  addDirectedRelation(){
    if(this.isActive) this.isActive = !this.isActive;
    alert('Directed Relation');
  }


}
