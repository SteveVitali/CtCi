var test = require('../../test');

/**
 * Return true if number is a palindrome
 * @param  {Number} num The Number
 * @return {Boolean}    Whether number is a palindrome
 */
function numberPalindrome(num) {
  var str = num + '';
  for (var i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}

test.test(numberPalindrome, [
  [[0], true],
  [[9], true],
  [[11], true],
  [[12], false],
  [[91], false],
  [[191], true],
  [[959], true],
  [[877], false],
  [[1001], true],
  [[1002], false],
  [[34543], true],
  [[12345], false],
  [[123321], true]
].map(test.makeCaseFromArray));
