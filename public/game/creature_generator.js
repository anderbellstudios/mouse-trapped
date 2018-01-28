CreatureGenerator = {
  loadCreatures: function (creatureData, tileSize, walkCallback) {
    var creatures = [];
    creatureData.forEach(function (data, index) {
      var constructor = CreatureGenerator.constructorFor(data.type);
      if (constructor == undefined) {
        alert("invalid creature: " + data);
      }

      var position = {
        x: data.position.x * tileSize,
        y: data.position.y * tileSize
      };

      var creature = new constructor(position, null, data.direction, walkCallback, data.special);
      creature.sprite = game.add.sprite(0, 0, creature.image); 
      creature.sprite.width = tileSize;
      creature.sprite.height = tileSize;

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
      default:
        alert("invalid creature found: " + type);
        break;
    }
  }
}
