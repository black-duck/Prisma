factory['Prisma'] = Class.extend({ 

	_killed: false,

	width: 60,
	height: 60,
	
	pos: {
		x: 100,
		y: 100
	},
	
	speed: 1,
	
	img: assets['Prisma'],

	init: function( x, y) {
	
		x = this.pos.x;
		y = this.pos.y;
			
	},

    update: function() {
	
		this.pos.y += this.speed;
	
	},

	draw: function (ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y , this.width , this.height);
	},	
	
	moveUp: function () {
			speed = -this.speed;
	},
	
	moveDown:function () {
			speed = this.speed;
	},
	
	
});
