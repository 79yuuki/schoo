'use strict';

function isIphone(userAgent) {
  return userAgent.indexOf('iPhone') !== -1;
}

var iPhoneCheck = function(req, res, next) {
  var userAgent = req.headers['user-agent'];
  if (isIphone(userAgent)) {
    // iPhoneからのアクセスだった時の処理を書く。
    // 今回は特に何もせず、次のapp.useに処理を渡す為にnextを実行する。
    next();
  } else {
    // iPhone以外からのアクセスだった時の処理を書く。
    // 例えば「iPhone専用です」と説明してる静的ページを表示させるなど。
    res.render('sollyIphoneOnlyPage');
  }
};
module.exports = iPhoneCheck;

