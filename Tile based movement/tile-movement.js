//In the dark, I stand alone
//I take a step, my path unkown
//my eyes adjust, yet nothing shown 

//now in the dark, I stand alone

$(() => {
	let worldSize = 50

	//initialize the map display
	let display = new WorldDisplay(worldSize);

	//initialize and place the actor;
	let actor = new Actor();
	actor.setCoords(
		parseInt(Math.random() * worldSize),
		parseInt(Math.random() * worldSize)
	);

	//initialize the map data
	let map = new World(worldSize);
	map.addHero(actor);

	//display the map
	map.refresh();
	display.refresh(map.terrain);

	//sight radius
	$('#sight-radius').val(actor.sight);
	$('#sight-radius').on('change', function(e) {
		actor.changeSight(parseInt($(e.target).val()));

		map.refresh();
		display.refresh(map.terrain);
	});

	//movement key events
	$(document).on('keydown', function(keydown) {
		actor.move(keydown.key);

		map.refresh();
		display.refresh(map.terrain);
	});
});