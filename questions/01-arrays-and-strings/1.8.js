const test = require('../../test');

// Assume you have a method isSubstring which checks if one word is a
// substring of another. Given two strings, s1 and s2, write code to check if
// s2 is a rotation of s1 using only one call to isSubstring
// (e.g. "waterbottle" is a rotation of "erbottlewat").

/**
 * Check whether s1 is a substring of s2
 * @param  {String}  s1 Substring string
 * @param  {String}  s2 Substring of string
 * @return {Boolean}    True if s1 is a substring of s2
 */
function isSubstring(s1, s2) {
  return s2.indexOf(s1) !== -1;
}

/**
 * Check if s1 is a rotation of s2 using only one call to isSubString
 * @param  {String}  s1 Possibly rotated string
 * @param  {String}  s2 String that s1 is possibly a rotation of
 * @return {Boolean}    True if s1 is rotation of s2
 */
function isRotation(s1, s2) {
  return isSubstring(s2, s1 + s1);
}

const cases = [
  [['', ''], true],
  [['a', 'a'], true],
  [['ab', 'ba'], true],
  [['abc', 'bca'], true],
  [['abcd', 'dabc'], true],
  [['abcd', 'dbca'], false],
  [['waterbottle', 'erbottlewat'], true],
  [['waterbottle', 'bottlewater'], true]
].map(test.makeCaseFromArray);

test.test(isRotation, cases);
