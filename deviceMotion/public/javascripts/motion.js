hostname = (hostname === 'localhost')? 'http://' + hostname + ':3000': 'https://' + hostname;
var socket = io.connect(hostname);
window.addEventListener('devicemotion', function(event) {
  var gv = event.accelerationIncludingGravity;
  $('div').html(gv.x + '<br>' + gv.y + '<br>' + gv.z);
  socket.emit('motion', {x: gv.x, y: gv.y, z: gv.z });
});
