// @flow

import isSelectable from './isSelectable';
import { RETURN, RIGHT, TAB } from '../constants';

type Props = {
  hintText: string,
  selectHintOnEnter: boolean,
  value: string,
  highlightFirstResult: boolean,
  isMenuShown: boolean,
  initialItem: Object,
  minLength: number
};

export default function shouldSelectHint(
  { currentTarget, keyCode }: SyntheticKeyboardEvent<HTMLInputElement>,
  {
    hintText,
    selectHintOnEnter,
    value,
    highlightFirstResult,
    isMenuShown,
    initialItem,
    minLength,
  }: Props
): boolean {
  const shouldTrigger = selectHintOnEnter || highlightFirstResult;

  if (!hintText && !highlightFirstResult) {
    return false;
  }

  if (keyCode === RIGHT) {
    // For selectable input types ("text", "search"), only select the hint if
    // it's at the end of the input value. For non-selectable types ("email",
    // "number"), always select the hint.
    return isSelectable(currentTarget) ?
      currentTarget.selectionStart === value.length :
      true;
  }

  if (keyCode === TAB) {
    if (highlightFirstResult && !initialItem) {
      return false;
    }
    if (highlightFirstResult && minLength === 0) {
      return false;
    }
    return !(highlightFirstResult && !isMenuShown);
  }

  return !!(keyCode === RETURN && shouldTrigger);
}
