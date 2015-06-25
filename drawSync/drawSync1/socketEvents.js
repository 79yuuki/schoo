'use strict';

module.exports = function (io) {
  var cache = [];
  io.on('connection', function (socket) {
    console.log('connected!!');

    socket.emit('init', cache);

    // canvasに描画されたときに送られてくるデータ
    socket.on('draw', function (data) {
      socket.broadcast.emit('draw', data);
      cache.push(data);
    });

    socket.on('clear', function () {
      socket.broadcast.emit('clear');
      cache = [];
    });
  });
};
