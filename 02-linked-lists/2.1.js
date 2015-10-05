var List = require('../data-structures/linked-list').LinkedList;
var buildList = require('../data-structures/linked-list').buildList;
var test = require('../test');

// 2.1: Write code to remove duplicates from an unsorted linked list
var removeDuplicates = function(list) {
  var newList = new List();
  var node = list.head;
  while (node !== null) {
    if (!newList.contains(node.data)) {
      newList.add(node.data);
    }
    node = node.next;
  }
  return newList;
};

var testRemoveDuplicates = function(hasDupsArray, hasNoDupsArray) {
  var hasDupsList = buildList(hasDupsArray);
  var expectedNoDupsList = buildList(hasNoDupsArray);
  return removeDuplicates(hasDupsList).listEquals(expectedNoDupsList);
};

test.test(testRemoveDuplicates, [
    [[[], []], true],
    [[[1, 2], [1, 2]], true],
    [[[1, 1], [1]], true],
    [[[1, 1, 1, 2], [1, 2]], true],
    [[[1, 1, 2, 2, 3, 3, 3, 4], [1, 2, 3, 4]], true]
  ].map(test.makeCaseFromArray)
);
