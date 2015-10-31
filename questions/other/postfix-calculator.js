var _ = require('lodash');
var test = require('../../test');
var Stack = require('../../data-structures/stack').Stack;

/**
 * Compute the result for given postfix expression
 * e.g. '3 4 +' = 7
 * @param  {String} str The postfix expression
 * @return {Number}     The result of the expression
 */
var calculate = function(str) {
  var stack = new Stack();
  var operations = {
    '+': function(a, b) { return a + b; },
    '-': function(a, b) { return a - b; },
    'x': function(a, b) { return a * b; },
    '/': function(a, b) { return a / b; }
  };
  _.each(str.split(' '), function(token) {
    if (token in operations) {
      var op2 = stack.pop();
      var op1 = stack.pop();
      if (op1 !== null && op2 !== null) {
        stack.push(operations[token](op1, op2));
      } else throw 'Invalid expression';
    } else stack.push(Number(token));
  });
  return stack.pop();
};

var testCases = [
  [['3 4 +'], 7],
  [['3 16 8 / x'], 6],
  [['5 1 2 + 4 x + 3 -'], 14]
].map(test.makeCaseFromArray);

test.test(calculate, testCases);
