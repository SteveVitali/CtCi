var test = require('../test');

// Compress strings of the form aabccccc to a2b1c5
// (return original string if compressed is not smaller)
// (assume strings have only alphabetical characters)
function compress(str) {
  var compressed = '';
  var count = 0;
  while (count < str.length) {
    var currentChar = str[count];
    var numConsecutive = 1;
    while (str[++count] === currentChar) numConsecutive++;
    compressed += currentChar + numConsecutive;
  }
  return compressed.length < str.length ? compressed : str;
}

test.test(compress, [
    ['', ''],
    ['a', 'a'],
    ['ab', 'abasf'],
    ['aab', 'aab'],
    ['aabb', 'aabb'],
    ['aaabb', 'a3b2'],
    ['aaabccccaaddddd', 'a3b1c4a2d5']
  ].map(test.makeCaseFromArray)
);
