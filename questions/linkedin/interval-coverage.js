var _ = require('lodash');
var test = require('../../test');
var MergeSort = require('../../sorting/merge-sort');

/**
 * Given an array of intervals of the form
 * [x, y), find the coverage of all the intervals
 * e.g. [[0, 1), [1, 4), [9, 10)] => 5
 * @param  {Interval[]} intervals Array of intervals
 * @return {Number}     The total coverage of the intervals
 */
var getCoverage = function(intervals) {
  // Sort ascending first-index, descending second-index
  var intervals = MergeSort(intervals, function(a, b) {
    if (a[0] > b[0]) return 1;
    if (a[0] === b[0]) return (
      a[1] > b[1] ? -1 : (a[1] === b[1] ? 0 : 1)
    );
    return -1;
  });

  /**
   * Merge two intervals
   * @param  {Number[]} a First interval
   * @param  {Number[]} b Second interval
   * @return {Number[]}   A union of intervals, or null if no intersection
   */
  var combine = function(a, b) {
    if (a[0] < b[0] && a[1] < b[0]) return null;
    if (b[0] < a[0] && b[1] < a[0]) return null;
    return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
  };

  var nonIntersectingIntervals = [];
  var leftValue = null;
  _.each(intervals, function(interval) {

    // Take advantage of sorting descending second value
    // by ignoring subsequent intervals that start with leftValue
    if (leftValue === interval[0]) return;
    leftValue = interval[0];

    var intersects = false;
    for (var i = 0 ; i < nonIntersectingIntervals.length; i++) {
      var nonIntersecting = nonIntersectingIntervals[i];
      var combination = combine(interval, nonIntersecting);
      if (combination !== null) {
        intersects = true;
        nonIntersectingIntervals[i] = combination;
      }
    }
    if (!intersects) {
      nonIntersectingIntervals.push(interval);
    }
  });
  return _.reduce(nonIntersectingIntervals, function(memo, interval) {
    return memo + interval[1] - interval[0];
  }, 0);
};

var intervals = [
  [3, 7],
  [0, 1],
  [2, 1],
  [10, 12],
  [2, 5],
  [0, 2],
  [0, 4],
  [5, 8],
  [15, 18],
  [14, 20]
];

var testCases = [
  [[intervals], 16]
].map(test.makeCaseFromArray);

test.test(getCoverage, testCases);
