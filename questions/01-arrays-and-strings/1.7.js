const test = require('../../test');

// Write an algorithm such that if an element in an NxM matrix is  0,
// its entire row and column are set to 0.

function setRowsAndColumnsToZero(matrix) {
  const zeroOrNull = v => v === 0 ? 0 : null;
  const handleZero = (x, y) => {
    matrix[x] = matrix[x].map(zeroOrNull);
    matrix.forEach((row) => {
      row[y] = zeroOrNull(row[y]);
    });
  };

  matrix.forEach((row, x) => {
    row.forEach((xy, y) => {
      xy === 0 && handleZero(x, y);
    });
  });

  return matrix.map(row =>
    row.map(val =>
      val === null ? 0 : val
    )
  );
}

const input0x0 = [];
const output0x0 = [];

const input1x1 = [[1]];
const output1x1 = [[1]];

const input1x3 = [[1, 2, 0]];
const output1x3 = [[0, 0, 0]];

const input2x2 = [
  [1, 2],
  [0, 1]
];

const output2x2 = [
  [0, 2],
  [0, 0]
];

const input3x2 = [
  [1, 2],
  [0, 4],
  [5, 6]
];

const output3x2 = [
  [0, 2],
  [0, 0],
  [0, 6]
];

const input4x4 = [
  [1, 2, 3, 4],
  [5, 0, 7, 8],
  [9, 0,11,12],
  [0,14,15,16]
];

const output4x4 = [
  [0, 0, 3, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

const cases = [
  [[input0x0], output0x0],
  [[input1x1], output1x1],
  [[input1x3], output1x3],
  [[input2x2], output2x2],
  [[input3x2], output3x2],
  [[input4x4], output4x4]
].map(test.makeCaseFromArray);

test.test(setRowsAndColumnsToZero, cases);
