export const excludeItemFromArray = <T>(arr: T[], item: T) =>
  arr.filter((x) => x !== item);

export const excludeAllFromArray = <T>(arr: T[], excluded: T[]) =>
  arr.filter((x) => !excluded.includes(x));

export const excludePropertyFromObject = <T extends {}>(
  obj: T,
  key: keyof T
) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

export const excludeAllFromObject = <T extends {}>(
  obj: T,
  keys: (keyof T)[]
) => {
  const newObj = { ...obj };
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj;
};
