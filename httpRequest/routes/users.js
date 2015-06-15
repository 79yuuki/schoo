var express = require('express');
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

// /user/79 のようなリクエストがPOSTで来たら最後にアクセスした人のキャッシュを書き換える
var cache;
router.post('/:id', function(req, res) {
  // サーバーで持っているcacheという変数にPOSTされたIDを入れる
  cache = req.params.id;
  res.send('最後にPOSTしたIDは ' + cache + 'です！');
});

module.exports = router;
