import { Snowflake } from './snowflake.js'
import { Segment } from '../../lib/segment.js'
import { CanvasHelper } from '../../lib/canvas.js'

// triangle base
// let startSegment1 = Segment.createFromCoordinates(600,600,300,600);
// let startSegment2 = Segment.createFromCoordinates(300,600,450,340);
// let startSegment3 = Segment.createFromCoordinates(450,340,600,600);

// square base
let startSegment1 = Segment.createFromCoordinates(600,600,300,600);
let startSegment2 = Segment.createFromCoordinates(300,600,300,300);
let startSegment3 = Segment.createFromCoordinates(300,300,600,300);
let startSegment4 = Segment.createFromCoordinates(600,300,600,600);

var segments = [
  startSegment1,
  startSegment2,
  startSegment3,
  startSegment4
];

let canvas = new CanvasHelper().create();
var container = document.querySelector('#container');
// var container = document.getElementById("container");
container.append(canvas);

let snowflake = new Snowflake(segments);
snowflake.draw()

document.body.addEventListener('click', function(){
  sn.createChilden()
  sn.draw();
}, true);
