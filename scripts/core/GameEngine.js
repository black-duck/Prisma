//DRAFT - to be modified area start
Player0 = {
    playing: true,
	prisma: null,
	area: { 
		x:0,
		y:0,
		w:300,
		h:600
	}
}


assets = { 

	'background': 'atlas/bg.jpg',
	'Prisma'	: 'atlas/prisma.png', 
    'Surface'   : 'atlas/red.png',
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
        
        this.spawn('Surface');
		//DRAFT

		//Drawer.image('atlas/bg');
	},

	draw: function () {

		var ctx = this.ctx;
		
		//DRAFT start
		ctx.drawImage( Loader.load(assets['background']),
						0, 0, 
						this.canvas.width, this.canvas.height);
		//DRAFT end
		
		var ent = this.Entities;

		for ( i in ent ) {
			ent[i].draw(ctx);	
		}

	},
	update: function () {
		

		//DRAFT start
		if(InputEngine.actions['go-up']) {
			
				Player0.prisma.moveUp();	
			
		}
		else if(InputEngine.actions['go-down']) {
			
				Player0.prisma.moveDown();
			
		}
		else if(InputEngine.actions['go-left']) {
			
				Player0.prisma.moveLeft();
			
		}
		else if(InputEngine.actions['go-right']) {
			
				Player0.prisma.moveRight();
			
		}
		
		var ent = this.Entities;	

		for (var i=ent.length; i-- ; i) {
		
				ent[i].update();	
			
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
	

	removeEntity: function(ent) {

		ent._killed = true;
	}

}
