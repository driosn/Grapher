export class Node{
  public value: number;
  public positionX: number;
  public positionY: number;
  public quadrant: number;
  public relations: Array<Node>;
  public costs: Array<number>;
  public visited: boolean;

  public constructor(val: number, posX: number, posY: number, canvas: any, ctx: CanvasRenderingContext2D){
    this.visited = false;
    this.relations = new Array();
    this.costs = new Array();
    this.value = val;
    this.positionX = posX;
    this.positionY = posY;
    canvas = document.getElementById('working-canvas');
    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(posX, posY, 32.5, 0, 2*Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "blue";
    ctx.font = "bold 20px Arial";
    ctx.fillText(this.value.toString(), posX + 7, posY);
    this.setQuadrant(this.positionX, this.positionY);
  }

  setQuadrant(posX: number, posY: number){
    if(posX < 450 && posY < 350) this.quadrant = 1;
    if(posX > 450 && posY < 350) this.quadrant = 2;
    if(posX < 450 && posY > 350) this.quadrant = 3;
    if(posX > 450 && posY > 350) this.quadrant = 4;
  }

  addRelation(nodeToAdd: Node){
    this.relations.push(nodeToAdd);
  }

  addCost(costToAdd: number){
    this.costs.push(costToAdd);
  }

}