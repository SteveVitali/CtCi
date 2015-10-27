var test = require('../test');

// Given two strings, write a method to decide if
// one is a permutation of the other.
function isPermutation(a, b) {
  if (a.length !== b.length) return false;
  var makeMap = function(str) {
    var map = {};
    var count = -1;
    while (++count < str.length) {
      var c = str[count];
      map[c] = map[c] ? map[c] + 1 : 1;
    }
    return map;
  };
  var compareMaps = function(x, y) {
    for (var key in x) {
      if (x[key] !== y[key]) return false;
    }
    return true;
  };
  return compareMaps(makeMap(a), makeMap(b));
}

test.test(isPermutation, [
    [['', ''], true],
    [['a', 'a'], true],
    [['a', 'b'], false],
    [['ab', 'ba'], true],
    [['steve', 'veste'], true],
    [['welp', 'womp'], false]
  ].map(test.makeCaseFromArray)
);
