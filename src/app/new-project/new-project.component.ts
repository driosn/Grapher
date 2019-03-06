import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  canvas: any;
  ctx: CanvasRenderingContext2D;
  iterator: number;

  constructor() { }

  ngOnInit() {
    this.iterator = 0;
    this.canvas = document.getElementById('working-canvas')
    console.log(`Ancho del canvas ${this.canvas.width}`);
    console.log(`Alto del canvas ${this.canvas.height}`);
    this.ctx = this.canvas.getContext('2d');
    // this.ctx.beginPath();
    // this.ctx.moveTo(450, 0);
    // this.ctx.lineTo(450, 700);
    // this.ctx.stroke();
    // this.ctx.beginPath();
    // this.ctx.moveTo(0, 350);
    // this.ctx.lineTo(900, 350);
    // this.ctx.stroke();
    this.canvas.addEventListener('click', this.drawCircle);
  }

  drawCircle(ev, it: string){
    // Offset X and Y to select the point to draw
    console.log(ev);
    this.iterator = 1;
    this.canvas = document.getElementById('working-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.arc(ev.offsetX, ev.offsetY, 22.5, 0, 2*Math.PI, false);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#FF0000';
    this.ctx.stroke();
    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 16px Arial";
    this.ctx.fillText(this.iterator.toString(), ev.offsetX - 5, ev.offsetY + 5);
    this.iterator++;
  }



}
