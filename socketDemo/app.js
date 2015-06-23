var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

// 適当なNode.jsのサーバーを立てる
app.listen(3000);

// index.htmlを表示させる
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// socket.io をつかって、クライアントからの接続があった時の動きを書いている
io.on('connection', function (socket) {
  // クライアントから接続があったら hello world というオブジェクトを
  // newsというイベントでクライアントにemitする
  socket.emit('news', { hello: 'world' });
  // クライアントが 'my other event' というイベントをemitしてきたら、
  // その時渡してきたdataをconsole.logに表示する
  socket.on('my other event', function (data) {
    console.log(data);
  });

  // connection された時に0で初期化されるiを
  var i = 0;
  // 1000msごとに+1してintervalというイベントでクライアントにemitする
  setInterval(function(){
    socket.emit('interval', { interval: i });
    i++;
  },1000);
});
