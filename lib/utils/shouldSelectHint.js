"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = shouldSelectHint;

var _isSelectable = _interopRequireDefault(require("./isSelectable"));

var _constants = require("../constants");

function shouldSelectHint(_ref, _ref2) {
  var currentTarget = _ref.currentTarget,
      keyCode = _ref.keyCode;
  var hintText = _ref2.hintText,
      selectHintOnEnter = _ref2.selectHintOnEnter,
      value = _ref2.value,
      highlightFirstResult = _ref2.highlightFirstResult,
      isMenuShown = _ref2.isMenuShown,
      initialItem = _ref2.initialItem,
      minLength = _ref2.minLength;
  var shouldTrigger = selectHintOnEnter || highlightFirstResult;

  if (!hintText && !highlightFirstResult) {
    return false;
  }

  if (keyCode === _constants.RIGHT) {
    // For selectable input types ("text", "search"), only select the hint if
    // it's at the end of the input value. For non-selectable types ("email",
    // "number"), always select the hint.
    return (0, _isSelectable["default"])(currentTarget) ? currentTarget.selectionStart === value.length : true;
  }

  if (keyCode === _constants.TAB) {
    if (highlightFirstResult && !initialItem) {
      return false;
    }

    if (highlightFirstResult && minLength === 0) {
      return false;
    }

    return !(highlightFirstResult && !isMenuShown);
  }

  return !!(keyCode === _constants.RETURN && shouldTrigger);
}