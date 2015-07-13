'use strict';
app.directive('markdown', function() {
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
		scope: true,
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div ng-bind-html="htmlContent" class="markdown-body"></div>',
		link: function(scope, element, attr) {
			var oldContent = "";
			scope.$on('markdown', function(e, content) {
				if(oldContent == content) return;
				scope.htmlContent = marked(content);
				oldContent = content;
			})
		}
	}
})