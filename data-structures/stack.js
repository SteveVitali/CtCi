var ListNode = function(data) {
  this.next = null;
  this.prev = null;
  this.data = data;
};

var Stack = function() {
  this.head = null;
  this.size = 0;
};

Stack.prototype.pop = function() {
  if (this.size === 0) return null;
  var data = this.head.data;
  if (this.size === 1) {
    this.head = null;
  } else {
    this.head = this.head.next;
  }
  this.size--;
  return data;
};

Stack.prototype.push = function(val) {
  if (this.size === 0) {
    this.head = new ListNode(val);
  } else {
    var oldHead = this.head;
    this.head = new ListNode(val);
    this.head.next = oldHead;
  }
  this.size++;
};

Stack.prototype.peek = function() {
  return this.size > 0 ? this.head.data : null;
};

Stack.prototype.getSize = function() {
  return this.size;
};

Stack.prototype.toArray = function() {
  var arr = [];
  while (this.getSize() > 0) {
    arr.push(this.pop());
  }
  for (var i = arr.length - 1; i >= 0; i--) {
    this.push(arr[i]);
  }
  return arr;
};

var test = function() {
  var assert = require('chai').assert;
  var stack = new Stack();
  assert.equal(0, stack.getSize());

  stack.push(1);

  assert.equal(1, stack.peek());
  assert.equal(1, stack.pop());
  assert.equal(0, stack.getSize());

  stack.push(2);
  stack.push(3);
  stack.push(4);
  stack.push(5);

  assert.equal(4, stack.toArray()[1]);
  assert.equal(4, stack.getSize());
  assert.equal(5, stack.pop());
  assert.equal(3, stack.getSize());

  stack.push(6);

  assert.equal(6, stack.pop());
  assert.equal(4, stack.peek());
  assert.equal(4, stack.pop());
  assert.equal(3, stack.pop());
  assert.equal(2, stack.pop());
  assert.isNull(stack.pop());
  assert.isNull(stack.peek());
  assert.equal(0, stack.getSize());
};
test();

module.exports = {
  Stack: Stack,
  test: test
};
