
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

/**
 * Count the height of a node (# of nodes from root to farthest leaf)
 * @param  {Node} node The Node whose height we desire
 * @return {Number}    The distance in nodes from root to farthest leaf
 */
var height = function(node) {
  return (function h(n, depth) {
    return n
      ? Math.max(h(n.left, depth + 1), h(n.right, depth + 1))
      : depth;
  })(node, 0);
};

var isBalanced = function isBalanced(node) {
  if (!node) return true;
  return Math.abs(height(node.left) - height(node.right)) <= 1
     && isBalanced(node.left)
     && isBalanced(node.right);
};

module.exports = {
  BinaryTree: BinaryTree,
  preOrder: preOrder,
  postOrder: postOrder,
  inOrder: inOrder,
  isBalanced: isBalanced,
  height: height
};
