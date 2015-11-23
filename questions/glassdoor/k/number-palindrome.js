var test = require('../../test');

/**
 * Return true if number is a palindrome, using casting
 * @param  {Number} num The Number
 * @return {Boolean}    Whether number is a palindrome
 */
function numberPalindromeWithCasting(num) {
  var str = num + '';
  for (var i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Determine whether a number if a palindrome W/O CASTING
 * @param  {Number} num The Number to check palindromicity of
 * @return {Boolean}    Whether number is a palindrome
 */
function numberPalindromeWithoutCasting(num) {
  var getDigit = function(i) {
    return Math.floor(
      (num % Math.pow(10, i + 1)) / Math.pow(10, i)
    );
  };
  var size = Math.floor(Math.log(num) / Math.log(10));
  for (var i = 0; i < size; i++) {
    if (getDigit(i) !== getDigit(size - i)) {
      return false;
    }
  }
  return true;
}

var cases = [
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
].map(test.makeCaseFromArray);

test.test(numberPalindromeWithCasting, cases);
test.test(numberPalindromeWithoutCasting, cases);
