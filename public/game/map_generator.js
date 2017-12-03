MapGenerator = {
  loadMap: function (tileset, lvldata, game, tileSize) {
    var rows = tileset.split("\n");
    var tiles = [];
    rows.forEach(function (row, row_number) {
      var cells = row.split(";");

      cells.forEach(function (tileData, cell_number) {
        var frame  = tileData.slice(0, 2) - 0;
        var symbol = tileData[2];
        var tileId = tileData.slice(3);

        var special = lvldata.special[tileId];

        var tileConstructor = MapGenerator.constructorFor(symbol);
        if (tileConstructor == undefined) {
          alert("invalid tile: " + tileData);
        }

        var position = {
          x: cell_number * tileSize,
          y: row_number  * tileSize
        };

        var tile = new tileConstructor(position, frame, tileId, special);
        tiles.push(tile);
      });

    });

    return tiles;
  },

  constructorFor: function (symbol) {
    switch (symbol) {
      case 'f':
        return FloorTile;
        break;
      case 'b':
        return BarrierTile;
        break;
      case 'e':
        return EndTile;
        break;
      default:
        alert("invalid symbol found: " + symbol);
        break;
    }
  }
}
