var test = require('../../test');

/**
 * Compute all permutations of a string
 * @param  {String} str The string to permute
 * @return {String[]}   All the permutations of the string
 */
var permuteString = function(str) {
  var results = [];

  (function permute(prefix, s) {
    if (s.length === 0) results.push(prefix);
    for (var i = 0; i < s.length; i++) {
      permute(prefix + s[i], s.substring(0, i) + s.substring(i + 1, s.length));
    }
  })('', str);

  return results;
};

var testCases = [
  [[''], ['']],
  [['a'], ['a']],
  [['ab'], ['ab', 'ba']],
  [['abc'], ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']]
].map(test.makeCaseFromArray);

test.test(permuteString, testCases);
