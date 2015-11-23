var _ = require('lodash');
var test = require('../../test');

// Recursive and iterative fibonacci
var recursive = function(n) {
  var cache = {};
  var fibonacci = function fibonacci(n) {
    if (n <= 0) return undefined;
    if (n === 1) return 0;
    if (n === 2) return 1;
    if (cache[n]) return cache[n];
    return (cache[n] = fibonacci(n - 1) + fibonacci(n - 2));
  };
  return fibonacci(n);
};

var iterative = function(n) {
  if (n <= 0) return undefined;
  if (n === 1) return 0;
  if (n === 2) return 1;
  var prev = [1, 0];
  var result = 1;
  _.times(n - 2, function() {
    result = result + prev[1];
    prev.pop();
    prev.unshift(result);
  });
  return result;
};

var cases = [
  [[0], undefined],
  [[1], 0],
  [[2], 1],
  [[3], 1],
  [[4], 2],
  [[5], 3],
  [[6], 5],
  [[7], 8],
  [[8], 13],
  [[9], 21],
  [[10], 34]
].map(test.makeCaseFromArray);

test.test(recursive, cases);
test.test(iterative, cases);
