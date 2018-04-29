MapGenerator = {
  loadMap: function (tileset, lvldata, tileSize) {
    var rows = tileset.replace(/^\s+|\s+$/g, '').split("\n");
    var tiles = [];
    rows.forEach(function (row, row_number) {
      var cells = row.split(";");

      cells.forEach(function (tileData, cell_number) {
        var frame  = tileData.slice(0, 2) - 0;
        var symbol = tileData[2];
        var tileId = tileData.slice(3);
          
        var position = {
          x: cell_number * tileSize,
          y: row_number  * tileSize
        };

        if ( lvldata.sparkle != undefined ) {
          if ( lvldata.sparkle[tileId] != undefined ) {
            SparkleGenerator.build(lvldata.sparkle[tileId], position);
          }
        }

        var special = lvldata.special[tileId];

        var tileConstructor = MapGenerator.constructorFor(symbol);
        if (tileConstructor == undefined) {
          alert("invalid tile: " + tileData);
        }

        var tile = new tileConstructor(position, frame, tileId, special);
        tile.sprite = game.add.sprite(0, 0, tile.image); 
        tile.sprite.width = tileSize;
        tile.sprite.height = tileSize;

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
      case 'r':
        return RotatingBarrierTile;
        break;
      case 'u':
        return ButtonTile;
        break;
      case 't':
        return ToggledBarrierTile;
        break;
      case 'p':
        return PushBarrierTile;
        break;
      case 'e':
        return CheeseTile;
        break;
      case 'h':
        return HoleTile;
        break;
      case 'o':
        return ToggledHoleTile;
      case 'd':
        return EscapeFloorTile;
      case 'w':
        return EscapeHoleTile;
      case 'E':
        return EscapeCheeseTile;
      default:
        alert("invalid symbol found: " + symbol);
        break;
    }
  }
}
