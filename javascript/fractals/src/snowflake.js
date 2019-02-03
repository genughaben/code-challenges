import { CanvasHelper } from '../../lib/canvas.js';
import { Segment } from '../../lib/segment.js';

export class Snowflake {
  constructor(segments){
    this.segments = segments;
  }

  get length(){
    return this.segments.length;
  }

  createChilden(){
    let childSegments = []
    for (let i = 0; i < this.length; i++){
      let segment = segments[i];
      let segment_a = segment.scalmult(1/3);
      let b_helper = segment.scalmult(2/3);
      let segment_b = new Segment(b_helper.end, segment.end);
      let rot_segment = new Segment(segment_a.end, b_helper.end);
      let rotated_a60 = rot_segment.rotate(-Math.PI/3);
      let rotated_b60 = rot_segment.revert().rotate(Math.PI/3);
      childSegments.push(segment_a);
      childSegments.push(segment_b);
      childSegments.push(rotated_a60);
      childSegments.push(rotated_b60.revert());
    }
    this.segments = childSegments;
  }

  draw(segments, canvas) {
    let context = canvas.context;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < segments.length; i++){
      segments[i].display(context);
    }
  }
}
