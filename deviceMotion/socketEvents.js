'use strict';

module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log('connected!!');

    // スマホの傾きデータを貰ってrgbとして扱える数値に変換してcolorイベントとしてemit
    socket.on('motion', function(data) {
      io.emit('color', xyz2rgb(data));
    });
  });
};

var xyz2rgb = function (motionData) {
  var color = {};
  color.R = Math.abs(Math.floor(motionData.x/10*255));
  color.G = Math.abs(Math.floor(motionData.y/10*255));
  color.B = Math.abs(Math.floor(motionData.z/10*255));

  return color;
};
