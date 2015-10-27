var test = require('../test');

// 1.2 Implement a function void reverse(char* str)
// in C or C++ which reverses a null-terminated string
function reverse(str) {
  var reverse = '';
  var count = str.length;
  while (--count >= 0) reverse += str[count];
  return reverse;
}

test.test(reverse, [
    ['', ''],
    ['a', 'a'],
    ['ab', 'ba'],
    ['racecar', 'racecar'],
    ['javascript', 'tpircsavaj']
  ].map(test.makeCaseFromArray)
);
