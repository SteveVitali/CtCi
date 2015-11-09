var test = require('../../test');

/**
 * Determine whether a number is prime
 * @param  {Number}  num The number to determine primality of
 * @return {Boolean}     Whether the number is prime
 */
var isPrime = function(num) {
  if (num < 2) return false;
  for (var i = 2; i <= Math.ceil(Math.sqrt(num)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

test.test(isPrime, [
  [1, false],
  [2, true],
  [3, true],
  [4, false],
  [5, true],
  [6, false],
  [7, true],
  [8, false],
  [9, false],
  [10, false],
  [11, true],
  [100, false],
  [15859, true],
  [100002, false]
].map(test.makeCaseFromArray));
