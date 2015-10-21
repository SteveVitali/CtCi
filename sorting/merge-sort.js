var defaultComparator = require('./comparator');
/**
 * Sort an array using a particular comparator
 * @param  {Array}    arr        The array to sort
 * @param  {Function} comparator The comparator function to use
 * @return {Array}               The array sorted base on comparator
 */
module.exports = function(arr, comparator) {
  var compare = comparator || defaultComparator;

  /**
   * Recursively split the array in half and merge
   * the mergeSorted halves
   * Running time:
   *   Worst   case: O(nlgn)
   *   Average case: O(nlgn)
   *   Best    case: O(nlgn)
   *   Recurrence: T(n) = T(n/2) + n
   *
   * @param  {Array} arr Array to sort
   * @return {Array}     Sorted array
   */
  var mergeSort = function(arr) {
    var mid = Math.floor(arr.length / 2);
    if (mid === 0) return arr;

    var left = arr.slice(0, mid);
    var right = arr.slice(mid, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  };

  /**
   * Merge two sorted lists of length a + b = n
   * Running time: O(n)
   *
   * @param  {Array} a Sorted array 1
   * @param  {Array} b Sorted array 2
   * @return {Array}   Sorted array containing a and b
   */
  var merge = function(a, b) {
    var result = [];
    var aIndex = bIndex = 0;
    while (aIndex < a.length || bIndex < b.length) {
      if (aIndex >= a.length) {
        result.push(b[bIndex++]);
      }
      else if (bIndex >= b.length) {
        result.push(a[aIndex++]);
      }
      else {
        result.push(compare(a[aIndex], b[bIndex]) === -1
          ? a[aIndex++]
          : b[bIndex++]
        );
      }
    }
    return result;
  };

  return mergeSort(arr);
};
