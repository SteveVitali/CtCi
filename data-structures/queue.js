var ListNode = function(data) {
  this.next = null;
  this.prev = null;
  this.data = data;
};

var Queue = function() {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

Queue.prototype.enqueue = function(val) {
  if (this.size === 0) {
    this.head = new ListNode(val);
    this.tail = this.head;
  } else {
    this.tail.next = new ListNode(val);
    this.tail = this.tail.next;
  }
  this.size++;
};

Queue.prototype.dequeue = function() {
  if (this.size === 0) return null;
  var data = this.head.data;
  this.head = this.head.next;
  if (this.head === null) this.tail = null;
  this.size--;
  return data;
};

Queue.prototype.peek = function() {
  return this.head && this.head.data;
};

Queue.prototype.getSize = function() {
  return this.size;
};

var test = function() {
  var assert = require('chai').assert;
  var q = new Queue();

  assert.equal(0, q.getSize());

  q.enqueue(1);

  assert.equal(1, q.getSize());
  assert.equal(1, q.peek());
  assert.equal(1, q.dequeue());
  assert.equal(0, q.getSize());

  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  q.enqueue(4);
  q.enqueue(5);

  assert.equal(5, q.getSize());
  assert.equal(1, q.peek());
  assert.equal(1, q.dequeue());
  assert.equal(2, q.dequeue());
  assert.equal(3, q.getSize());
  assert.equal(3, q.dequeue());
  assert.equal(4, q.dequeue());
  assert.equal(1, q.getSize());
  assert.equal(5, q.peek());
  assert.equal(5, q.dequeue());
  assert.equal(0, q.getSize());
};

module.exports = {
  Queue: Queue,
  test: test
};
