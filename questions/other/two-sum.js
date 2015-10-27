var test = require('../../test');
var MergeSort = require('../../sorting/merge-sort');
var binarySearch = require('../../data-structures/array').binarySearch;

/* QUESTION:
 * Given an array of integers, find two numbers such that
 * they add up to a specific target number.
 * @param  {Number[]} arr Array of numbers
 * @param  {Number}   num Desired sum
 * @return {Number[]} The indices of the two numbers that add to num
*/

// Two-Sum Brute Force: O(n^2)
function twoSumBruteForce(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] + arr[j] === num) {
        return i <= j
          ? [i, j]
          : [j, i];
      }
    }
  }
}

// Two-Sum Efficient: O(nlgn)
function twoSumEfficient(arr, num) {
  var sorted = MergeSort(arr);
  for (var i = 0; i < arr.length; i++) {
    var target = num - arr[i];
    // Search for target but exclude the i-th index from search
    var j = binarySearch(arr, target, 0, i) ||
            binarySearch(arr, target, i + 1, arr.length);
    if (j === undefined) continue;
    return i <= j
      ? [i, j]
      : [j, i];
  }
}

var testCases = [
  [[[], 0], undefined],
  [[[0], 0], undefined],
  [[[0, 1], 1], [0, 1]],
  [[[0, 4, 2, 5, 9], 9], [0, 4]],
  [[[4, 93, 5, 1], 98], [1, 2]]
].map(test.makeCaseFromArray);

test.test(twoSumBruteForce, testCases);
test.test(twoSumEfficient, testCases);
