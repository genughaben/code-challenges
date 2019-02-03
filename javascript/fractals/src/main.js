import { Snowflake } from './snowflake.js'
import { Segment } from '../../lib/segment.js'

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

let snowflake = new Snowflake(segments, "container");
snowflake.draw()

document.body.addEventListener('click', function(){
  snowflake.createChilden()
  snowflake.draw();
}, true);
