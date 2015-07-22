'use strict';
app.directive('markdown', ['$parse',
	function($parse) {
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
			template: '<div class="markdown-body"></div>',
			link: function(scope, element, attr) {
				var content = '';
				function updateContent() {
					var value = attr.content && scope.$eval(attr.content);
					value = value || '';
					if(content == value) return;
					element.html(marked(value));
					content = value;
				}
				updateContent();
				scope.$on('markdownContentUpdate', updateContent)
			}
		}
	}
])