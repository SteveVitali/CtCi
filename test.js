var _ = require('lodash');

/**
 * Test a function with an array of arguments on a set of cases
 * @param  {Function} func The function to test
 * @param  {Array} cases   An array of 'case' objects w/ args/output
 * @return {Boolean} True if all cases pass, false otherwise
 */
exports.test = function(func, cases) {
  return _.reduce(cases, function(memo, c) {
    // NOTE: only works for primitive output types
    var success = func.apply(this, c.input) === c.output;
    var result = success ? 'succeeds' : 'fails';
    console.log(func.name + ' ' + result + ' for input "' + c.input + '"');
    return success && memo;
  }, true);
};

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
