import isSelectable from './isSelectable';
import {RETURN, RIGHT, TAB} from '../constants';

export default function shouldSelectHint(e, props) {
  const {
    hintText,
    selectHintOnEnter,
    highlightFirstResult,
    value,
    isMenuShown,
    initialItem,
    minLength,
  } = props;

  const shouldTrigger = selectHintOnEnter || highlightFirstResult;

  if (!hintText && !highlightFirstResult) {
    return false;
  }

  if (e.keyCode === RIGHT) {
    // For selectable input types ("text", "search"), only select the hint if
    // it's at the end of the input value. For non-selectable types ("email",
    // "number"), always select the hint.
    return isSelectable(e.target) ?
      e.target.selectionStart === value.length :
      true;
  }

  if (e.keyCode === TAB) {
    if (highlightFirstResult && !initialItem) {
      return false;
    }
    if (highlightFirstResult && minLength === 0) {
      return false;
    }
    return !(highlightFirstResult && !isMenuShown);
  }

  return !!(e.keyCode === RETURN && shouldTrigger);
}
