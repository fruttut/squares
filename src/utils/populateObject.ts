export const populateObject = <T>(
  obj: Record<string, T>,
  keys: string[],
  val: T
) => {
  return {
    ...obj,
    ...keys.reduce<Record<string, T>>((acc, key) => {
      acc[key] = val;
      return acc;
    }, {}),
  };
};
