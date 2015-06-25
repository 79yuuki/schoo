var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'お絵かきアプリ', hostname: req.hostname });
});

module.exports = router;
