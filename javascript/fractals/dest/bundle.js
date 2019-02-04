
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
  'use strict';

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

    draw(context, width=5){
      context.beginPath();
      context.arc(this._x, this._y, width, 0, 2 * Math.PI, true);
      context.fill();
    }

    print() {
      return "(" + this.x.toString() +  ", " + this.y.toString()  + ")";
    }
  }

  class Segment {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }

    static createFromCoordinates(x1, y1, x2, y2) {
      let start = new Point(x1, y1);
      let end = new Point(x2, y2);
      return new Segment(start, end);
    }

    get length() {
      let dx = Math.abs(this.end.x - this.start.x);
      let dy = Math.abs(this.end.y - this.start.y);
      return Math.sqrt( dy + dx );
    }

    scalmult(factor) {
      let dx = this.end.x - this.start.x;
      let dy = this.end.y - this.start.y;
      let endX = this.start.x + dx * factor;
      let endY = this.start.y + dy * factor;
      return new Segment(this.start, new Point(endX, endY));
    }

    sub(other) {
      let newStart = this.start.sub(other.start);
      let newEnd = this.end.sub(other.end);
      return new Segment(newStart, newEnd)
    }

    rotate(sigma) {
      let matrix = [[ Math.cos(sigma), -Math.sin(sigma) ],
                    [ Math.sin(sigma), Math.cos(sigma) ]];
      let norm = this.end.sub(this.start);
      let x_dash = norm.x * matrix[0][0] + norm.y * matrix[0][1];
      let y_dash = norm.x * matrix[1][0] + norm.y * matrix[1][1];
      let endPoint = new Point(x_dash, y_dash);
      return new Segment(this.start, endPoint.add(this.start));
    }

    revert() {
      return new Segment(this.end, this.start);
    }

    display(context, color='#000000'){
      context.beginPath();
      context.moveTo(this.start.x, this.start.y);
      context.lineTo(this.end.x, this.end.y);
      context.strokeStyle = color;
      context.stroke();
    }

    print() {
      return "start: " + this.start.print() + " end:" + this.end.print();
    }
  }

  class Snowflake {
    constructor(segments, canvasHelper){
      this.segments = segments;
      this.canvasHelper = canvasHelper;
    }

    get length(){
      return this.segments.length;
    }

    createChilden(){
      let childSegments = [];
      for (let i = 0; i < this.length; i++){
        let segment = this.segments[i];
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

    draw() {
      let canvas = this.canvasHelper.canvas;
      let context = this.canvasHelper.context();
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < this.segments.length; i++){
        this.segments[i].display(context);
      }
    }
  }

  let canvasWidth = 400;
  let canvasHeight = 400;


  // triangle base
  let td = canvasWidth / 2; // triangleDimension
  let td2 = (td / 10) * 11.33;
  var p1 = [td*2, td*2]; // 400, 400
  var p3 = [td, td*2]; //
  console.log("test");
  console.log(p1);
  console.log(p1);
  console.log(p3);
  let triangleSegment1 = Segment.createFromCoordinates(td*2,td*2, td,td*2);
  let triangleSegment2 = Segment.createFromCoordinates(td,td*2, td*1.5,td2);
  let triangleSegment3 = Segment.createFromCoordinates(td*1.5,td2, td*2,td*2);

  var triangleSegments = [
    triangleSegment1,
    triangleSegment2,
    triangleSegment3
  ];

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
  };

  let canvasHelper = new CanvasHelper("container", canvasWidth, canvasHeight);
  let snowflake = new Snowflake(startShapes['triangle'], canvasHelper);

  snowflake.draw();

  [1,2,3,4].forEach(function(i) {
    snowflake.createChilden();
    snowflake.draw();
  });


  document.body.addEventListener('click', function(){
    snowflake.createChilden();
    snowflake.draw();
  }, true);

}());
