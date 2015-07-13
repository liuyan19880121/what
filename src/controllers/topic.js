var proxy = require('../proxy_thunkify');
var topic = proxy.topic;
var querystring = require('querystring');


exports.list = function *(next) {
	console.log('list');
	var limit = 12;
	var query = {deleted: false};
	var options = { limit: limit, sort: '-top -reply'};
	var result = yield topic.list(query, options);
	this.body = {code: 0, data: result};
	console.log(result);
}

exports.add = function *(next) {
	console.log('addTopic');
	var title = this.request.body.title;
	var content = this.request.body.content;
	//var authorId 
	var result = yield topic.add(title, content);
	this.body = result;
}

exports.find = function *(next) {
	console.log('find');
	console.log(this.req.query);
	var url = this.request.url || '';
	var index = url.indexOf('?');
	var string = index == -1 ? '' : url.substr(index + 1)
	var req = querystring.parse(string);
	console.log(req.id);
	var result = yield topic.find(req.id);
	this.body = {code: 0, data: result};
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