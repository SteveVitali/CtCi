var test = require('../../test');

// Time O(n)
// Space O(n)
/**
 * Rotate a string str by d spaces
 * @param  {String} str The string to rotate
 * @param  {Number} d   The number of spaces to rotate
 * @return {String}     The rotated String
 */
var rotateString = function(str, d) {
  if (str.length <= 1) return str;
  var newStrChars = [];
  var shift = d % str.length;
  for (var i = 0; i < str.length; i++) {
    newStrChars[(i + shift) % str.length] = str[i];
  }
  return newStrChars.join('');
};

var cases = [
  [['', 0], ''],
  [['', 1], ''],
  [['', 10], ''],
  [['a', 0], 'a'],
  [['a', 1], 'a'],
  [['a', 10], 'a'],
  [['ab', 1], 'ba'],
  [['ab', 2], 'ab'],
  [['ab', 5], 'ba'],
  [['ab', 10], 'ab'],
  [['abc', 0], 'abc'],
  [['abc', 1], 'cab'],
  [['abc', 2], 'bca'],
  [['abc', 3], 'abc'],
  [['abc', 10], 'cab'],
  [['abc', 12], 'abc'],
  [['abcd', 2], 'cdab'],
  [['abcd', 3], 'bcda'],
  [['abcdef', 0], 'abcdef'],
  [['abcdef', 2], 'efabcd'],
  [['abcdef', 6], 'abcdef'],
  [['abcdef', 35], 'bcdefa']
].map(test.makeCaseFromArray);

test.test(rotateStringInPlace, cases);
