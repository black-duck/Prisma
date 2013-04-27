factory['Surface'] = Class.extend({ 

	_killed: false,

	width: 60,
	height: 60,
    speed: 1,
	
	pos: {
		x: 500,
		y: 500
	},
	
	img: assets['Surface'],

	init: function(x, y) {
	
		x = this.pos.x;
		y = this.pos.y;

	},

    update: function() {
	    this.pos.x -= this.speed;	
	},

	draw: function (ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y , this.width , this.height);
	},	
	
	
});
