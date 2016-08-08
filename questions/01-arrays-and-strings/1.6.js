const test = require('../../test');

// Given an image represented by an NxN matrix, where each pixel in the images
// is 4 bytes, write a method to rotate the image by 90 degrees.
// Can you do this in place?

/**
 * Rotate an NxN matrix by 90 degrees
 * @param  {int[][]} matrix [description]
 * @return {int[][]}        matrix rotated by 90 degrees
 */
function rotateMatrix(matrix) {
  const n = matrix.length;
  let rotated = matrix.map(row => []);
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      rotated[y][n - x - 1] = matrix[x][y];
    }
  }
  return rotated;
}

const input0x0 = [];
const output0x0 = [];

const input1x1 = [[1]];
const output1x1 = [[1]];

const input2x2 = [
  [1, 2],
  [3, 4]
];

const output2x2 = [
  [3, 1],
  [4, 2]
];

const input3x3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const output3x3 = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3]
];

const input4x4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10,11,12],
  [13,14,15,16]
];

const output4x4 = [
  [13, 9, 5, 1],
  [14, 10, 6, 2],
  [15, 11, 7, 3],
  [16, 12, 8, 4]
];

const cases = [
  [[input0x0], output0x0],
  [[input1x1], output1x1],
  [[input2x2], output2x2],
  [[input3x3], output3x3],
  [[input4x4], output4x4]
].map(test.makeCaseFromArray);

test.test(rotateMatrix, cases);
