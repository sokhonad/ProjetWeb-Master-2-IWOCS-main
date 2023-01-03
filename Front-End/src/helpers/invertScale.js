export const scaleBandInvert = (scale, coord) => {
  const eachBand = scale.step();
  return Math.floor(coord / eachBand);
};
