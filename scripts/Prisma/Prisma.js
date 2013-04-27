factory['Prisma'] = Class.extend({ 

	_killed: false,

	width: 60,
	height: 60,
	
	pos: {
		x: 100,
		y: 100
	},
	
	speed: 0,
	maxSpeed: 10,
	
	img: assets['Prisma'],

	init: function( x, y) {
	
		x = this.pos.x;
		y = this.pos.y;
			
	},

    update: function() {
		
		var w = 600;//GameEngine.canvas.height;
		
		this.pos.y += this.speed;
		
		if (this.pos.y < 0 +this.height/2) {
			
			this.pos.y = 0 +this.height/2;
		}
		//to do DRAFT
		if (this.pos.y > w-this.height/2) {
			
			this.pos.y = w-this.height/2;
		}
		
		this.speed = 0;
		
	},

	draw: function (ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y , this.width , this.height);
	},	
	
	moveUp: function () {
			this.speed = -this.maxSpeed;
	},
	
	moveDown:function () {
			this.speed = this.maxSpeed;
	},
	
	
});
