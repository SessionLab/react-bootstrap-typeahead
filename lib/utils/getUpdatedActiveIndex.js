"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getUpdatedActiveIndex;

var _constants = require("../constants");

function skipDisabledOptions(currentIndex, keyCode, items) {
  var newIndex = currentIndex;

  while (items[newIndex] && items[newIndex].disabled) {
    newIndex += keyCode === _constants.UP ? -1 : 1;
  }

  return newIndex;
}

function getUpdatedActiveIndex(currentIndex, keyCode, items, highlightFirstResult) {
  var newIndex = currentIndex; // Increment or decrement index based on user keystroke.

  if (highlightFirstResult) {
    // if first item already selected, we need to move to second one with
    // down arrow
    var downIndexCorrection = currentIndex === -1 ? 1 : 0;
    newIndex += keyCode === _constants.UP ? -1 : 1 + downIndexCorrection;
  } else {
    newIndex += keyCode === _constants.UP ? -1 : 1;
  } // Skip over any disabled options.


  newIndex = skipDisabledOptions(newIndex, keyCode, items); // If we've reached the end, go back to the beginning or vice-versa.

  if (newIndex === items.length) {
    newIndex = -1;
  } else if (newIndex === -2) {
    newIndex = items.length - 1; // Skip over any disabled options.

    newIndex = skipDisabledOptions(newIndex, keyCode, items);
  }

  return newIndex;
}