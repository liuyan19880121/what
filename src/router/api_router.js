var router = require('koa-router')();
var topicCtl = require('../controllers/topic');

module.exports = function(app){
    app.use(router.middleware());
};


router.get('/api/topic/list', topicCtl.list);
router.post('/api/topic/add', topicCtl.addTopic);
router.get('/api/topic/find', topicCtl.find);