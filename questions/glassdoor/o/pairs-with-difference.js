var _ = require('lodash');
var test = require('../../../test');

/**
 * Find the number of pairs of numbers in the array
 * with a particular difference; Assume numbers are distinct and positive
 * @param  {Number[]} numbers    An array of distinct numbers
 * @param  {Number}   difference The desired difference
 * @return {Number}              The number of pairs of numbers with difference
 */
function numPairsWithDifference(numbers, difference) {
  var count = 0;
  var map = {};
  _.each(numbers, function(number, i) {
    map[number] = true;
    var possibility = number - difference;
    _.each([possibility, -possibility], function(poss) {
      if (map[poss] && poss !== number) {
        count++;
        delete map[poss];
      }
    });
  });
  return count;
}

test.test(numPairsWithDifference, [
  [[[0, 1, 2, 3, 4], 2], 3],
  [[[-2, -1, 0, 1, 2], 2], 3]
].map(test.makeCaseFromArray));
