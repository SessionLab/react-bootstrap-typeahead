"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function getFirstResult(_ref) {
  var highlightFirstResult = _ref.highlightFirstResult,
      position = _ref.position,
      activeIndex = _ref.activeIndex;
  return highlightFirstResult && position === 0 && activeIndex === -1;
}

var _default = getFirstResult;
exports["default"] = _default;