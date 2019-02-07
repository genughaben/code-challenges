(function () {
  'use strict';

  class Point {
    constructor(x, y){
      this._x = x;
      this._y = y;
    }

    get x() {
      return this._x;
    }

    get y() {
      return this._y;
    }

    mult(factor){
      return new Point(this.x * factor, this.y * factor);
    }

    sub(other) {
      return new Point(this.x - other.x, this.y - other.y);
    }

    add(other) {
      return new Point(this.x + other.x, this.y + other.y);
    }

    rotate(sigma){
      let matrix = [[ Math.cos(sigma), -Math.sin(sigma) ],
                    [ Math.sin(sigma), Math.cos(sigma) ]];
      x_dash = this._x * matrix[0][0] + this._y * matrix[0][1];
      y_dash = this._x * matrix[1][0] + this._y * matrix[1][1];
      return new Point(x_dash, y_dash);
    }

    distance(other) {
      return Math.sqrt( Math.pow((other.x - this.x), 2) + Math.pow((other.y - this.y), 2) );
    }

    display(context, width=5){
      context.beginPath();
      context.arc(this._x, this._y, width, 0, 2 * Math.PI, true);
      context.fill();
      context.closePath();
    }

    static random(max_x, max_y){
      let x = Math.floor(Math.random() * max_x + 1);
      let y = Math.floor(Math.random() * max_y + 1);

      return new Point(x, y);
    }

    print() {
      return "(" + this.x.toString() +  ", " + this.y.toString()  + ")";
    }
  }

  class CanvasHelper {
    constructor(selector_id, width=900, height=900){
      this.selector_id = selector_id;
      this._width = width;
      this._height = height;
      this.canvas = this.create();
      this.append();
    }

    get width() {
      return this.width;
    }

    get height() {
      return this.height;
    }

    create() {
        var canvas = document.createElement('canvas');

        canvas.id = "CursorLayer";
        canvas.width = this._width;
        canvas.height = this._height;
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        return canvas;
    }

    append(){
      var parent = document.getElementById(this.selector_id);
      parent.append(this.canvas);
    }

    context(){
        var context = this.canvas.getContext("2d");
        return context;
    }

    clear(){
      let context = this.context();
      context.clearRect(0, 0, this.width, this.height);
    }

    printValue(string, selector_id){
      var div = document.getElementById(selector_id);
      var p = document.createElement('p');
      var node = document.createTextNode(string.toString());
      p.appendChild(node);
      div.appendChild(p);
    }
  }

  class Walker {
    constructor(max_x, max_y, move_x, move_y, radius, start_x, start_y){
      if(arguments.length == 5){
        this.pos = Point.random(x_max, y_max);

        this.stuck = false;
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
      y = Math.ceil( Math.random() * canvasHeight );    x = canvasWidth;
      break;
    case 4:
      x = Math.ceil( Math.random() * canvasWidth );    y = canvasHeight;
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

}());
