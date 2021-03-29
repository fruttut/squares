type InitializerFunc<T> = ((row: number, col: number) => T);
type Initializer<T> = T | InitializerFunc<T>;

export const createMatrix = <T>(dim: number, initializer: Initializer<T>) => {
  const isInitFunc = (init: Initializer<T>): init is InitializerFunc<T> => typeof init === 'function';
  const matrix = Array<Array<T>>(dim);
  for (let i = 0; i < dim; i++) {
    matrix[i] = Array<T>(dim);
    for (let j = 0; j < dim; j++) {
      matrix[i][j] = isInitFunc(initializer) ? initializer(i, j) : initializer;
    }
  }
  return matrix;
};
