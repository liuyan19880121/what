var proxy = require('../proxy_thunkify');
var topic = proxy.topic;
var _ = require('lodash')
var querystring = require('querystring');


exports.list = function *(next) {
	console.log('list');
	var limit = 12;
	var query = {deleted: false};
	var options = { limit: limit, sort: '-top -reply'};
	var result = yield topic.list(query, options);
	result = result.map(function(item) {
		return _.pick(item, ['_id', 'title']);
	});
	this.body = {code: 0, data: result};

}

exports.add = function *(next) {
	console.log('add');
	var title = this.request.body.title;
	var content = this.request.body.content;
	var userId = this.request.body.userId;
	var result = yield topic.add(title, content);
	this.body = {code: 0, data: {_id: result[0]._id, title: result[0].title}};
	console.log(this.body);
}

exports.find = function *(next) {
	console.log('find');
	var topicId = this.query._id;
	var code = 0, data = {};
	try {
		data = yield topic.find(topicId);
	} catch (e) {
		code = 1;
	} finally {
		this.body = {code: code, data: data}
	}
}


exports.update = function *(next) {
	console.log('update');
	console.log(this.request.body)
	var title = this.request.body.title;
	var content = this.request.body.content;
	var topicId = this.request.body._id;
	var result = yield topic.update(topicId, title, content);
	this.body = {code: 0, data: result};
}