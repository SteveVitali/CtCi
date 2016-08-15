export default class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /**
   * Walk the tree in pre-order
   * @param  {Function} traverse What do do on each node
   */
  preOrder(traverse) {
    this.root && this.root.preOrder(traverse);
  }

  /**
   * Walk the tree in post-order
   * @param  {Function} traverse What do do on each node
   */
  postOrder(traverse) {
    this.root && this.root.postOrder(traverse);
  }

  /**
   * Walk the tree in-order
   * @param  {Function} traverse What do do on each node
   */
  inOrder(traverse) {
    this.root && this.root.inOrder(traverse);
  }

  /**
   * Count the height of a node (# of nodes from root to farthest leaf)
   * @param  {Node} node The Node whose height we desire
   * @return {Number}    The distance in nodes from root to farthest leaf
   */
  height() {
    this.root && this.root.height();
  }
}

export class TreeNode {
  constructor(data, parent, left, right) {
    this.data = data;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }

  static height(node) {
    return (function h(n, depth) {
      return n
        ? Math.max(h(n.left, depth + 1), h(n.right, depth + 1))
        : depth;
    })(node, 0);
  }

  preOrder(traverse) {
    traverse(this);
    this.left && this.left.preOrder(traverse);
    this.right && this.right.preOrder(traverse);
  }

  postOrder(traverse) {
    this.left && this.left.postOrder(traverse);
    this.right && this.right.postOrder(traverse);
    traverse(this);
  }

  inOrder(traverse) {
    this.left && this.left.postOrder(traverse);
    traverse(this);
    this.right && this.right.postOrder(traverse);
  }

  height() {
    return TreeNode.height(this);
  }

  isBalanced() {
    return (function balanced(node) {
      if (!node) return true;
      const diff = TreeNode.height(node.left) - TreeNode.height(node.right);
      return Math.abs(diff) <= 1 && balanced(node.left) && balanced(node.right);
    })(this);
  }
}
