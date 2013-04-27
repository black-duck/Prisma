//DRAFT - to be modified area start
Player0 = {
    playing: true,
	turret: null
}


assets = { 
	'background': 'atlas/bg.jpg',
	'prisma'	: 'atlas/prisma.png',
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
		
    /*
        
		for (var i=ent.length; i-- ; i) {
		
			if (ent[i]._killed === true) {
				dead.push(i);
			} 
			else {
				ent[i].update();	
			}
		}

		for (var i=0; i < dead.length; i++) {
			
			if (ent[dead[i]].physBody) {
				PhysicsEngine.removeBodyAsObj(ent[dead[i]].physBody);			
			}
			ent.splice(dead[i], 1);

		}
      */  

	},

	
	spawn: function (entityName) {
	
		var args = Array.prototype.slice.call(arguments, 1);

		var Temp = function() {}
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
