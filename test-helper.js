"use strict";
exports.__esModule = true;
var htmltidy = require("tidy-html5");
var m = require("mithril");
exports.defaultHtmlTidyOptions = {
    "show-body-only": true,
    "drop-empty-elements": false,
    "doctype": "omit",
    "indent": true,
    "quiet": true,
    "show-warnings": false,
    // Recognize SVG tags:
    "new-blocklevel-tags": ["svg", "defs"],
    "new-inline-tags": ["path", "polyline", "line", "polygon"]
};
exports.tidy = function (vnodes, htmltidyOptions) {
    if (htmltidyOptions === void 0) { htmltidyOptions = exports.defaultHtmlTidyOptions; }
    var htmlElement = document.createElement("div");
    m.render(htmlElement, vnodes);
    var html = htmlElement.innerHTML;
    return htmltidy.tidy_html5(html, htmltidyOptions);
};
