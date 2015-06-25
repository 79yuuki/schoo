/* global hostname,$,io */
'use strict';

hostname = (hostname === 'localhost')? 'http://' + hostname + ':3000': 'https://' + hostname;
var socket = io.connect(hostname);
window.addEventListener('load', function() {
  var canvas = document.getElementById("main");
  var c = canvas.getContext("2d");
  var w = $('canvas').width();
  var h = $('canvas').height();
  var drawing = false;
  var pos;
  var COLORS = {
    red: '#FF0000',
    yellow: '#FFFF00',
    blue: '#0000FF',
    green: '#008000',
    purple: '#800080',
    white: '#FFFFFF',
    black: '#000000'
  };
  var drawColor = COLORS.black;

  canvas.width = w;
  canvas.height = h;
  c.lineWidth = 6;
  c.lineJoin = "round";
  c.lineCap = "round";

  canvas.addEventListener("mousedown", function (event) {
    drawing = true;
    pos = getPosT(event);
  }, false);

  canvas.addEventListener("mouseup", function () {
    drawing = false;
    socket.emit('drawEnd');
  }, false);

  canvas.addEventListener("mousemove", function (event) {
    var newPos = getPosT(event);
    if (drawing) {
      draw(pos, newPos, drawColor);
      socket.emit('draw', { pos: pos, newPos: newPos, drawColor: drawColor});
      pos = newPos;
    }
  }, false);

  function draw (pos, newPos, drawColor) {
    c.strokeStyle = drawColor;
    c.beginPath();
    c.moveTo(pos.x, pos.y);
    c.lineTo(newPos.x, newPos.y);
    c.stroke();
    c.closePath();
  }

  function getPosT (event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    return {x:mouseX, y:mouseY};
  }

  function clear () {
    c.clearRect(0,0,w,h);
  }

  $('li').click(function(){
    var color = $(this).attr('id');
    drawColor = COLORS[color];
    console.log(drawColor);
  });

  $('#clear').click(function() {
    socket.emit('clear');
    clear();
  });

  socket.on('init', function (cache) {
    cache.forEach(function (drawData) {
      draw(drawData.pos, drawData.newPos, drawData.drawColor);
    });
  });

  socket.on('draw', function (data) {
    draw(data.pos, data.newPos, data.drawColor);
  });

  socket.on('clear', function () {
    clear();
  });
});
