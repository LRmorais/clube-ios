export const breakIntoChunks = (string, size) => {
  if (string === null) return [];

  let normalizedString = String(string);
  let normalizedSize = ~~size;

  if (normalizedSize === 0) return [normalizedString];
  return normalizedString.match(new RegExp('.{1,' + normalizedSize + '}', 'g'));
};
