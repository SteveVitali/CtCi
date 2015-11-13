var test = require('../../test');

/**
 * Group numbers into low, medium, and high
 * @param  {Number} num The number to group
 * @return {String}     L, M, or H
 */
var getCategory = function(num) {
  if (num < 10) return 'L';
  if (num < 20) return 'M';
  return 'H';
};

/**
 * Sort an array of numbers by low, medium, and high
 * @param  {Number[]} arr The array
 * @return {Number[]}     The array sorted by L, M, H
 */
var bucketSort = function(arr) {
  var map = {
    L: [],
    M: [],
    H: []
  };
  for (var i = 0; i < arr.length; i++) {
    map[getCategory(arr[i])].push(arr[i]);
  }
  return map.L.concat(map.M.concat(map.H));
};

/**
 * Sort an array of numbers by low, medium, and high
 * @param  {Number[]} arr The array
 * @return {Number[]}     The array sorted by L, M, H
 */
var inPlaceSort = function(arr) {

  var swap = function(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  var largestSmall = 0;
  var smallestHigh = arr.length - 1;

  for (var i = 0; i < arr.length; i++) {
    var category = getCategory(arr[i]);
    if (category === 'L') {
      if (i !== largestSmall - 1) {
        swap(arr, i, largestSmall);
        i--;
      }
      largestSmall++;
    }
    else if (category === 'H') {
      if (i !== smallestHigh + 1) {
        swap(arr, i, smallestHigh);
        i--;
      }
      smallestHigh--;
    }
  }
  return arr;
};

var cases = [
  [[[]], []],
  [[[1]], [1]],
  [[[10, 1]], [1, 10]],
  [[[10, 1, 20, 9]], [1, 9, 10, 20]]
].map(test.makeCaseFromArray);

test.test(bucketSort, cases);
test.test(inPlaceSort, cases);
