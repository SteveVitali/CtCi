// Implement an algorithm to find the k-th to last element
// of a singly-linked list

import test from '../../test';
import List from '../../data-structures/singly-linked-list';

function kthToLast(list, k) {
  return list.get(list.getSize() - k);
}

const list0 = new List();
const list1 = List.build([1]);
const list5 = List.build([1,2,3,4,5]);

test.test(kthToLast, [
  [[list0, 1], null],
  [[list1, 1], 1],
  [[list1, 2], null],
  [[list5, 1], 5],
  [[list5, 2], 4],
  [[list5, 3], 3],
  [[list5, 5], 1]
].map(test.makeCaseFromArray));
