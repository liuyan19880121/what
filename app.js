var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router')();
var render = require('koa-ejs');
var path = require('path');

var app = koa();
app.use(serve(__dirname + '/build/app'));

render(app, {
  root: path.join(__dirname, 'src', 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: true
});

router.get('/*', function *(){yield this.render('index')})
//router.get('/index', function *(){yield this.render('index')})
app.use(router.middleware());

app.listen(3000);