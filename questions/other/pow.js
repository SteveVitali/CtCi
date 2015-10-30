var test = require('../../test');

/**
 * Take a number to a power
 * @param  {Number} base The base
 * @param  {Number} pow  The power
 * @return {Number}      The base raised to the power
 */
var pow = function pow(base, power) {
  if (power === 0) return 1;
  var halfPower = pow(base, Math.floor(power / 2));
  if (power % 2 === 0) {
    return halfPower * halfPower;
  }
  return base * halfPower * halfPower;
};

var testCases = [
  [[0, 0], 1],
  [[0, 1], 0],
  [[2, 0], 1],
  [[2, 1], 2],
  [[2, 2], 4],
  [[2, 4], 16],
  [[5, 5], 3125]
].map(test.makeCaseFromArray);

test.test(pow, testCases);
