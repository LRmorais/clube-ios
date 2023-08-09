export const randomHex = () => '0123456789abcdef'.substr(Math.floor(Math.random() * 0x10), 1);
export const createUUID = () => (
  [...new Array(36)].map((_, index) => ({
    [index]: randomHex(),
    8: '-',
    13: '-',
    14: '4',
    18: '-',
    19: '0123456789abcdef'.substr((randomHex() & 0x3) | 0x8, 1),
    23: '-',
  }[index])).join('')
);
