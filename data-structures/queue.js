var ListNode = function(data) {
  this.next = null;
  this.prev = null;
  this.data = data;
};

export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(val) {
    if (this.size === 0) {
      this.head = new ListNode(val);
      this.tail = this.head;
    } else {
      this.tail.next = new ListNode(val);
      this.tail = this.tail.next;
    }
    this.size++;
  }

  dequeue() {
    if (this.size === 0) return null;
    var data = this.head.data;
    this.head = this.head.next;
    if (this.head === null) this.tail = null;
    this.size--;
    return data;
  }

  peek() {
    return this.head && this.head.data;
  }

  getSize() {
    return this.size;
  }

  toString() {
    let str = 'HEAD:';
    let curr = this.head;
    while (curr !== null) {
      str += curr.data + ',';
      curr = curr.next;
    }
    return str + ':TAIL';
  }

  print() {
    console.log(this.toString());
  }
}

const test = function() {
  const assert = require('chai').assert;
  const q = new Queue();

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

export default Queue;
