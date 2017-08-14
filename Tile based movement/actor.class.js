
//main character class
class Actor {
	constructor(sight, hearing, stealth) {
		this.sight = sight || 4;
	}

	setCoords(x, y) {
		this.coords = {
			x: x,
			y: y
		}
	}

	changeSight(sight) {
		this.sight = sight;
	}

	move(key) {
		let keyTable = {
			w: {x: 0, y: 1},
			s: {x: 0, y:-1},
			a: {x:-1, y: 0},
			d: {x: 1, y: 0}
		}

		let direction = keyTable[key];

		if (direction) {
			this.coords.x += direction.x;
			this.coords.y += direction.y;
		}
	}
}