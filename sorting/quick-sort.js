var defaultComparator = require('./comparator');
/**
 * Sort an array using Quick Sort with a particular comparator
 * Runtime: Average O(nlgn), Worst case O(n^2)
 * Memory: O(lng)
 * @param  {Array}    arr        The array to sort
 * @param  {Function} comparator The comparator function to use
 * @return {Array}               The array sorted base on comparator
 */
module.exports = function(arr, comparator) {
  var compare = comparator || defaultComparator;

  var swap = function(i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  };

  var partition = function(lo, hi) {
    var pivot = arr[Math.floor((lo + hi) / 2)];
    while (lo <= hi) {
      while (compare(arr[lo], pivot) === -1) lo++;
      while (compare(arr[hi], pivot) === 1) hi--;
      if (lo <= hi) {
        swap(lo, hi);
        lo++;
        hi--;
      }
    }
    return lo;
  };

  (function quickSort(lo, hi) {
    var pivot = partition(lo, hi);
    // Sort left half
    if (lo < pivot - 1) {
      quickSort(lo, pivot - 1);
    }
    // Sort right half
    if (pivot < hi) {
      quickSort(pivot, hi);
    }
  })(0, arr.length - 1);

  return arr;
};
