'use strict';
app.directive('markedown', ['markdown', function(markdown) {
	var renderer = new marked.Renderer();

	marked.setOptions({
		renderer: renderer,
		gfm: true,
		tables: true,
		breaks: true,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		highlight: function(code) {
			return hljs.highlightAuto(code).value;
		}
	});
	return {
		scope: {
			mdContent: '='
		},
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div ng-bind-html="htmlContent" class="markdown-body"></div>',
		link: function(scope, element, attr) {
			// var content = scope.$eval(attr.mdContent);
			// console.log(content);
			markdown.register(function() {
				scope.htmlContent = marked(scope.mdContent);
			});
		}
	}
}])