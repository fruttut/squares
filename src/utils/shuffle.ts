import { swapItems } from './swap';

export const shuffle = <T>(arr: T[]) => {
  if (arr.length < 2) {
    return arr;
  }
  const newArr = [...arr];
  let currentIndex = arr.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    swapItems(newArr, currentIndex, randomIndex, true);
  }
  return newArr;
};
