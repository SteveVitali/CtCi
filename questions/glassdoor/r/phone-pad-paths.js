var test = require('../../test');
var _ = require('lodash');

// Print the possible paths of Chess night on a phone keypad

// KEYPAD:
// 1 2 3
// 4 5 6
// 7 8 9
// - 0 -

// Example:
// getMoves(2, 2) = [
//   [2,7,2]
//   [2,7,6]
//   [2,9,2]
//   [2,9,4]
// ]

// Encode phone pad as matrix
var phoneMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [undefined, 0, undefined]
];

// Generically map pad numbers to locations in matrix
var phonePad = {};
for (var i = 0; i < phoneMatrix.length; i++) {
  for (var j = 0; j < phoneMatrix[i].length; j++) {
    var padNumber = phoneMatrix[i][j];
    phonePad[padNumber] = [i, j];
  }
}

// The more generic solution to the possible-moves subproblem
var possibleMoves = function(fromNumber) {
  var validMoves = [];
  var initialLocation = phonePad[fromNumber];
  var x = initialLocation[0];
  var y = initialLocation[1];

  var potentialDestinations = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y - 2],
    [x + 1, y + 2],
    [x - 1, y - 2],
    [x - 1, y + 2]
  ];
  for (var i = 0; i < potentialDestinations.length; i++) {
    var potentialX = potentialDestinations[i][0];
    var potentialY = potentialDestinations[i][1];

    if (phoneMatrix[potentialX] &&
        phoneMatrix[potentialX][potentialY] !== undefined) {
      validMoves.push(
        phoneMatrix[potentialX][potentialY]
      );
    }
  }
  return validMoves;
};

var getMoves = function(startNumber, numberOfMoves) {
  if (numberOfMoves === 0) return [[startNumber]];

  var moves = [];
  var initialDestinations = possibleMoves(startNumber);

  for (var i = 0; i < initialDestinations.length; i++) {

    var nextMoves = getMoves(initialDestinations[i], numberOfMoves - 1);

    for (var j = 0; j < nextMoves.length; j++) {
      moves.push([startNumber].concat(nextMoves[j]));
    }
  }
  return moves;
};

var testPossibleMoves = function() {
  // The hard-coded solution to the possible-moves subproblem
  var possibleMovesMap = {
    1: [8, 6],
    2: [9, 7],
    3: [8, 4],
    4: [0, 9, 3],
    5: [],
    6: [0, 7, 1],
    7: [2, 6],
    8: [3, 1],
    9: [2, 4],
    0: [6, 4]
  };

  var possibleMovesTestCases = _.times(10, function(i) {
    return test.makeCaseFromArray([[i], possibleMovesMap[i]]);
  });

  test.test(possibleMoves, possibleMovesTestCases);
};

var testGetMoves = function() {
  // getMoves(2, 2) = [
  //   [2,7,2]
  //   [2,7,6]
  //   [2,9,2]
  //   [2,9,4]
  // ]
  console.log(getMoves(2, 2));
};

testPossibleMoves();
testGetMoves();
