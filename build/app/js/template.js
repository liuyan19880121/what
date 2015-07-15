(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("header.html",
    "<div class=\"header\">\n" +
    "  <div class=\"container\">\n" +
    "      <p>what</p>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("index.html",
    "<div ng-include=\"'header.html'\"></div>\n" +
    "<div id=\"main\" class=\"wrapper\">\n" +
    "    <div ng-include=\"contentTPL\" class=\"content-container\"></div>\n" +
    "    <div ng-include=\"'sidebar.html'\" class=\"sidebar-container\"></div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("sidebar.html",
    "\n" +
    "    <p>sidebar</p>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("topic-editor.html",
    "<div>\n" +
    "    <div ng-include=\"'header.html'\"></div>\n" +
    "    <div id=\"main\">\n" +
    "        <form accept-charset=\"UTF-8\">\n" +
    "            <div class=\"edit-container\">\n" +
    "                <div class=\"topic-area\">\n" +
    "                    <input type=\"text\" class=\"topic-text-input\" placeholder=\"标题\" ng-model=\"topic.title\"/>\n" +
    "                </div>\n" +
    "                <div class=\"topic-content-container\" ng-init=\"editSelect=true\">\n" +
    "                    <div class=\"topic-tab-area tabnav\">\n" +
    "                        <nav class=\"tabnav-tabs\">\n" +
    "                            <a href=\"\" ng-class=\"['tabnav-tab', {selected: editSelect}]\" ng-click=\"editSelect=true\">编辑</a>\n" +
    "                            <a href=\"\" ng-class=\"['tabnav-tab', {selected: !editSelect}]\" ng-click=\"preview(editSelect);editSelect=false\">预览</a>\n" +
    "                        </nav>\n" +
    "                    </div>\n" +
    "                    <div ng-class=\"['topic-area',{hidden:!editSelect}]\">\n" +
    "                        <textarea class=\"topic-text-input content-textarea\" placeholder=\"内容\" ng-model=\"topic.content\"></textarea>\n" +
    "                    </div>\n" +
    "                    <div ng-class=\"['topic-area','content-underline',{hidden:editSelect}]\">\n" +
    "                        <markdown></markdown>\n" +
    "                    </div>\n" +
    "                    <div class=\"topic-action wrapper\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary right\" ng-click=\"commit()\" ng-disabled=\"!topic.title || !topic.content\">提交</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("topic-list.html",
    "<div class=\"table-list-header\">\n" +
    "    <p>head</p>\n" +
    "</div>\n" +
    "<ul class=\"table-list\">\n" +
    "    <li class=\"table-list-item\" ng-repeat=\"topic in topicList\">\n" +
    "        <div class=\"table-list-cell\">\n" +
    "            <a ng-href=\"{{'/topic/'+topic._id}}\" class=\"title-link\"> \n" +
    "                {{topic.title}}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("topic.html",
    "<div class=\"topic-title-wrapper underline\">\n" +
    "	<div class=\"topic-edit-action right\">\n" +
    "		<a href=\"/topic/edit/{{topic._id}}\" class=\"btn btn-sm btn-primary\">编辑</a>\n" +
    "	</div>\n" +
    "	<h1 class=\"topic-title-show\">\n" +
    "		<span>{{topic.title}}</span>\n" +
    "	</h1>\n" +
    "</div>\n" +
    "<div class=\"topic-extra_info\">\n" +
    "	<span>发布于 1天前 • 30分钟前更新 • 作者 *** • *** 次浏览 </span>\n" +
    "</div>\n" +
    "<div class=\"topic-content-wrapper\">\n" +
    "	<markdown></markdown>\n" +
    "</div>");
}]);
})();
