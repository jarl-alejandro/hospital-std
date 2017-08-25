'use strict'

angular.module('Hospital')
.controller('canvasFomr056Ctrl', function () {
  const canvas = document.querySelector('#paint');
  const ctx = canvas.getContext('2d');

  const sketch = document.querySelector('#sketch');
  const sketch_style = getComputedStyle(sketch);
  canvas.width = parseInt(sketch_style.getPropertyValue('width'));
  canvas.height = parseInt(sketch_style.getPropertyValue('height'));

  const mouse = {x: 0, y: 0};

  /* Mouse Capturing Work */
  canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);

  /* Drawing on Paint App */
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
  }, false);

  canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
  }, false);

  const onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y)
    ctx.stroke()
  }
  // End Paint
})
