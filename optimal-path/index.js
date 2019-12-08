'use strict'
let graph = {};
let travel = {};
let countReturn = 1;
let countSave = 0;
let pathSeparator = '->';
let printGraph = function () {
  console.log('Graph:');
  Object.keys(graph).some(function (key) {
    console.log(key + ' {');
    console.log('    weight: ' + graph[key].weight);
    console.log('    edges: [' + graph[key].edges.join(', ') + ']');
    console.log('}');
  });
}
/**
 * Make sure all string is formatted
 * @param  {[string]} str
 * @return {[string]} string formatted
 */
let formatInput = function (str) {
  return str ? str.replace(/ /g, '').trim().toUpperCase() : null;
}
/**
 * Create graph
 * @param  {[array]} vertices All nodes
 * @param  {[array]} edges All path that nodes can travel
 * @return {[graph]}
 */
let initGraph = function (vertices, edges) {
  let weight, nodeName, edgeArray, fromNode, toNode;
  if (!Array.isArray(vertices)) {
    throw `vertices should be an array`;
  } else {
    vertices.some(function (node) {
      node = formatInput(node);
      weight = parseInt(node.replace( /[A-Za-z]/g, ''), 10); // replace all leading non-digits with nothing
      nodeName = node.replace( /[0-9]/g, ''); // replace all leading digits with nothing
      if (isNaN(weight) || weight < 0) {
        throw `weight is invalid`;
      }
      if (!nodeName) {
        throw `Node name is invalid`;
      }
      graph[nodeName] = {
        weight: weight,
        edges: []
      };
    });
  }
  if (Array.isArray(edges)) {
    edges.some(function (edge) {
      edge = formatInput(edge);
      edgeArray = edge.split(pathSeparator);
      if (Array.isArray(edgeArray) && edgeArray.length > 1) {
        fromNode = edgeArray[0];
        toNode = edgeArray[1];
      }
      if (graph[fromNode]) {
        graph[fromNode].edges.push(toNode);
      }
    });
  }
};
/**
 * Save path that node have already finished travel
 * @param  {[string]} fullPath
 * @param  {[integer]} sumPath
 * @param  {[Promise]} resolve
 * @return {[null]}
 */
let savePath = function (fullPath, sumPath, resolve) {
  countSave++;
  travel[fullPath] = sumPath;
  if (countSave === countReturn) {
    console.log('paths:', travel);
    resolve(Math.max(...Object.values(travel)));
  }
}
/**
 * Queue travel path
 * @param  {[string]} fromVertex Origin vertex
 * @param  {[array]} toVertexs  array of paths that node can travel to
 * @param  {[string]} fullPath
 * @param  {[integer]} sumPath
 * @param  {[Promise]} resolve
 */
let travelPath = function (fromVertex, toVertexs, fullPath, sumPath, resolve) {
  fromVertex = formatInput(fromVertex);
  if (Array.isArray(toVertexs)) {
    if (toVertexs.length > 0) {
      countReturn = countReturn + (toVertexs.length - 1);
      toVertexs.some(function (toVertex) {
        // check toVertex already visited, avoid infinite loop caused by cycles
        if (fullPath.split(pathSeparator).includes(toVertex)) {
          savePath(fullPath, sumPath, resolve);
        } else {
          travelPath(toVertex, graph[toVertex].edges, fullPath + pathSeparator + toVertex, sumPath + graph[toVertex].weight, resolve);
        }
      });
    } else {
      savePath(fullPath, sumPath, resolve);
    }
  }
};
/**
 * Function init find optimal path
 * @param  {[array]} vertices All nodes
 * @param  {[array]} edges All path that nodes can travel
 * @param  {[string]} vertex  origin node name
 * @return {[Promise]} promise
 */
let findOptimalPath = function (vertices, edges, vertex) {
  let promise = new Promise(function(resolve, reject) {
    initGraph(vertices, edges);
    printGraph();
    travelPath(vertex, graph[vertex].edges, vertex, graph[vertex].weight, resolve);
  });
  return promise;
};
findOptimalPath(['A1', 'B2', 'C2'], ['A->B', 'B->C', 'A->C'], 'A').then(function (sum) {
  console.log('Sum:', sum);
});
// findOptimalPath(['A5', 'B10', 'C3', 'D23', 'E3', 'F9'], ['A->B', 'B->C', 'C->E', 'B->E', 'D->B', 'E->D', 'E->F'], 'D').then(function (sum) {
//   console.log(sum);
// });
