export const dotNot = (obj, str) => str.split(".").reduce((o, i) => o[i], obj);

export const compareMake = (key, reverse, isNumericSort) => {
  return (a, b) => {
    const aVal = dotNot(a, key);
    const bVal = dotNot(b, key);

    if (isNumericSort) {
      return aVal - bVal * (reverse ? -1 : 1);
    }

    const aUpperVal = aVal.toUpperCase();
    const bUpperVal = bVal.toUpperCase();

    let comparison = 0;
    if (aUpperVal > bUpperVal) {
      comparison = 1;
    } else if (aUpperVal < bUpperVal) {
      comparison = -1;
    }
    return comparison * (reverse ? -1 : 1);
  };
};
