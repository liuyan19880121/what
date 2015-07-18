var router = require('koa-router')();
var userCtl = require('../controllers/user');
var topicCtl = require('../controllers/topic');

module.exports = function(app){
    app.use(router.middleware());
};

//user
router.get('/api/user/info', userCtl.info);
router.post('/api/user/login', userCtl.login);

//topic
router.get('/api/topic/list', topicCtl.list);
router.post('/api/topic/add', topicCtl.add);
router.get('/api/topic/find', topicCtl.find);
router.post('/api/topic/update', topicCtl.update);