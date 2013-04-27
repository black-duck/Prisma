GenPath = ({

	maxNumPaths: 5,
	paths: [],
	map: [[]],
	next: [],
	lookahead: 1,
	DGD: 1,

	init: function() {
		this.map = [[0,0,0,0,0]];
		this.paths = [0,1,2,3,4];
		this.maxNumPaths = this.paths.length;
	},

	step: function() {
		var newPath;
		var last = this.map[this.map.length - 1];
		var gc = [];
		this.next = new Array(last.length);
		
		for (var i=0; i < this.next.length; i++) {
			this.next[i] = null;
		}

		for (var i=0; i < this.paths.length; i++) {
			

			if (this.paths[i] == null) {
				continue;
			}

			console.log(i + ':' + this.paths[i]);
			
			var move = this.__computePath(this.paths[i]); 
			
			if ( move === false) {
				this.paths[i] = null;
			}
			else {
				if (move != this.paths[i]) console.log('move to: ['+i+'] ' + move );
				this.paths[i] = move;
			}
			console.log(this.next);	
		}
			
		for (var i=0; i < this.next.length; i++) {
			
			if (last[i] == null ) {
				last[i] = 1;
			}
		}
		
		this.map.push(this.next);

		//gc time
		//for (var i=0; i < this.paths.length; i++) {
		//	if (this.paths[i] === null ) {
		//		this.paths.slice(i,1);
		//	}
	//	}
		console.log(this.map);

	},

	__computePath: function (path) {

		var moveTo;
		var last = this.map[this.map.length - 1];
		

		//find possible Possition
		var possiblePos = [];
		var posCost = [];
		for (var p=0, i=0; i < last.length; i++) {
			
			if (last[i] == null || 
				this._canTransition(last[path],last[i])) {
				possiblePos[p] = i;		
				posCost[p] = Math.pow(Math.E, -Math.abs(i-path));
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
		//for (var i=0; i < this.maxNumPaths; i++) {
		//	rand = Math.random();
		//	if (rand < (this.paths.length-this.maxNumPaths)/this.maxNumPaths - 0.3) {
		//		console.log('fork');
		//		this.paths.push(path);
		//	}
		//}
		console.log(path + " Move to:" + moveTo);
		
			
		if (path < moveTo) {
			for (var i=path; i <= moveTo; i++) {
				last[i] = last[path]; //create vertical path
	//			this.next[i] = 1; //set wall 
			}			
		}
		else if (path > moveTo) {
			for (var i=path; i >= moveTo; i--) {
				last[i] = last[path]; //create vertical path
		//		if ( last[i] === null ) {
	//				this.next[i] = 1;
		//		}
			}				
		}

		//Can I merge?
		if (moveTo != path && this.paths.indexOf(moveTo) > 0 ) {
			//yes
			console.log('Merge');
			return false; //remove path
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
