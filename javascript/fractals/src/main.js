import { Snowflake } from './snowflake.js'
import { Segment } from '../../lib/segment.js'
import { CanvasHelper } from '../../lib/canvas.js'

let canvasWidth = 600;
let canvasHeight = 600;


// triangle base
let td = canvasWidth / 3; // triangleDimension
let td2 = (td / 10) * 11.33;
var p1 = (td*2, td*2); // 400, 400
var p2 = (td*1.5, td2); // 300, 340
var p3 = (td, td*2); //
let triangleSegment1 = Segment.createFromCoordinates(td*2,td*2, td,td*2);
let triangleSegment2 = Segment.createFromCoordinates(td,td*2, td*1.5,td2);
let triangleSegment3 = Segment.createFromCoordinates(td*1.5,td2, td*2,td*2);

var triangleSegments = [
  triangleSegment1,
  triangleSegment2,
  triangleSegment3
]

// square base
let sd = canvasHeight/3; // sd = squareDimension
let squareSegment1 = Segment.createFromCoordinates(sd*2,sd*2,sd,sd*2);
let squareSegment2 = Segment.createFromCoordinates(sd,sd*2,sd,sd);
let squareSegment3 = Segment.createFromCoordinates(sd,sd,sd*2,sd);
let squareSegment4 = Segment.createFromCoordinates(sd*2,sd,sd*2,sd*2);

var squareSegments = [
  squareSegment1,
  squareSegment2,
  squareSegment3,
  squareSegment4
];

var startShapes = {
  "square": squareSegments,
  "triangle": triangleSegments
}

let canvasHelper = new CanvasHelper("container", canvasWidth, canvasHeight);
let snowflake = new Snowflake(startShapes['triangle'], canvasHelper);
snowflake.draw()

document.body.addEventListener('click', function(){
  snowflake.createChilden()
  snowflake.draw();
}, true);
