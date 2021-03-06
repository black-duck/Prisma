GenPath = ({

	maxNumPaths: 5,
	paths: [],
	map: [[]],
	next: [],
	lookahead: 1,
	DGD: 1,
	mapHead:0,
	lines: 0,

	friends: {
			 0:[0,2],	
			 1:[1],
			 2:[2,3,0],
			 3:[3,2]			 	
			},
	enemies: { 0:[1,3],
			   1:[0,2,3],
		       2:[1],
               3:[1,0]
			},

	init: function() {
		this.map = [[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0]];
		
		this.lines = this.map[0].length;
		this.paths = [0,1,2,3,4,6,7];		
		this.maxNumPaths = this.paths.length;
	},

	setLines: function (lines) {
		this.lines = lines;
	},

	pull: function() {
		return this.map.shift();
	},

	step: function() {
		var newPath;
		var last = this.map[this.map.length - 1];
		var last2 = this.map[this.map.length - 2];
		var gc = [];
		this.next = new Array(this.lines);
		
		for (var i=0; i < this.next.length; i++) {
			this.next[i] = null;
		}

		for (var i=0; i < this.paths.length; i++) {
			

			if (this.paths[i] == null) {
				continue;
			}

			
			var move = this.__computePath(this.paths[i]); 
			
			if ( move === false) {
				this.paths[i] = null;
			}
			else {
				this.paths[i] = move;
			}
		}
			
		for (var i=0; i < last.length; i++) {
			
			if (last[i] == null && last2[i] !==undefined ) {
				
				if ( last2[i] == undefined ) {
					last[i] == Math.floor(Math.random()*4);//Draft
				}
				else {
					//Pick opposite color
					var enemyColors = this.enemies[last2[i]];				
					var opColor = enemyColors[Math.floor(Math.random()*enemyColors.length)];
					last[i] = opColor;

				}
			}
		}
		
		this.map.push(this.next);

		//gc time
		for (var i=0; i < this.paths.length; i++) {
			if (this.paths[i] === null ) {
				this.paths.slice(i,1);
			}
		}

	},

	__computePath: function (path) {

		var moveTo;
		var last = this.map[this.map.length - 1];
		var color = last[path];	

		//find possible Possition
		var possiblePos = [];
		var posCost = [];
		for (var p=0, i=0; i < last.length; i++) {
			
			if (last[i] == null || 
				this._canTransition(last[path],last[i])) {
				possiblePos[p] = i;		
				posCost[p] = Math.pow(Math.E, -Math.abs(i-path));
				if ( i == path )
					posCost[p] /= 2;
				//if symetrical don't exist give me a second change
				var sym = 2*path - p;
				if ( sym > 0 || sym < this.paths.lenght) {
					posCost[p] *= 2;
				}

				p++;
			}
		}

		//Normalize postCost
		var sum = 0;
		for (var i=0; i < posCost.length; i++) {
			sum += posCost[i];
		}
		for (var i=0; i < posCost.length; i++) {
			posCost[i] = posCost[i] / sum;
		}

		//Move to random
		var rand = Math.random();
		var r = 0;
		for (var i=0; i < posCost.length; i++) {
			r += posCost[i];
			if (rand < r) { 
				moveTo = possiblePos[i];
				break;
			}
		}
		//forks
		rand = Math.random();
		if (rand < 0.15) {
			this.paths.push(path);
		}
		
		//Should I change color ?
		rand = Math.random();
		if (rand < 0.2) {
			var posColors = this.friends[color];
			color = posColors[Math.floor(Math.random()*posColors.length)];
		}
		
		//Pick opposite color
		var enemyColors = this.enemies[color];
		var opColor = enemyColors[Math.floor(Math.random()*enemyColors.length)];
		
		if (this.next[i] === null )
			this.next[i] = opColor;
	
		if (path < moveTo) {
			for (var i=path+1; i <= moveTo; i++) {
				last[i] = color; //create vertical path
				
				if (this.next[i] === null )
					this.next[i] = opColor; //set wall 
			}			
		}
		else if (path > moveTo) {
			for (var i=path-1; i >= moveTo; i--) {
				last[i] = color; //create vertical path

				if (this.next[i] === null )
					this.next[i] = opColor; //set wall 
			}			
							
		}

		//Can I merge?
		if (moveTo != path && this.paths.indexOf(moveTo) > 0 ) {
			//yes
			return false; //remove path
		}
		else {

			//TODO
			this.next[moveTo] = last[path];
			return moveTo;
		
		}

	},

	_canTransition: function(a,b) {
		if (this.friends[a].indexOf(b) >= 0) {
			return true;
		}
		else {
			return false;
		}
		
	}


});
GenPath.init();
