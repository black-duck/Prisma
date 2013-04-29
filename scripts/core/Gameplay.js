Gameplay = {

	colors: ['green','blue','red','yellow','black'],
	colorWeight: [15,25,30,10,20],
	
	colorFriends: { 0:[0,2,4],
					1:[1,4],
					2:[2,3,0],
					3:[3,2],	
					4:[4,0,1]
				},
	colorEnemies: { 0: [1,3],
					1: [0,2,3],
					2: [1,4],
					3: [1,0,4],
					4: [2,3]	
				},
	speed: 1,

	clock:0,
	
	init: function () {
		

		GenPath.friends = this.colorFriends;
		GenPath.enemies = this.colorEnemies;

		for (var i=0; i < Player0.area.w; i+=50) {
	
			GenPath.step();
			var nextStep = GenPath.pull();
			GameEngine.batchSpawn(i,nextStep + 25);

		}
		this.setSpeed(1.2324);

	},

	setSpeed: function (speed) {
		this.speed = speed;
		Player0.prisma.maxSpeed = speed;
	
	},

	update: function () {
	
		//Spawn Stuff
		if (this.clock >= 50 - this.speed) {
			GenPath.step();
			var nextStep = GenPath.pull();
			GameEngine.batchSpawn(Player0.area.w + 25,nextStep);
			this.clock = 0;
		}
		else {
			this.clock+=this.speed;
		}
		
	},

	isFriend: function (a,b) {
		if (this.colorFriends[a].indexOf(b) >= 0) {
			return true;
		}
		return false;
	},

	toColor: function (state) {
		return this.colors[state];
	}

};
