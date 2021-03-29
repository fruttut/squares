import {swapItems} from "./swap";

export const shiftUp = <T>(arr: T[], index: number) => swapItems(arr, index, index - 1);
export const shiftDown = <T>(arr: T[], index: number) => swapItems(arr, index, index + 1);
