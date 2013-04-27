GenPath = ({

	paths: [],
	map: [[]],
	next: [],
	lookahead: 1,
	DGD: 1,

	init: function() {
		this.map = [[0,0,0,0]]
		this.paths = [0,1,2,3]
	},

	step: function() {
		var newPath;
		var last = this.map[this.map.length - 1];
		
		this.next = new Array(last.length);
		
		for (var i=0; i < this.next.length; i++) {
			this.next[i] = null;
		}
		for (var i=0; i < this.paths.length; i++) {
			
			var move = this.__computePath(this.paths[i]); 
			
			if ( move === false) {
				this.paths.splice(i,1);
			}
			else {
				this.paths[i] == move;
			}
			console.log(this.next);	
		}
			
		for (var i=0; i < this.next.length; i++) {
			
			if (this.next[i] == null) {
				this.next[i] = 1;
			}
		}
		this.map.push(this.next);
		
	},

	__computePath: function (path) {

		var moveTo;
		var last = this.map[this.map.length - 1];
		

		//find possible Possition
		var possiblePos = [];
		var posCost = [];
		for (var p=0, i=0; i < last.length; i++) {
			
			if ( last[path] === null || 
				this._canTransition(last[path],last[i])) {
				possiblePos[p] = i;		
				posCost[p] = Math.pow(Math.E, Math.abs(i-path)) + 1;
				p++;
			}
		}
		console.log(posCost);	
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
		console.log("Move to:" + moveTo);
		
		//Can I merge?
		if ( moveTo != path && this.paths.indexOf() > 0 ) {
			//yes
			return false; //remove path
			console.log("merge");
		}
		else {
			//TODO
			this.next[moveTo] = last[path];
			return moveTo;
		
		}

	},

	_canTransition: function(a,b) {
		if (a==b) {
			return true;
		}
		else {
			return false;
		}
		
	}


});
