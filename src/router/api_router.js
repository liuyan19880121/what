var router = require('koa-router')();

module.exports = function(app){
    console.log('hi');
    app.use(router.middleware());
};

router.post('/api/topic/new', function *(next){
    console.log('here');
});