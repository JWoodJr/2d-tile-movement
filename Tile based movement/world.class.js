
//world map data
class World {
	constructor(worldSize) {
		this.size = worldSize || 100;

		this.hero = null;
		this.villains = [];
	}

	addHero(actor) {
		this.hero = actor;
	}

	initializeTerrain() {
		this.terrain = {};

		for (var y=this.size-1; y>=0; y--) {
			this.terrain[y] = {};

			for (var x=0; x<this.size; x++) {
				this.terrain[y][x] = {
					dark: true,
					actor: null,
					gradient: null
				}
			}
		}
	}

	revealTiles() {
		if (!this.hero) {
			return;
		}

		let max = this.hero.sight;
		let actorX = this.hero.coords.x;
		let actorY = this.hero.coords.y;

		_.range(-max, max+1).forEach((xOffset) => {
			let adjX = actorX + parseInt(xOffset);

			_.range(-max, max+1).forEach((yOffset) => {
				let adjY = actorY + parseInt(yOffset);
				let distance = Math.abs(xOffset) + Math.abs(yOffset);
				
				//fuzzy calculations to make sure we're not looking at a perfect diamond or square
				if (distance/2 <= Math.round(max/2 + max/5)) {

					if (this.terrain[adjY] && this.terrain[adjY][adjX]) {
						this.terrain[adjY][adjX].dark = false;

						//determine the direction of the gradients in degrees
					  if (distance/2 >= Math.round(max/2 + max/5)) {
						 	this.terrain[adjY][adjX].gradient = (xOffset > 0 ? -1 : 1) * (90 + (yOffset * (90/max)))
						}
					}
				}
			});
		});
	}

	placeActor(actor) {
		this.terrain[actor.coords.y][actor.coords.x] = {
			dark: false,
			actor: actor
		}
	}

	refresh() {
		this.initializeTerrain();
		this.placeActor(this.hero);
		this.revealTiles();
	}
}