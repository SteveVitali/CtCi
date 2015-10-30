var _ = require('lodash');

var BST = function() {
  this.root = null;
};

var TreeNode = function(data, parent, left, right) {
  this.data = data;
  this.parent = parent;
  this.left = left;
  this.right = right;
};

/**
 * Get the minimum element from a node
 * @return {Any} The smallest element
 */
TreeNode.prototype.getMinimum = function getMinimum() {
  return (function getMinimum(node) {
    return node.left ? getMinimum(node.left) : node.val;
  })(this);
};

BST.prototype.getMinimum = function getMinimum() {
  return this.root && this.root.getMinimum();
};

/**g
 * Get the maximum element from a node
 * @return {Any} The largest element
 */
TreeNode.prototype.getMaximum = function() {
  return (function getMaximum(node) {
    return node.right ? getMaximum(node.right) : node.val;
  })(this);
};

BST.prototype.getMaximum = function() {
  return this.root && this.root.getMaximum();
};

/**
 * Insert a value as a child of a node
 * Best case O(lgn), Worse case O(n)
 * @param  {Any}     val The value to insert
 * @return {Boolean} True if new value; false otherwise
 */
TreeNode.prototype.insert = function insert(val) {
  if (this.data > val) {
    return !this.left
     ? !!(this.left = new TreeNode(val, this))
     : !!this.left.insert(val);
  }
  if (this.data < val) {
    return !this.right
      ? !!(this.right = new TreeNode(val, this))
      : !!this.right.insert(val);
  }
  return false;
};

BST.prototype.insert = function(val) {
  return !this.root
    ? !!(this.root = new TreeNode(val))
    : this.root.insert(val);
};

/**
 * Replace a node from its parent node
 * @param  {TreeNode} replacement The replacement node
 * @return {Boolean}  Whether the replacement was succesful
 */
TreeNode.replaceWith = function(replacement) {
  if (this.parent) {
    if (this == this.parent.left) {
      this.parent.left = replacement;
    } else {
      this.parent.right = replacement;
    }
  }
  replacement.parent = this.parent;
};

/**
 * Remove a value from a node's children
 * Best case O(lgn), Worse case O(n)
 * @param  {Any}     val The value to remove
 * @return {Boolean} True if value was removed; false o/w
 */
TreeNode.prototype.remove = function remove(val) {
  if (this.data > val) return !!this.left && this.left.remove(val);
  if (this.data < val) return !!this.right && this.right.remove(val);
  if (this.left && this.right) {
    var successor = this.right.getMinimum();
    this.data = successor.data;
    return successor.remove(successor.data);
  }
  return this.replaceWith(this.left || this.right || null);
};

BST.prototype.remove = function(val) {
  return this.root && this.root.remove(val);
};

/**
 * Search for value in the BST
 * Best case O(lgn), Worse case O(n)
 * @param  {Any}     val The value to search for
 * @return {Boolean} True if val in BST; false o/w
 */
BST.prototype.search = function(val) {
  return (function search(node) {
    return !!node && (node.data === val ||
      search(node.data > val ? node.left : node.right, val)
    );
  })(this.root);
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
  assert.equal(tree.getMinimum(), 1);
  assert.equal(tree.getMaximum(), 1);

  tree.insert(4);

  assert.isTrue(tree.search(4));
  assert.isTrue(tree.searchIterative(4));
  assert.equal(tree.getMinimum(), 1);
  assert.equal(tree.getMaximum(), 4);

  var vals = [5, 3, 1, 2, 0, 3.5, 3.2, 3.8, 4.5, 6, 7, 10];
  _.each(vals, function(v) { tree.insert(v); });
  _.each(vals, function(v) { assert.isTrue(tree.search(v)); });
  _.each(vals, function(v) { assert.isTrue(tree.searchIterative(v)); });
  assert.equal(tree.getMinimum(), 0);
  assert.equal(tree.getMaximum(), 10);

  // Simple delete: no children
  tree.remove(0);

  assert.isFalse(tree.search(0));

  // Delete with one child tree
  tree.remove(6);

  assert.isFalse(tree.search(6));

  // Delete the root!
  tree.remove(4);
  assert.equal(tree.root.value, 4.5);
  assert.isFalse(tree.search(4));
};

// test();

module.exports = {
  BST: BST,
  TreeNode: TreeNode,
  test: test
};
