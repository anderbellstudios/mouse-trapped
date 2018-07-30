function thingAtPos(pos, set) {
  var it = undefined;
  set.forEach(function (thing, index) {
    target = thing.position;
    if (posEqual(target, pos)) {
      it = thing;
    }
  });
  return it;
}

function relPosFor(absPos) {
  return { x: (absPos.x / tileSize), y: (absPos.y / tileSize) };
}

function absPosfor(relPos) {
  return { x: (relPos.x * tileSize), y: (relPos.y * tileSize) };
}

function posEqual(a, b) {
  return a.x == b.x && a.y == b.y;
}

function posAdd(pos, delta) {
  return { x: pos.x + delta.dx, y: pos.y + delta.dy };
}

function distanceBetween(pos_a, pos_b) {
  return Math.sqrt( Math.pow(pos_a.x - pos_b.x, 2) + Math.pow(pos_a.y - pos_b.y, 2) );
}

function angleBetween(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}
