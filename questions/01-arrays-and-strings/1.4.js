var test = require('../test');

// Write a method to replace all spaces in a string with '%20'
function replaceSpaces(str) {
  var result = '';
  var count = -1;
  while (++count < str.length) {
    result += str[count] !== ' ' ? str[count] : '%20';
  }
  return result;
}

function simpleReplaceSpaces(str) {
  return str.replace(/\s/g, '%20');
}

var doTest = function(func) {
  test.test(func, [
      ['', ''],
      [' ', '%20'],
      ['a ', 'a%20'],
      [' a ', '%20a%20'],
      [' ab cde fgh ', '%20ab%20cde%20fgh%20']
    ].map(test.makeCaseFromArray)
  );
};

doTest(replaceSpaces);
doTest(simpleReplaceSpaces);
