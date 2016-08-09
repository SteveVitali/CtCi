export class ListNode {
  constructor(data) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}

export default class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  static build(arr) {
    const list = new SinglyLinkedList();
    arr.map(e => list.add(e));
    return list;
  }

  add(data) {
    if (this.size === 0) {
      this.head = new ListNode(data);
      this.tail = this.head;
    } else {
      const newTail = new ListNode(data);;
      this.tail.next = newTail;
      this.tail = newTail;
    }
    this.size++;
  }

  remove(index) {
    if (this.size === 0 || index >= this.size) return null;
    if (index === 0) {
      var toDelete = this.head;
      this.head = this.head.next;
      this.tail = this.size === 1 ? null : this.tail;
    } else {
      let currNode = this.head;
      // Loop until currNode = node before deletion
      for (let i = 0; i < index - 1; i++) {
        currNode = currNode.next;
      }
      var toDelete = currNode.next;
      currNode.next = toDelete.next;
    }
    this.size--;
    return toDelete.data;
  }

  get(index) {
    if (index < 0 || index >= this.size) return null;

    let currNode = this.head;
    for (let i = 0; i < index; i++) {
      currNode = currNode.next;
    }
    return currNode.data;
  }

  contains(data) {
    let currNode = this.head;
    while (currNode !== null && currNode.data != data) {
      currNode = currNode.next;
    }
    return currNode !== null;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  equals(list) {
    if (list.size !== this.size) return false;
    let myNode = this.head;
    let theirNode = list.head;
    while (myNode !== null) {
      if (myNode.data != theirNode.data) return false;
      myNode = myNode.next;
      theirNode = theirNode.next;
      if (myNode === null && theirNode !== null) return false;
      if (theirNode === null && myNode !== null) return false;
    }
    return true;
  }

  asArray() {
    const arr = [];
    let node = this.head;
    while (node !== null) {
      arr.push(node.data);
      node = node.next;
    }
    return arr;
  }
}

export function test() {
  console.log('Running SinglyLinkedList tests...');

  const assert = require('chai').assert;
  const list = new SinglyLinkedList();
  const buildList = SinglyLinkedList.build;
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
  assert.isTrue(buildList([]).equals(buildList([])));
  assert.isFalse(buildList([]).equals(buildList([1])));
  assert.isTrue(buildList([1]).equals(buildList([1])));
  assert.isFalse(buildList([1]).equals(buildList([2])));
  assert.isTrue(buildList([1, 2, 3, 4]).equals(buildList([1, 2, 3, 4])));
  assert.isFalse(buildList([1, 2, 3, 4]).equals(buildList([1, 2, 4, 3])));
  console.log('Success!');
};
