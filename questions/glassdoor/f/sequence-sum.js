import test from '../../../test';
import Queue from '../../../data-structures/queue';

/**
 * Problem: Given a sequence of nonnegative integers A and an integer T, return
 * whether there is a *continuous sequence* of A that sums up to exactly T
 * @param  {int[]}  A Non-negative array of integers
 * @param  {Number} T Integer we want to sum to
 * @return {Boolean} whether there is a sequence in A summing to T
 */
function hasContinuousSequenceSummingToTBruteForce(A, T) {
  // Brute force O(n^2) solution:
  // For each sequence defined by starting index i and ending index j,
  // check whether that sequence sums to T
  const sequenceSum = (start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
      sum += A[i];
    }
    return sum;
  };
  for (let start = 0; start < A.length; start++) {
    for (let end = start; end < A.length; end++) {
      if (sequenceSum(start, end) === T) {
        return true;
      }
    }
  }
  return false;
}

// Desired O(n) solution
// The strategy here is as follows:
// 1. Initialize a queue Q
// 2. Iterate over each element in A, adding it to Q
// 3. Keep track of a running sum of the elements in Q
// 4. Once the sum equals T, return true
// 5. If sum exceeds T, then, while sum > T, pop elements off Q
// 6. Continue until we get to end of array
function hasContinuousSequenceSummingToTEfficient(A, T) {
  let q = new Queue();
  let sum = 0;
  for (let i = 0; i < A.length; i++) {
    q.enqueue(A[i]);
    sum += A[i];
    if (sum === T) return true;
    if (sum < T) continue;
    while (sum > T) {
      sum -= q.dequeue();
      if (sum === T) return true;
    }
  }
  return false;
}

const empty = [[], 0];
const singletonTrue = [[1], 1];
const singletonFalse = [[1], 2];
const doubletonTrue = [[1, 2], 3];
const doubletonFalse = [[1, 2], 4];
const input1 = [[23, 5, 4, 7, 2, 11], 20];
const input2 = [[1, 3, 5, 23, 2], 8];
const input3 = [[1, 3, 5, 23, 2], 7];

const cases = [
  [empty, false],
  [singletonTrue, true],
  [singletonFalse, false],
  [doubletonTrue, true],
  [doubletonFalse, false],
  [input1, true],
  [input2, true],
  [input3, false]
].map(test.makeCaseFromArray);

test.test(hasContinuousSequenceSummingToTBruteForce, cases);
test.test(hasContinuousSequenceSummingToTEfficient, cases);
