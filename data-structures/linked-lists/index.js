/**
 * Initialize a ListNode with data
 * @param {Any} data The ListNode data
 */
var ListNode = function(data) {
  this.next = null;
  this.data = data;
};

module.exports = {
  ListNode: ListNode,
  SinglyLinkedList: require('./singly-linked-list'),
  DoublyLinkedList: require('./doubly-linked-list')
};
