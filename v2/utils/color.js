export const isLight = (color) => {
  if (!/^#[\da-f]{6}$/i.test(color)) return null;

  let [red, green, blue] = color.match(/[^#]{2}/g).map((hex) => parseInt(hex, 16));
  let hsp = Math.sqrt(.299 * red**2 + .587 * green**2 + .114 * blue**2);
  return hsp > 127.5;
};
