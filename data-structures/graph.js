var _ = require('lodash');
var Stack = require('./stack').Stack;

var Graph = function() {
  // Map vertex id's to vertex data
  // e.g. this.nodes[id] = {
  //   edges: {
  //     <toId>: <edge data>,
  //     ...
  //   },
  //   <other data>,
  //   ...
  // }
  this.nodes = {};
};

/**
 * Add a node to the Graph
 * @param {String} id   The node Id
 * @param {Object} data Arbitrary data associated with the node
 */
Graph.prototype.addNode = function(id, data) {
  this.nodes[id] = _.extend(data || {}, { edges: {} });
};

/**
 * Determine whether there is a node with this id in the graph
 * @param  {String}  id The node we want to find
 * @return {Boolean}    Whether the node is in the graph
 */
Graph.prototype.hasNode = function(id) {
  return !!this.nodes[id];
};

/**
 * Remove a node from the graph
 * @param {String} id   The Id of the node to delete
 */
Graph.prototype.removeNode = function(id) {
  delete this.nodes[id];
  for (var nodeId in this.nodes) {
    if (this.nodes[nodeId].edges[id]) {
      delete this.nodes[nodeId].edges[id];
    }
  }
};

/**
 * Add an edge to the Graph
 * @param {String} from   The Id of the from node
 * @param {String} to     The Id of the to node
 * @return {Boolean}      Whether the addition was successful
 */
Graph.prototype.addEdge = function(from, to, data) {
  return this.nodes[from]
      && this.nodes[to]
      && !!(this.nodes[from].edges[to] = data || {});
};

// Same as addEdge
Graph.prototype.updateEdge = function(from, to, data) {
  this.addEdge(from, to, data);
};

/**
 * Delete an edge in the graph
 * @param {String} from   The Id of the from node
 * @param {String} to     The Id of the to node
 */
Graph.prototype.deleteEdge = function(from, to) {
  if (!thid.nodes[fromId] || !this.nodes[toId]) return;
  delete this.nodes[fromId].edges[toId];
};

/**
 * Determine whether there is a particular edge in the graph
 * @param  {String}  from The from node id
 * @param  {String}  to   The to node id
 * @return {Boolean}    Whether the edge is in the graph
 */
Graph.prototype.hasEdge = function(from, to) {
  return !!(
    this.nodes[from] &&
    this.nodes[to] &&
    this.nodes[from].edges[to]
  );
};

/**
 * Get the neighborhood of a node
 * @param  {String} nodeId The node whose neighborhood we want
 * @return {Object}        Map of neighbor ids to edge data
 */
Graph.prototype.getNeighbors = function(nodeId) {
  if (!this.nodes[nodeId]) {
    throw 'Error: invalid node Id';
  }
  return this.nodes[nodeId].edges || {};
};

/**
 * Find all weakly connected components of size k or larger
 * @param  {Number} k   The minimum size of a connected component
 * @return {String[][]} An array of arrays of node ids
 */
Graph.prototype.getWeaklyConnectedComponents = function(k) {
  var lowerLimit = k || 1;
  var components = [];
  var stack = new Stack();
  var discovered = {};

  for (var id in this.nodes) {
    var component = [];
    stack.push(id);

    while (stack.getSize() > 0) {
      var nodeId = stack.pop();
      if (!discovered[nodeId]) {
        discovered[nodeId] = true;
        component.push(nodeId);
        for (var neighborId in this.getNeighbors(nodeId)) {
          stack.push(neighborId);
        }
      }
    }
    if (component.length >= lowerLimit) {
      components.push(component);
    }
  }
  return components;
};

var test = function() {
  var assert = require('chai').assert;
  var graph = new Graph();
  graph.addNode('1');
  graph.addNode('2');
  graph.addNode('3');

  assert.equal(graph.getWeaklyConnectedComponents().length, 3);
  assert.equal(graph.getWeaklyConnectedComponents(2).length, 0);

  assert.isTrue(graph.hasNode('1'));
  assert.isTrue(graph.hasNode('2'));
  assert.isTrue(graph.hasNode('3'));

  graph.addEdge('1', '2');

  assert.isTrue(graph.hasEdge('1', '2'));
  assert.isFalse(graph.hasEdge('2', '1'));

  graph.addEdge('2', '1');

  assert.isTrue(graph.hasEdge('2', '1'));
  assert.equal(graph.getWeaklyConnectedComponents().length, 2);
  assert.equal(graph.getWeaklyConnectedComponents(2).length, 1);

  graph.addEdge('1', '3');

  assert.equal(graph.getWeaklyConnectedComponents().length, 1);
  assert.equal(graph.getWeaklyConnectedComponents(4).length, 0);

  graph.removeNode('1');

  assert.isFalse(graph.hasNode('1'));
  assert.isFalse(graph.hasEdge('1', '2'));
  assert.isFalse(graph.hasEdge('2', '1'));
  assert.equal(graph.getWeaklyConnectedComponents().length, 2);
};

module.exports = {
  Graph: Graph,
  test: test
};
