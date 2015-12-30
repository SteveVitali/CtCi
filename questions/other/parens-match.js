var _ = require('lodash');
var test = require('../../test');
var Stack = require('../../data-structures/stack').Stack;

// Given a string containnig parentheses/brackets/braces,
// check that the paren enclosures are valid.
var left = {
  '(': ')',
  '[': ']',
  '{': '}'
};
var right = {
  ')': '(',
  ']': '[',
  '}': '{'
};
var validateParens = function(str) {
  var stack = new Stack();
  return _.reduce(str, function(memo, char) {
    left[char] && stack.push(char);
    return memo && (right[char] ? stack.pop() === right[char] : true);
  }, true) && stack.size === 0;
};

var testCases = [
  [[''], true],
  [['('], false],
  [['()'], true],
  [['(ayy lmao)'], true],
  [['([)'], false],
  [['([]))'], false],
  [['([])'], true],
  [['([[{{}}]])'], true],
  [['{ var ayy = [42 * (lmao) + welp]}'], true],
  [['{ var ayy = [42 * (lmao)) + welp]}'], false]
].map(test.makeCaseFromArray);

test.test(validateParens, testCases);
