'use strict';

var redis = require('./redis');

module.exports = function (io) {
  var cache;
  io.on('connection', function (socket) {
    // 接続された時にredisに保存されたデータをcacheに入れる
    redis.get('drawCache', function(err, result) {
      if (err) {
        return err;
      }
      if (result) {
console.log('>>>>', result);
        cache = JSON.parse(result);
      } else {
        cache = [];
      }
    });
    console.log('connected!!');

    socket.emit('init', cache);

    // canvasに描画されたときに送られてくるデータ
    socket.on('draw', function (data) {
      socket.broadcast.emit('draw', data);
      cache.push(data);
    });

    // drawごとにredisに書き込んでいると負荷が大きいのでマウスを話した時のイベントに設定する
    socket.on('drawEnd', function () {
      // objectをJSON.stringifyしないといけない
      redis.set('drawCache', JSON.stringify(cache));
    });

    // CLEARボタンを押されたらcacheをクリアしてredisのデータを消す
    socket.on('clear', function () {
      socket.broadcast.emit('clear');
      cache = [];
      redis.del('drawCache');
    });
  });
};
