var _ = require('lodash');
var assert = require('chai').assert;
var TreeNode = require('../../data-structures/tree').TreeNode;

// Given the root of a tree, return the value common to all
// children of the root that occurs furthest from the root.
/**
 * Find the value furthest from the root that occurs in all its children
 * @param  {TreeNode} root The root node
 * @return {Any}           The value of the lowest common ancestor
 */
function lcv(root) {
  var ancestorMaps = [];
  // Build a map of ancestor value to lowest level of the value
  var buildMap = function buildMap(map, node, lvl) {
    if (!node) return;
    map[node.getData()] = Math.max(lvl, map[node.getData()] || 0);
    _.each(node.getChildren(), function(child) {
      buildMap(map, child, lvl + 1);
    });
  };

  _.each(root.getChildren(), function(child) {
    var map = {};
    buildMap(map, child, 0);
    ancestorMaps.push(map);
  });

  if (ancestorMaps.length <= 1) return null;

  // Find the value in both maps with the lowest level
  var maxLevel = 0;
  var maxValue = null;

  var isCommonValue = function(key) {
    return _.reduce(ancestorMaps, function(memo, map) {
      return memo && !!map[key];
    }, true);
  };

  var getLowestInstance = function(key) {
    return _.reduce(ancestorMaps, function(memo, map) {
      return Math.max(memo, map[key]);
    }, -1);
  };

  for (var key in ancestorMaps[0]) {
    if (isCommonValue(key)) {
      var lowestInstance = getLowestInstance(key);
      if (lowestInstance > maxLevel) {
        maxLevel = lowestInstance;
        maxValue = key;
      }
    }
  }
  return maxValue;
}

var tree = new TreeNode();

assert.equal(lcv(tree), null);

//    root
//    /  \
//   1    2
tree.setChild(0, 1);
tree.setChild(1, 2);

assert.equal(lcv(tree), null);

//    root
//    /  \
//   1    1
tree.setChildren([1, 1]);

assert.equal(lcv(tree), null);

//    root
//    /  \
//   1    2
//  / \  / \
//  2  3 3  4
tree.getChild(0).setChild(0, 2);
tree.getChild(0).setChild(1, 3);
tree.getChild(1).setChild(0, 3);
tree.getChild(1).setChild(1, 4);

assert.equal(lcv(tree), 3);

var buildTriple = function(arr) {
  var t = new TreeNode();
  t.setData(arr[0]);
  t.setChild(0, arr[1]);
  t.setChild(1, arr[2]);
  return t;
};

//      root
//     /     \
//    1       2
//   / \     / \
//  2   3   4   5
// / \ / \ / \ / \
// 6 7 8 9 0 5 6 4

var t00 = buildTriple([2, 6, 7]);
var t01 = buildTriple([3, 8, 9]);
var t10 = buildTriple([4, 0, 5]);
var t11 = buildTriple([5, 6, 4]);

tree.getChild(0).setChildNode(0, t00);
tree.getChild(0).setChildNode(1, t01);
tree.getChild(1).setChildNode(0, t10);
tree.getChild(1).setChildNode(1, t11);

assert.equal(lcv(tree), 6);

//      root
//     /     \
//    1       2
//   / \     / \
//  2   3   4   5
// / \ / \ / \ / \
// 6 7 8 9 0 5 6 4
// | | | | | | | |
// 1 1 1 1 1 1 1 1
_.each([0, 1], function(i) {
  _.each([0, 1], function(j) {
    _.each([0, 1], function(k) {
      tree.getChild(i).getChild(j).getChild(k).setChild(0, 1);
    });
  });
});

assert.equal(lcv(tree), 1);
