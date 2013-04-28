//DRAFT - to be modified area start
Player0 = {
    playing: true,
	prisma: null,
	area: { 
		x:0,
		y:0,
		w:0,
		h:0
	}
}


assets = { 
	'background': 'atlas/bg.jpg',
	'Prisma'	: 'atlas/prisma.png', 
    'Surface'   : 'atlas/red.jpg',
}



factory = {};

//DRAFT - to be modified area stop

GameEngine = { 

	ctx: null,
	canvas: null,

	Entities: [],

	init: function (canvas) {
		
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		Player0.prisma = this.spawn('Prisma');
        for (var hi=0; hi <= this.canvas.width / Drawer.xScale; hi=hi+48) {
		this.batchSpawn(hi,[0,0,0,0,0,0,0,0,0,0]);
		}
		this.setLines(10);
		Player0.area.w = this.canvas.width / Drawer.xScale;
		
		//DRAFT
		
		//Drawer.image('atlas/bg');
	},

	setLines: function (lines) {
		var SIZE_OF_LINE = 50;
		var scale;
		Player0.area.h = (lines) * SIZE_OF_LINE;
		
		scale = Math.max([2]);
		Drawer.setScale(scale, scale);						
		GenPath.setLines(lines);	
	},

	draw: function () {

		var ctx = this.ctx;
		
		//DRAFT start
		ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect (0, 0, this.canvas.width, this.canvas.height);
		//DRAFT end
		
		var ent = this.Entities;

		ent.sort(function (a,b) { 
			
			var az=0;
			var bz=0;

			if (a.zIndex == undefined) {
				az = 0;
			}
			else {
				az =  a.zIndex;
			}

			if (b.zIndex == undefined) {
				bz = 0;
			}
			else {
				bz = b.zIndex;
			}
			
			return az - bz; 
		});

		for ( i in ent ) {
			ent[i].draw(ctx);	
		}

	},
	//to do move ai to own class
	aiClock:0,
	
	ai: function () {
		if (this.aiClock > 49) {
			GenPath.step();
			var nextStep = GenPath.pull();
			this.batchSpawn(this.canvas.width / Drawer.xScale,nextStep);
			this.aiClock = 0;
		}
		else {
			this.aiClock+=1;
		}
		
	},
	
	physic: function () {

		var ent = this.Entities;
		for (var i in ent) {
			if (Player0.prisma == ent[i]) 
				continue;
			if (ent[i] === undefined)
				continue;
			if (Math.abs(Player0.prisma.pos.x - ent[i].pos.x) <  Player0.prisma.width/2 + ent[i].width/2 &&			
				Math.abs(Player0.prisma.pos.y - ent[i].pos.y) <  Player0.prisma.height/2 + ent[i].height/2) {
					Player0.prisma.collision(ent[i]);					
					console.log('!');
			}
		}
	},
	update: function () {
		
		this.ai();

		//DRAFT start
		if(InputEngine.actions['go-up']) {
			
				Player0.prisma.moveUp();	
			
		}
		else if(InputEngine.actions['go-down']) {
			
				Player0.prisma.moveDown();
			
		}
		
		if(InputEngine.actions['go-left']) {
			
				Player0.prisma.moveLeft();
			
		}
		else if(InputEngine.actions['go-right']) {
			
				Player0.prisma.moveRight();
			
		}
		
		var ent = this.Entities;
		for (var i=ent.length; i-- ; i) {	
			ent[i].update();   	 
		}

		this.physic();

		//Draft Garbage collector
		//TODO
		for (var i=ent.length; i-- ; i) {	
        	if ( ent[i] &&  ent[i].pos.x < -50 ) {
				ent.splice( i, 1);		
			}
		}

	},

	
	spawn: function (entityName) {
	
		var args = Array.prototype.slice.call(arguments, 1);


		var Temp = function(){}

		var inst, ent;

		Temp.prototype = factory[entityName].prototype;
		inst = new Temp;
		ent = factory[entityName].apply(inst, args); 
		
		this.Entities.push(ent);
		return ent;
	},
	//Drawer.rect(x, y, width, height, color, fillColor);
	batchSpawn: function(x,array) {
		var y=0;
		for (var i=0; i<=array.length; i++ ) {
			
			this.spawn ('Surface',x,y,array[i]); 
			y+=50;
		}
	},

	removeEntity: function(ent) {

		ent._killed = true;
	}

}
