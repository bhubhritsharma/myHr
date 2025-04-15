export const addDot = (text, count) => {
  if (!text) {
    return '';
  }
  return text.length > count ? text.slice(0, count) + '...' : text;
};
