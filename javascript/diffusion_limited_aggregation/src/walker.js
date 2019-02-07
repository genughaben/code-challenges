import { CanvasHelper } from '../../lib/canvas.js';
import { Segment } from '../../lib/segment.js';
import { Point } from '../../lib/point.js';

export class Walker {
  constructor(max_x, max_y, move_x, move_y, radius, start_x, start_y){
    if(arguments.length == 5){
      this.pos = Point.random(x_max, y_max);

      this.stuck = false
    }
    if(arguments.length == 7){
      this.pos = Point.random(start_x, start_y);
      this.stuck = true;
    }
    this.radius = radius;
    this.move_x = move_x;
    this.move_y = move_y;
  }

  move(){
    var sign_x = Math.random() < 0.5 ? -1 : 1;
    var sign_y = Math.random() < 0.5 ? -1 : 1;
    let d_pos = Point.random(this.move_x * sign_x, this.move_y * sign_y);

    if(this.pos.x + d_pos.x >= this.max_x || this.pos.x + d_pos.x < 0){
      d_pos.x = this.pos.x;
    }
    if(this.pos.y + d_pos.y >= this.max_y || this.y + d_pos.y < 0){
      d_pos.x = this.pos.y;
    }
    this.pos = this.pos.add(d_pos);
  }

  checkIfStuck(others){
    for(let i = 0; i < others.lenth-1; i++){
      if(this.pos.distance(others[i].pos) <= others[i].radius + this.radius){
        this.stuck = true;
      }
    }
  }

  display(canvas){
    this.pos.display(canvas, this.radius);
  }
}
