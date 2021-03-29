type ComparisonFunc<T> = (a: T, b: T) => boolean;

const defaultComparisonFunc = <T>(a: T, b: T) => a === b;

export const unique = <T>(arr: T[], compFunc: ComparisonFunc<T> = defaultComparisonFunc) => {
  return arr.reduce<T[]>((acc, item) => {
    if (acc.every(x => !compFunc(x, item))) {
      acc.push(item);
    }
    return acc;
  }, []);
}