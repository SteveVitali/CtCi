var _ = require('lodash');

var copyArray = function(arr) {
  return _.map(arr, function(a) { return a; });
};

/**
 * Initialize a Heap
 * O(nlgn) for initial heap size of n
 * @param {Boolean} isMinHeap True for max heap, false o/w
 */
var Heap = function(data, isMinHeap) {
  this.isMinHeap = !!isMinHeap;
  this.data = copyArray(data || []);
  // Now build the heap
  this.build(this.data);
};

Heap.prototype.build = function(data) {
  this.data = copyArray(data);
  for (var j = Math.floor(data.length / 2); j >= 0; j--) {
    this.heapify(j);
  }
};

Heap.prototype.size = function() { return this.data.length; };
Heap.prototype.left = function(i) { return 2 * i; };
Heap.prototype.right = function(i) { return 2 * i + 1; };
Heap.prototype.parent = function(i) { return Math.floor(i / 2); };
Heap.prototype.minimum = function() { return this.data[0]; };
Heap.prototype.maximum = function() { return this.data[this.size() - 1]; };
/**
 * Swap the values at indices i and j
 * O(1)
 * @param  {Number} i First index
 * @param  {Number} j Second index
 */
Heap.prototype.swap = function(i, j) {
  var t = this.data[i];
  this.data[i] = this.data[j];
  this.data[j] = t;
};

/**
 * Minheapify!
 * O(lgn) for heap size n
 * because we multiply by 2 at every iteration
 * @param  {Number} i The index to heapify from
 */
Heap.prototype.heapify = function(i) {
  var size = this.size();
  var l = this.left(i);
  var r = this.right(i);
  var smallest = i;
  if (this.data[l] < this.data[i]) smallest = l;
  if (this.data[r] < this.data[smallest]) smallest = r;
  if (smallest !== i) {
    this.swap(i, smallest);
    this.heapify(smallest);
  }
};

/**
 * Decrease the key of an element at index i
 * @param  {Number} i   The location of the element whose key we decrease
 * @param  {Any}    key The new key of the element
 */
Heap.prototype.decreaseKey = function(i, key) {
  if (key > this.data[i]) throw 'New key > current key';
  this.data[i] = key;
  // Swap the key with its parents while it is less than them
  while (i > 0 && this.data[i] < this.data[this.parent(i)]) {
    this.swap(i, this.parent(i));
    i = this.parent(i);
  }
};

/**
 * Insert a key into the heap by first adding it to the end
 * of the data array and calling decreaseKey on it to percolate it upwards
 * @param  {[type]} key The key to insert
 */
Heap.prototype.insert = function(key) {
  this.data.push(key);
  this.decreaseKey(this.size() - 1, key);
};

/**
 * Extract the minimum value from the heap and heapify
 * O(nlgn) because we call heapify
 * @return {Any} The minimum value
 */
Heap.prototype.extractMin = function() {
  if (this.size() === 0) return null;
  if (this.size() === 1) return this.data.pop();
  var min = this.data[0];
  // Set first elem to last and remove the last
  this.data[0] = this.data.pop();
  this.heapify(0);
  return min;
};

var test = function() {
  var assert = require('chai').assert;
  var heap = new Heap([], true);

  // Test basic operations on singleton constructor heap
  assert.equal(heap.size(), 0);

  heap.build([0]);

  assert.equal(heap.size(), 1);
  assert.equal(heap.extractMin(), 0);
  assert.equal(heap.size(), 0);

  // Test basic operations on singletone inserted heap
  heap.build([]);
  assert.equal(heap.size(), 0);
  heap.insert(0);
  assert.equal(heap.size(), 1);
  assert.equal(heap.extractMin(), 0);
  assert.equal(heap.size(), 0);

  // Test basic operations on heap built with constructor
  var heapData = [5, 1, 3, 4, 8, 9, 2];
  var sortedData = [1, 2, 3, 4, 5, 8, 9];
  heap.build(heapData);

  assert.equal(heap.size(), heapData.length);
  _.each(sortedData, function(val) {
    assert.equal(heap.extractMin(), val);
  });
  assert.equal(heap.size(), 0);

  // Test basic operations on heap built with insertion
  heap.build([]);

  assert.equal(heap.size(), 0);

  _.each(heapData, function(v, i) {
    heap.insert(v);
    assert.equal(heap.size(), i + 1);
  });

  _.each(sortedData, function(v, i) {
    assert.equal(heap.extractMin(), v);
    assert.equal(heap.size(), heapData.length - i - 1);
  });
  assert.equal(heap.size(), 0);
};

module.exports = {
  MinHeap: Heap,
  test: test
};
