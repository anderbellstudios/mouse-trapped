class Cat extends Creature {
  get image() {
    return 'catImage';
  }

  update(time) {
    super.update(time);

    if (this._lastMoved === undefined) {
      this._lastMoved = time;
    }

    if (time - this._lastMoved > this.data.speed && gameInProgress) {
      this._lastMoved = time;
      this.moveTick(time);
    }
  }

  moveTick(time) {
    var graph = [];
    var sourceI = -1;
    var destinationI = -1;
    var start = this;
    map.forEach(function (tile, index) {
      var position = tile.position; 

      if (posEqual(position, start.position)) {
        sourceI = index;
      }

      if (posEqual(position, player.position)) {
        destinationI = index;
      }

      graph.push( relPosFor(position) );
    });

    var source = graph[sourceI];
    var destination = graph[destinationI];
    var route = route_between( source, destination, graph, function(node) {
      var neighbours = [];
      [ { dx:  0, dy: -1 },
        { dx:  1, dy: -1 },
        { dx:  1, dy:  0 },
        { dx:  1, dy:  1 },
        { dx:  0, dy:  1 },
        { dx: -1, dy:  1 },
        { dx: -1, dy:  0 },
        { dx: -1, dy: -1 } ].forEach(function (d) {
          var relPos = posAdd(node, d);
          var absPos = absPosfor(relPos);
          var occupant = thingAtAbsPos(absPos, map);
          if (occupant != undefined) {
            if (occupant.cattable) {
              neighbours.push(relPos);
            }
          }
        });
      return neighbours;
    });

    var relPos = route.pop();
    if ( relPos ) {
      var absPos = absPosfor(relPos);
      if ( this.walkCallback(this, absPos) ) {
        this.moveTo(absPos);
      }
    }
  }
}
