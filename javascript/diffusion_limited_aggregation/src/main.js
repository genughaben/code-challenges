import { Point } from '../../lib/point.js'
import { Segment } from '../../lib/segment.js'
import { CanvasHelper } from '../../lib/canvas.js'
import { Walker } from './walker.js'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let canvasWidth = 600;
let canvasHeight = 600;

let canvasHelper = new CanvasHelper("container", canvasWidth, canvasHeight);
let canvas = canvasHelper.canvas;
let context = canvasHelper.context();

/*
- pick random of two => x or y cooridnate
- pick random from 0 -> convasWeight if x OR pick random from 0 -> convasHeight if y

- #iteration 1: draw a point
*/

let x, y;
var side = Math.ceil( Math.random() * 4.0 );
switch(side){
  case 1:
    y = 0;
    x = Math.ceil( Math.random() * canvasWidth );
    break;
  case 2:
    x = 0;
    y = Math.ceil( Math.random() * canvasHeight );
    break;
  case 3:
    y = Math.ceil( Math.random() * canvasHeight );;
    x = canvasWidth;
    break;
  case 4:
    x = Math.ceil( Math.random() * canvasWidth );;
    y = canvasHeight;
    break;
  default:
    break;
}

var walker = new Walker(canvasWidth, canvasHeight, 5, 5, 5, x, y);
walker.display(canvasHelper.context());

console.log("side: "+side);
console.log("Point("+x+","+y+")");
function display(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  walker.move();
  walker.display(context);
  console.log("Point("+x+","+y+")");
}
setInterval(display, 10);
