var _ = require('lodash');
var test = require('../../test');
var MergeSort = require('../../sorting/merge-sort');

// Given a number n,
// find the largest number just smaller than n
// that can be formed using the same digits as n.

function largestSmallerNumberWithSameDigits(num) {
  var str = num + '';
  if (str.length <= 1) return null;
  if (str.length === 2) {
    return str[1] < str[0]
      ? Number(str[1] + str[0])
      : null;
  }

  var initial = str[0];
  var possibilities = [];

  _.each(str, function(d, index) {
    var rest = excludeIndex(str, index);
    var possibility = null;
    if (d === initial) {
      possibility = largestSmallerNumberWithSameDigits(rest);
    }
    else if (d < initial) {
      possibility = MergeSort(rest.split(''), function(a, b) {
        return a < b ? 1 : (a > b ? -1 : 0);
      }).join('');
    }
    if (possibility !== null && (d + possibility) !== str) {
      possibilities.push(d + possibility);
    }
  });
  return possibilities.length > 0
    ? Number(_.max(possibilities))
    : null;
}

var excludeIndex = function(str, i) {
  return str.substring(0, i) + str.substring(i + 1, str.length);
};

test.test(largestSmallerNumberWithSameDigits, [
  [0, null],
  [1, null],
  [9, null],
  [10, 1],
  [11, null],
  [12, null],
  [21, 12],
  [123, null],
  [213, 132],
  [321, 312],
  [333, null],
  [21545, 21455]
].map(test.makeCaseFromArray));
