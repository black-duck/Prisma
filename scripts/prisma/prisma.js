factory['prisma'] = Class.extend({ 

	_killed: false,

	width: 60,
	height: 60,
	
	pos: {
		x: 100,
		y: 100
	},
	
	velocity: {
		x: 1,
		y: 1
	},
	
	img: assets['prisma'],

	init: function( x, y, settings) {
	
		x = this.pos.x;
		y = this.pos.y;
		
		});
		
	},

    update: function() {
	
		this.pos.y += speed.y;
	
	},

	draw: function (ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y, this.angle, 
						this.size.x, this.size.y);
	},	
	
	moveUp: function () {
			speed.y = -this.velocity.y;
	},
	
	moveDown:function () {
			speed.y = this.velocity.y;
	},
	
	
});
