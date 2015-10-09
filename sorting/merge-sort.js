var defaultComparator = require('./comparator');
/**
 * Sort an array using a particular comparator
 * @param  {Array}    arr        The array to sort
 * @param  {Function} comparator The comparator function to use
 * @return {Array}               The array sorted base on comparator
 */
module.exports = function(arr, comparator) {
  var compare = comparator || defaultComparator;
  // ...
};
