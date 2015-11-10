var _ = require('lodash');
var test = require('../../test');
var Stack = require('../../data-structures/stack').Stack;

// Design a system to store large numbers and a function to add them.

/**
 * Add two large numbers represented as arrays of digits
 *   123,456,678 =    [1, 2, 3, 4, 5, 6, 6, 7, 8] +
 *   934,567,890 =    [9, 3, 4, 5, 6, 7, 8, 9, 0] =
 * 1,058,024,568 = [1, 0, 5, 8, 0, 2, 4, 5, 6, 8]
 * @param {Number[]} a Array of digits
 * @param {Number[]} b Array of digits
 */
function addNumbers(a, b) {
  var stack = new Stack();
  var t = a;
  a = a.length >= b.length ? a : b;
  b = t.length >= b.length ? b : t;

  var r = 0;
  for (var i = 1; i <= a.length; i++) {
    var x = get(a, i);
    var y = get(b, i);
    var sum = x + y + r;
    if (sum < 10) {
      stack.push(sum);
      r = 0;
    } else {
      stack.push(sum - 10);
      r = 1;
    }
  }
  r !== 0 && stack.push(r);
  return stack.toArray();
}

// get([1, 2, 3, 4], 1) = 4
// get([1, 2, 3], 3) = 1
function get(arr, i) {
  return arr[arr.length - i] || 0;
}

test.test(addNumbers, [
  [[[0], [0]], [0]],
  [[[1], [5]], [6]],
  [[[6], [8]], [1, 4]],
  [[[9, 9], [1]], [1, 0, 0]],
  [
    [
      [1, 2, 3, 4, 5, 6, 6, 7, 8], [9, 3, 4, 5, 6, 7, 8, 9, 0]
    ],
    [1, 0, 5, 8, 0, 2, 4, 5, 6, 8]
  ]
].map(test.makeCaseFromArray));
