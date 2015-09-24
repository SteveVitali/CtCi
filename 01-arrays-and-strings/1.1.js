var test = require('../test');

// 1.1: Implement an algorithm to determine if a string has all unique
// characters.
function uniqueCharacters(str) {
  var charMap = {};
  var count = -1;
  while (++count < str.length) {
    if (charMap[str[count]]) return false;
    charMap[str[count]] = true;
  }
  return true;
}

// 1.1 (cont.) What if you cannot use additional data structures?
function uniqueCharactersNoDataStructures(str) {
  var count = -1;
  while (++count < str.length) {
    var innerCount = count;
    while (++innerCount < str.length) {
      if (str[innerCount] === str[count]) return false;
    }
  }
  return true;
}

function runTest(func) {
  test.test(func, [
      ['', true],
      ['a', true],
      ['aa', false],
      ['abc', true],
      ['abca', false],
      ['abcdec', false]
    ].map(test.makeCaseFromArray)
  );
}

runTest(uniqueCharacters);
runTest(uniqueCharactersNoDataStructures);
