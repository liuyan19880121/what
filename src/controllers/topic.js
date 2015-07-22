var proxy = require('../proxy_thunkify');
var Topic = proxy.Topic;
var User = proxy.User;
var _ = require('lodash');
var hander = require('../common/error_hander')


exports.list = function *(next) {
	console.log('list');
	var limit = 12;
	var query = {deleted: false};
	var options = { limit: limit, sort: '-top -reply'};
	var result = yield Topic.list(query, options);
	result = result.map(function(item) {
		return _.pick(item, ['_id', 'title']);
	});
	hander.ok(this, result);
}

exports.add = function *(next) {
	console.log('add');
	//check login
	var user = this.session.user;
	if(!user) return hander.noLogin(this);

	var title = this.request.body.title;
	var content = this.request.body.content;

	var result = yield Topic.add(title, content, user._id);
	hander.ok(this, {_id: result[0]._id, title: result[0].title});
}

exports.find = function *(next) {
	console.log('find');
	var topic, topicId, result = {};
	topicId = this.query._id

	try {
		topic = yield Topic.find(topicId);
	} catch (e) {
		return hander.topicNotExists(this);
	}
	if(!topic) return hander.topicNotExists(this);

	//query author
	var authorId, user;
	authorId = topic.authorId;
	if(!authorId) return hander.missingAuthor(this);

	user = yield User.findById(authorId);
	if(!user) return hander.missingAuthor(this);

	topic.visitCount += 1;

	yield Topic.save(topic);

	result.topic = topic;
	result.user = _.pick(user,['_id', 'username', 'nickname', 'imageUrl', 'signature']);

	hander.ok(this, result);
}


exports.update = function *(next) {
	console.log('update');
	//check login
	var user = this.session.user;
	if(!user) return hander.noLogin(this);

	//get parameters
	var title = this.request.body.title;
	var content = this.request.body.content;
	var topicId = this.request.body._id;

	//validation

	// get topic information
	var topic = yield Topic.find(topicId);
	if(!topic) return hander.topicNotExists(this);

	//check owner
	//if(topic.authorId && !topic.authorId.equals(user._id)) return hander.notTopicOwner(this);
	if(!topic.authorId.equals(user._id)) return hander.notTopicOwner(this);

	// update
	topic.title = title;
	topic.content = content;
	topic.update = Date.now();
	//topic.authorId = user._id;
	yield Topic.save(topic);

	//respond to client
	hander.ok(this);
}