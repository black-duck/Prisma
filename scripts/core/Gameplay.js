Gameplay = {


	colors: ['green','blue','red','yellow'],

	speed: 1,

	clock:0,
	
	init: function () {
		
		for (var i=0; i < Player0.area.w; i+=50) {
	
			GenPath.step();
			var nextStep = GenPath.pull();
			GameEngine.batchSpawn(i,nextStep + 25);

		}

	},

	update: function () {
	
		//Spawn Stuff
		if (this.clock >= 50) {
			GenPath.step();
			var nextStep = GenPath.pull();
			GameEngine.batchSpawn(Player0.area.w + 25,nextStep);
			console.log('b');
			this.clock = 0;
		}
		else {
			this.clock++;
		}
		
	},





};
