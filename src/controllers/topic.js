


exports.list = function *(next) {
	console.log('list');
	this.body = {data:[
        {_id: '342424', title: 'How to use a streaming JSON parser with Koa?'},
        {_id: '342425', title: 'Add a silent option'},
        {_id: '342425', title: 'adding support for specifying headers in ctx.onerror'},
        {_id: '342425', title: 'es7 async function feedback'},
    ]};
}

exports.addTopic = function *(next) {
	console.log('addTopic');
}

exports.find = function *(next) {
	console.log('find');
	this.body = {
		data: {
			title: 'node test',
			content: '```\nnpm install\n```'
		}
	}
}