var models = require('../models');
var Topic  = models.Topic;


exports.list = function(query, options) {
	return function(cb) {
		Topic.find(query, null, options, cb)
	}
}

exports.find = function(topicId) {
	return function(cb) {
		Topic.findOne({_id: topicId}, cb)
	}
}

exports.add = function(title, content, authorId) {
	return function(cb) {
		var topic       = new Topic();
		topic.title     = title;
		topic.content   = content;
		topic.authorId  = authorId;
		topic.save(cb);
	}
}

exports.update = function(topicId, title, content) {
	return function(cb) {
		Topic.update({_id: topicId}, { $set: { title: title, content: content, update: Date.now()} }).exec(cb);
	}
}

exports.save = function(topic) {
	return function(cb) {
		topic.save(cb);
	}
}