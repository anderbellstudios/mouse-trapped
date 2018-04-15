function route_between(start, goal, graph, neighbourCallback) {
  var closedSet = [];
  var openSet = [start];
  var cameFrom = {};
  var gScore = {};
  var fScore = {};

  for (var i = graph.length - 1; i >= 0; i--) {
    var node = graph[i];
    gScore[ c(node) ] = Infinity;
    fScore[ c(node) ] = Infinity;
  }

  gScore[ c(start) ] = 0;

  fScore[ c(start) ] = heuristic_cost_estimate(start, goal);

  while (openSet.length > 0) {
    var current = openSet.sort(function (a, b) {
      var a_score = fScore[ c(a) ];
      var b_score = fScore[ c(b) ];
      if (a_score < b_score) {
        return -1;
      } else if (b_score < a_score) {
        return 1;
      } else {
        return 0;
      }
    })[0];

    if ( posEqual(current, goal) ) {
      return reconstruct_path(cameFrom, current);
    }

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.push(current);

    neighbours = neighbourCallback(current);

    for (var i = neighbours.length - 1; i >= 0; i--) {
      var neighbour = neighbours[i];

      if ( nodeSetIncludes(closedSet, neighbour) ) {
        continue;
      }

      if ( !nodeSetIncludes(openSet, neighbour) ) {
        openSet.push(neighbour);
      }

      tentative_gScore = gScore[ c(current) ] + 1
      if ( tentative_gScore >= gScore[ c(neighbour) ] ) {
        continue;
      }

      cameFrom[ c(neighbour) ] = current;
      gScore[ c(neighbour) ] = tentative_gScore;
      fScore[ c(neighbour) ] = gScore[ c(neighbour) ] + heuristic_cost_estimate(neighbour, goal);
    }
  }

  return [];
}

function reconstruct_path(cameFrom, current) {
  total_path = [current];
  while (cameFrom[ c(current) ] != undefined) {
    current = cameFrom[ c(current) ];
    total_path.push(current);
  }
  total_path.pop();
  return total_path;
}

function heuristic_cost_estimate(start, goal) {
  return Math.sqrt( (goal.x - start.x)**2 + (goal.y - start.y)**2 );
}

function c(node) {
  return JSON.stringify(node);
}

function nodeSetIncludes(set, node) {
  for (var i = 0, len = set.length; i < len; i++) {
    var candidate = set[i];
    if ( posEqual(candidate, node) ) {
      return true; 
    }
  }
  return false; 
}
