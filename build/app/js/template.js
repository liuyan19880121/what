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
    "<div>\n" +
    "    <div ng-include=\"'header.html'\"></div>\n" +
    "    <div id=\"main\">\n" +
    "        <div ng-include=\"contentTPL\"></div>\n" +
    "        <div ng-include=\"'sidebar.html'\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("ngTemplate"); }
catch(err) { module = angular.module("ngTemplate", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("sidebar.html",
    "<div class=\"sidebar-container\">\n" +
    "    <p>sidebar</p>\n" +
    "</div>");
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
    "        <form accept-charset=\"UTF-8\" action=\"/api/topic/add\">\n" +
    "            <div class=\"edit-container\">\n" +
    "                <div class=\"topic-area\">\n" +
    "                    <input type=\"text\" class=\"topic-title-input\" placeholder=\"标题\" />\n" +
    "                </div>\n" +
    "                <div class=\"topic-content-container\">\n" +
    "                    <div class=\"topic-tab-area tabnav\">\n" +
    "                        <nav class=\"tabnav-tabs\">\n" +
    "                            <a href=\"#\" class=\"tabnav-tab selected\">编辑</a>\n" +
    "                            <a href=\"#\" class=\"tabnav-tab\">预览</a>\n" +
    "                        </nav>\n" +
    "                    </div>\n" +
    "                    <div class=\"topic-area\">\n" +
    "                        <textarea class=\"topic-title-input content-textarea\" placeholder=\"内容\"></textarea>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-actions\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary\">提交</button>\n" +
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
  $templateCache.put("topic.html",
    "<div class=\"content-container\">\n" +
    "    <div class=\"table-list-header\">\n" +
    "        <p>head</p>\n" +
    "    </div>\n" +
    "    <ul class=\"table-list\">\n" +
    "        <li class=\"table-list-item\" ng-repeat=\"topic in topicList\">\n" +
    "            <div class=\"table-list-cell\">\n" +
    "                <a ng-href=\"{{'/topic/'+topic._id}}\" class=\"title-link\"> \n" +
    "                    {{topic.title}}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
})();
