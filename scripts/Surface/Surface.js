factory['Surface'] = Class.extend({ 

    name: 'Surface',
    color: 'red',

	_killed: false,

	width: 50,
	height: 50,
    speed: 1,
	
	pos: {
		x: 200,
		y: 200
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
