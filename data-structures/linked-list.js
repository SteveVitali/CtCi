var assert = require('chai').assert;
 var _ = require('lodash');
/**
 * Initialize a ListNode with data
 * @param {Any} data The ListNode data
 */
var ListNode = function(data) {
  this.next = null;
  this.data = data;
};

/**
 * Initialize a LinkedList with no data
 */
var LinkedList = function(data) {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

LinkedList.prototype.add = function(data) {
  if (this.size === 0) {
    this.head = new ListNode(data);
    this.tail = this.head;
  } else {
    var newTail = new ListNode(data);;
    this.tail.next = newTail;
    this.tail = newTail;
  }
  this.size++;
};

LinkedList.prototype.remove = function(index) {
  if (this.size === 0 || index >= this.size) return null;
  if (index === 0) {
    var toDelete = this.head;
    this.head = this.head.next;
    this.tail = this.size === 1 ? null : this.tail;
  } else {
    var currNode = this.head;
    // Loop until currNode = node before deletion
    for (var i = 0; i < index - 1; i++) {
      currNode = currNode.next;
    }
    var toDelete = currNode.next;
    currNode.next = toDelete.next;
  }
  this.size--;
  return toDelete.data;
};

LinkedList.prototype.get = function(index) {
  if (index < 0 || index >= this.size) return null;

  var currNode = this.head;
  for (var i = 0; i < index; i++) {
    currNode = currNode.next;
  }
  return currNode.data;
};

LinkedList.prototype.contains = function(data) {
  var currNode = this.head;
  while (currNode !== null && currNode.data != data) {
    currNode = currNode.next;
  }
  return currNode !== null;
};

LinkedList.prototype.getSize = function() {
  return this.size;
};

LinkedList.prototype.getHead = function() {
  return this.head;
};

LinkedList.prototype.listEquals = function(list) {
  if (list.size !== this.size) return false;
  var myNode = this.head;
  var theirNode = list.head;
  while (myNode !== null) {
    if (myNode.data != theirNode.data) return false;
    myNode = myNode.next;
    theirNode = theirNode.next;
    if (myNode === null && theirNode !== null) return false;
    if (theirNode === null && myNode !== null) return false;
  }
  return true;
};

LinkedList.prototype.toArray = function() {
  var arr = [];
  var node = this.head;
  while (node !== null) {
    arr.push(node.data);
    node = node.next;
  }
  return arr;
};

var buildList = function(arr) {
  var list = new LinkedList();
  _.each(arr, function(elem) {
    list.add(elem);
  });
  return list;
};

var test = function() {
  var list = new LinkedList();
  assert.equal(0, list.getSize());
  assert.isFalse(list.contains(1));

  list.add(1);
  list.add(2);

  // [1, 2]
  assert.equal(2, list.getSize());
  assert.equal(1, list.get(0));
  assert.equal(2, list.get(1));
  assert.isTrue(list.contains(1));
  assert.isTrue(list.contains(2));

  list.add(3);
  list.add(4);

  // [1, 2, 3, 4]
  assert.equal(list.remove(1), 2);

  // [1, 3, 4]
  assert.equal(3, list.getSize());
  assert.equal(list.get(0), 1);
  assert.equal(list.get(1), 3);
  assert.equal(list.get(2), 4);
  assert.isTrue(list.contains(1));
  assert.isTrue(list.contains(3));
  assert.isTrue(list.contains(4));
  assert.isFalse(list.contains(2));
  assert.isFalse(list.contains(5));

  assert.equal(list.remove(0), 1);

  // [3, 4]
  assert.equal(list.get(0), 3);
  assert.equal(list.get(1), 4);
  assert.equal(list.remove(1), 4);

  // [3]
  assert.equal(list.remove(0), 3);
  assert.isFalse(list.contains(3));

  // []
  assert.equal(list.remove(0), null);
  assert.equal(0, list.getSize());
  assert.isFalse(list.contains(3));

  // Test listEquals
  assert.isTrue(buildList([]).listEquals(buildList([])));
  assert.isFalse(buildList([]).listEquals(buildList([1])));
  assert.isTrue(buildList([1]).listEquals(buildList([1])));
  assert.isFalse(buildList([1]).listEquals(buildList([2])));
  assert.isTrue(buildList([1, 2, 3, 4]).listEquals(buildList([1, 2, 3, 4])));
  assert.isFalse(buildList([1, 2, 3, 4]).listEquals(buildList([1, 2, 4, 3])));
};

module.exports = {
  LinkedList: LinkedList,
  ListNode: ListNode,
  buildList: buildList,
  test: test
};
