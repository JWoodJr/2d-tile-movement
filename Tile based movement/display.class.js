
//class representing the display
class WorldDisplay {
	constructor(worldSize) {
		this.worldSize = worldSize || 10;
		this.initialize();
	}

	initialize() {
		let terrain = $('#world-terrain');
		terrain.html('');

		for(var y=this.worldSize-1; y>=0; y--) {
			let terX = $('<tr class="y-'+y+'"></tr>');
			for (var x=0; x<this.worldSize; x++)	{
				terX.append($(`<td class="y-${y} x-${x} tile fogged"></td>`));
			}

			terrain.append(terX);
		};
	}

	refresh(map) {
		let worldTerrain = $('#world-terrain');

		_.forEach(worldTerrain.children(), (yCoords, yIndex) => {
			let y = this.worldSize - yIndex - 1; // invert y for graph simplification

			_.forEach($(yCoords).children(), (xVal, x) => {
				let terrain = $(xVal);
				let tile = map[y][x];

				let fogged = tile.dark ? 'fogged' : '';
				let actor = tile.actor ? 'actor' : '';

				terrain.attr('class', `tile y-${y} x-${x} ${fogged} ${actor}`);
				terrain.css('background', '');

				if (tile.gradient !== null) {
					terrain.css('background', `linear-gradient(${tile.gradient}deg, black, white)`)
				}
			});
		});
	}
}