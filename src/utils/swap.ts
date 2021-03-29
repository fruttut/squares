export const swapItems = <T>(
  arr: T[],
  i: number,
  j: number,
  inPlace?: boolean
) => {
  if (
    arr.length <= 1 ||
    i < 0 ||
    i > arr.length - 1 ||
    j < 0 ||
    j > arr.length - 1 ||
    i === j
  ) {
    return arr;
  }
  const newArr = inPlace ? arr : [...arr];
  const tmp = arr[i];
  newArr[i] = arr[j];
  newArr[j] = tmp;
  return newArr;
};
