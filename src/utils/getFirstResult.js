function getFirstResult({ highlightFirstResult, position, activeIndex }) {
  return highlightFirstResult && position === 0 && activeIndex === -1;
}

export default getFirstResult;
