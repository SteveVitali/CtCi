
var BinaryTree = function() {
  this.root = null;
};

var TreeNode = function(data, parent, left, right) {
  this.data = data;
  this.parent = parent;
  this.left = left;
  this.right = right;
};

/**
 * Walk the tree in pre-order
 * @param  {Function} traverse What do do on each node
 */
var preOrder = function preOrder(node, traverse) {
  traverse(node);
  node.left && preOrder(node.left, traverse);
  node.right && preOrder(node.right, traverse);
};

/**
 * Walk the tree in post-order
 * @param  {Function} traverse What do do on each node
 */
var postOrder = function postOrder(node, traverse) {
  node.left && postOrder(node.left, traverse);
  node.right && postOrder(node.right, traverse);
  traverse(node);
};

/**
 * Walk the tree in-order
 * @param  {Function} traverse What do do on each node
 */
var inOrder = function inOrder(node, traverse) {
  node.left && postOrder(node.left, traverse);
  traverse(node);
  node.right && postOrder(node.right, traverse);
};

module.exports = {
  BinaryTree: BinaryTree,
  preOrder: preOrder,
  postOrder: postOrder,
  inOrder: inOrder
};
