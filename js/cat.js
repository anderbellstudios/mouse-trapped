class Cat extends Creature {
  get image() {
    return 'catImage';
  }

  postDie(next_level, message) {
    Audio.playSound('cat_died', this.position);
  }

  update(time) {
    if (this.is_dead) {
      return;
    }

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

      graph.push(position);
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
          var occupant = thingAtPos(relPos, things);
          if (occupant != undefined) {
            if (occupant.cattable(time)) {
              neighbours.push(relPos);
            }
          }
        });
      return neighbours;
    });

    var relPos = route.pop();
    if ( relPos ) {
      if ( this.walkCallback(this, relPos) ) {
        this.moveTo(relPos);
      }
    }
  }
}

