var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// morganというモジュールを使ってlog出力を行う : http://qiita.com/hoshi-takanori/items/7f5602d7fd7ee0fa6427
app.use(logger('dev')); // morganというモジュールを使ってlog出力を行う http://qiita.com/hoshi-takanori/items/7f5602d7fd7ee0fa6427
// body-parserというモジュールでユーザーのリクエストのbody情報を取得する http://d.hatena.ne.jp/moomoomuu/20120117/1326806390
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // http://qiita.com/K_ichi/items/c70bf4b08467717460d5
// リクエストを受けてcookie情報を取得する
app.use(cookieParser());
// 静的ファイルの場所を指定する。ここでは public/ 以下のファイルが静的ファイルとして設定される
app.use(express.static(path.join(__dirname, 'public')));

// routes/index.js のルーティング内容を 'http://domain/' をGETで受け取った時に実行する
app.use('/', routes);
// routes/users.js のルーティング内容を 'http://domain/users' をGETで受け取った時に実行する
app.use('/users', users);

// 上記のどれにも当てはまらないルーティング設定の場合はhttp statusの404を返す
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 上記に設定した app.use の中でエラーが起こると下記のapp.useが実行される。(NODE_ENV=development時のみ)
// ※ NODE_ENVについて
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
