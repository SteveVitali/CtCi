var _ = require('lodash');

var TreeNode = function(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
};

var BST = function() {
  this.root = null;
};

BST.prototype.insert = function(val) {
  if (!this.root) {
    return !!(this.root = new TreeNode(val));
  }
  var insert = function insert(node, val) {
    if (node.data > val) {
      return !node.left
       ? !!(node.left = new TreeNode(val))
       : !!insert(node.left, val);
    }
    if (node.data < val) {
      return !node.right
        ? !!(node.right = new TreeNode(val))
        : !!insert(node.right, val);
    }
    return true;
  };
  insert(this.root, val);
};

BST.prototype.remove = function(val) {

};

/**
 * Search for value in the BST
 * Best case O(lgn), Worse case O(n)
 * @param  {Any}     val The value to search for
 * @return {Boolean} True if val in BST; false o/w
 */
BST.prototype.search = function(val) {
  return (function search(node, val) {
    return !!node && (node.data === val ||
      search(node.data > val ? node.left : node.right, val)
    );
  })(this.root, val);
};

// Same as search above but iterative
BST.prototype.searchIterative = function(val) {
  var node = this.root;
  while (node && node.data !== val) {
    node = node.data === val
      ? node
      : (node.data > val ? node.left : node.right);
  };
  return !!node;
};

var test = function() {
  var assert = require('chai').assert;
  var tree = new BST();

  assert.isFalse(tree.search(1));
  assert.isFalse(tree.searchIterative(1));

  tree.insert(4);

  assert.isTrue(tree.search(4));
  assert.isTrue(tree.searchIterative(4));

  var vals = [5, 3, 1, 2];
  _.each(vals, function(v) { tree.insert(v); });
  _.each(vals, function(v) { assert.isTrue(tree.search(v)); });
  _.each(vals, function(v) { assert.isTrue(tree.searchIterative(v)); });
};

// test();

module.exports = {
  BST: BST,
  TreeNode: TreeNode,
  test: test
};
