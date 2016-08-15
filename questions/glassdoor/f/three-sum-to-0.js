import _ from 'lodash';
import test from '../../../test';

/**
 * Determine if any 3 integers in an array sum to 0
 * (repetitions of single array element are allowed, e.g. [0] => true)
 * @param  {int[]} A Array to find sum in
 * @return {Boolean} Whether there exist 3 elements summing to 0
 */
function has3ElementsSummingToZero(A) {
  return has3ElementsSummingToX(A, 0);
}

function has3ElementsSummingToX(A, X) {
  // Because you can use elements multiple times,
  // might as well conver to unique array
  for (let i = 0; i < A.length; i++) {
    if (has2ElementsSummingToX(A, X - A[i])) {
      return true;
    }
  }
  return false;
}

function has2ElementsSummingToX(A, X) {
  for (let i = 0; i < A.length; i++) {
    // Check if there exists A[k] s.t. A[i] + A[k] = X
    if (has1ElementSummingToX(A, X - A[i])) {
      return true;
    }
  }
  return false;
}

function has1ElementSummingToX(A, X) {
  return A.indexOf(X) !== -1;
}

const cases = [
  [[[]], false],
  [[[0]], true],
  [[[1]], false],
  [[[1, -2]], true],
  [[[1, 1, -2]], true],
  [[[-5,1,10]], true],
  [[[4, 2, -1, 1, -5, 6, -4]], true]
].map(test.makeCaseFromArray);

test.test(has3ElementsSummingToZero, cases);
