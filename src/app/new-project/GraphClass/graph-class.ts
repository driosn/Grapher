export class Graph{
  public value: number;

  public constructor(val: number, posX: number, posY: number, canvas: any, ctx: CanvasRenderingContext2D){
    this.value = val;
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(posX, posY, 22.5, 0, 2*Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    ctx.fillText(this.value.toString(), posX - 5, posY + 5);
  }

}