CreatureGenerator = {
  loadCreatures: function (creatureData, tileSize, walkCallback) {
    var creatures = [];
    creatureData.forEach(function (data, index) {
      var constructor = CreatureGenerator.constructorFor(data.type);
      if (constructor == undefined) {
        alert("invalid creature: " + data);
      }

      var position = {
        x: data.position.x,
        y: data.position.y
      };

      var creature = new constructor(position, null, data.direction, walkCallback, data.special);

      creatures.push(creature);
    });

    return creatures;
  },

  constructorFor: function (type) {
    switch (type) {
      case 'mouse':
        return Mouse;
      case 'cat':
        return Cat;
      case 'barrier_tesla':
        return BarrierTesla;
      case 'revolving_tesla':
        return RevolvingTesla;
      default:
        alert("invalid creature found: " + type);
        break;
    }
  }
}
