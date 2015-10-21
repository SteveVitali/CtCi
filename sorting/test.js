var test = require('../test');
var sorts = require('./index');

module.exports = function() {
  for (var sort in sorts) {
    test.test(sorts[sort], [
      [[[]], []],
      [[[1]], [1]],
      [[[2, 1]], [1, 2]],
      [[[5, 1, 2, 4, 3]], [1, 2, 3, 4, 5]],
      [[[4, 2, 3, 1]], [1, 2, 3, 4]],
      [[[6, 5, 4, 3, 2, 1, 0]], [0, 1, 2, 3, 4, 5, 6]]
    ].map(test.makeCaseFromArray));
  }
};
