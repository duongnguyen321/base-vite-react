/**
 * Generates a random integer within a specified range, with an optional threshold to skew the distribution.
 *
 * @param {number} min - The minimum value in the range (inclusive).
 * @param {number} max - The maximum value in the range (inclusive).
 * @param {number} shold - Optional. A threshold value between 0 and 1 to skew the distribution towards the lower or higher end. Defaults to 0.5.
 * @returns {number} A random integer within the specified range. If `shold` is less than 0.5, the distribution is skewed towards the lower end of the range; if `shold` is greater than 0.5, it is skewed towards the higher end.
 */
export function rand(min?: number, max?: number, shold = 0.5) {
  const randomValue = Math.random();
  if (min && max) {
    const totalOptions = max - min + 1;
    if (randomValue < shold) {
      const range = Math.floor(totalOptions / 2);
      return Math.floor(randomValue * range) + min;
    } else {
      const range = Math.ceil(totalOptions / 2);
      return Math.floor(randomValue * range) + max - range + 1;
    }
  }
  return randomValue;
}
