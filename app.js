var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router')();
var render = require('koa-ejs');
var koaBody   = require('koa-body');
var path = require('path');
var apiRouter = require('./src/router/api_router');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var uuid = require('node-uuid');

var app = koa();
app.use(serve(__dirname + '/build/app'));

render(app, {
  root: path.join(__dirname, 'src', 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: true
});

app.use(koaBody({strict: false}));

var tokenStore = {
    get: function() {
      return this.request.body.accessToken || this.query.accessToken;
    },

    set: function() {},

    reset: function() {}
}

app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore(),
  sessionIdStore: tokenStore,
  genSid: uuid.v4
}));

apiRouter(app);

router.get( '/*', function*( next ) {
    yield this.render( 'index' );
} )
app.use(router.middleware());

app.listen(3000);
