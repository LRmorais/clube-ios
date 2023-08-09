export const insert = (arr, value) => [...new Set([...arr, value])];
export const remove = (arr, value) => {
  let set = new Set(arr);
  set.delete(value);
  return [...set];
};
export const dedup = (arr) => [...new Set(arr)];
export const shuffle = (arr) => arr.sort(() => Math.random() - .5);
