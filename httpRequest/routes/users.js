var express = require('express');
// express のルーティングを決めるときに使う。(この辺りが参考になります http://expressjs.com/guide/routing.html )
var router = express.Router();

// /users にただのGETリクエストが来た時は文字を返す
router.get('/', function(req, res) {
  res.send('/users にGETリクエストが来たよ！');
});

// /user/79 みたいなリクエストが来る想定。
router.get('/:id', function(req, res) {
  // req.params.id (idは:idのid) のようにデータを取得できる
  res.send('ID: ' + req.params.id + ' のアクセス');
});

// /user/79/shichiku みたいなリクエストが来る想定。
router.get('/:id/:name', function(req, res) {
  // req.params.id (idは:idのid) のようにデータを取得できる
  res.send('ID: ' + req.params.id + ', NAME: ' + req.params.name + ' のアクセス');
});




// post送信するページを用意
router.get('/form', function(req, res) {
  res.render('userForm');
});

/**
 * /users へのリクエストがPOSTでidと一緒に来たら
 * 最後にアクセスした人のキャッシュを書き換える
 */
var cache;
var validator = require('validator'); // $ npm install --save validator しましょう
router.post('/', function(req, res) {
  // サーバーで持っているcacheという変数にPOSTされたbodyに入っているIDを入れる
  var id = req.body.id;
  if (id === '') {
    res.send('入力が不正です');
  }
  // セキュリティ対策 ※サニタイズ
  cache = validator.escape(id);
  res.send('最後にPOSTしたIDは ' + cache + 'です！');
});

module.exports = router;
