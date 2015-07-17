var proxy = require('../proxy_thunkify');
var Topic = proxy.Topic;
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
	var topicId = this.query._id;
	var data = {};
	try {
		data = yield Topic.find(topicId);
	} catch (e) {
		return hander.topicNotExists(this);
	}
	if(!data) return hander.topicNotExists(this);
	hander.ok(this, data);
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

	//check owner
	// console.log(topic.authorId);
	// console.log(user._id);
	// console.log(topic.authorId.equals(user._id));
	// console.log(topic.authorId == user._id);
	// console.log(topic.authorId === user._id);
	if(!topic.authorId.equals(user._id)) return hander.notTopicOwner(this);

	// update
	yield Topic.update(topicId, title, content);

	//respond to client
	hander.ok(this);
}