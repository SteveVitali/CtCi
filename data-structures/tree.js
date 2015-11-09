var _ = require('lodash');
var Queue = require('./queue').Queue;

var TreeNode = function(data, parent, arity, children) {
  this.data = data;
  this.parent = parent;
  this.children = _.isArray(children) ? children : [];
  this.arity = arity || 2;
};

TreeNode.prototype.setChild = function(i, data) {
  this.children[i] = new TreeNode(data, this, [], this.arity);
};

TreeNode.prototype.getChild = function(i) {
  return this.children[i] || null;
};

TreeNode.prototype.hasChild = function() {
  return _.compact(this.children).length > 0;
};

TreeNode.prototype.print = function() {
  var q = new Queue();
  var current = { node: this, level: 0 };
  var levels = [];
  var arity = this.arity;
  q.enqueue(current);
  while ((current = q.dequeue()) !== null) {
    var currentData = current.node
      ? current.node.data
      : '_';

    levels[current.level] = levels[current.level] || [];
    levels[current.level].push(currentData);

    if (current.node && current.node.hasChild()) {
      _.times(arity, function(index) {
        q.enqueue({
          node: current.node && current.node.getChild(index),
          level: current.level + 1
        });
      });
    }
  }
  var diameter = 2 * levels[levels.length - 1].length;
  _.each(levels, function(level, index) {
    var radius = Math.ceil(diameter / level.length);
    var spacer = Array(radius).join(' ');
    var indent = Array(Math.ceil(radius / arity)).join(' ');
    console.log(indent + level.join(spacer));
  });
};

function testPrint() {
  var tree = new TreeNode(1, null, 3, []);
  _.each([2, 3, 4], function(child, index) {
    tree.setChild(index, child);
    _.each([5, 6], function(grandChild, grandIndex) {
      tree.getChild(index).setChild(grandIndex, grandChild + index);
      _.each([0, 1], function(grandGrandChild, grandGrandIndex) {
        tree.getChild(index).getChild(grandIndex).setChild(
          grandGrandIndex,
          grandGrandChild + grandIndex
        );
      });
    });
  });
  tree.print();
};
