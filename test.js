var _ = require('lodash');

/**
 * Test a function with an array of arguments on a set of cases
 * @param  {Function} func The function to test
 * @param  {Array} cases   An array of 'case' objects w/ args/output
 * @return {Boolean} True if all cases pass, false otherwise
 */
exports.test = function(func, cases) {
  return _.reduce(cases, function(memo, c) {
    var output = undefined;
    try {
      output = func.apply(this, c.input);
    } catch (e) {}
    logResult(func, c, output);
    return memo && output === c.output;
  }, true);
};

/**
 * Format input data for console output
 * @param  {Any} data Some data
 * @return {String}   A string representation
 */
var format = function(input) {
  return JSON.stringify(input);
};

/**
 * Format function arguments as tuple
 * @param  {Any[]}  input Array of functiona rgs
 * @return {String} The args represented as a tuple
 */
var formatInput = function(args) {
  return '(' + _.reduce(args, function(memo, value, index) {
    return format(value) + (index !== args.length - 1 ? ', ' : '');
  }, '') + ')';
};

/**
 * Tell whether two values are structurally equal
 * @param  {Any} a   The first value
 * @param  {Any} b   The second value
 * @return {Boolean} Whether they're structurally equal
 */
var equals = function equals(a, b) {
  // Handle native types and references
  if (a === b || a == b) return true;
  // Handle arrays
  if (_.isArray(a)) {
    if (!_.isArray(b) || b.length !== a.length){
      return false;
    }
    return _.reduce(a, function(memo, value, index) {
      return memo && equals(a[index], b[index]);
    }, true);
  }
  // Handle objects without prototype chain
  if (_.isObject(a)) {
    if (!_.isObject(b)) return false;
    var isEqual = true;
    for (var key in a) {
      if (a.hasOwnProperty(key)) {
        isEqual = isEqual && b.hasOwnProperty(key) && equals(a[key], b[key]);
      }
    }
    return isEqual;
  }
  return false;
};

/**
 * Log the result of the test to the console
 * @param  {Function} func The function being tested
 * @param  {Object}   expected The 'case' object for the test
 * @param  {Any}      output   The output (native type)
 */
function logResult(func, testCase, output) {
  var expect = testCase.output;
  var success = equals(expect, output);
  var resultStr = success ? 'succeeds' : 'fails';
  var inputStr = 'for input <' + formatInput(testCase.input) + '>.';
  console.log(
    func.name + ' ' + resultStr + ' ' + inputStr + (
    !success
      ? ' Expected <' + format(expect) + '>' +
        ' but got <' + format(output) + '>'
      : ''
  ));
}

/**
 * Make a 'case' object with input and output values
 * @param  {Array}  inputArgs Array of input args (or just one arg)
 * @param  {Native} output    Output value (cannot be object or array)
 * @return {Object}           The 'case' object
 */
exports.makeCase = function(inputArgs, output) {
  return {
    input: _.isArray(inputArgs) ? inputArgs : [inputArgs],
    output: output
  };
};

/**
 * Another 'case' object constructor for convenience
 * @param  {Array} arr 2-element array with input and output data
 * @return {Object}    A corresponding 'case' object
 */
exports.makeCaseFromArray = function(arr) {
  if (!arr || !arr.length >= 2) throw 'Bad input';
  return exports.makeCase(arr[0], arr[1]);
};
