hostname = (hostname === 'localhost')? hostname + ':3000': hostname;
//var socket = io('http://' + hostname);
var socket = io('http://localhost:3000');
window.addEventListener('devicemotion', function(event) {
  var gv = event.accelerationIncludingGravity;
  $('div').html(gv.x + '<br>' + gv.y + '<br>' + gv.z);
  socket.emit('motion', {x: gv.x, y: gv.y, z: gv.z });
});
