factory['Surface'] = Class.extend({ 

	colors: ['green','blue','red','yellow'],

	name: 'Surface',
    color: 0,

	_killed: false,

	width: 50,
	height: 50,
    speed: 1,
	
	pos: {
		x: 200,
		y: 200
	},
	
	img: assets['Surface'],

	init: function(x, y, color) {
	
		this.pos.x = x;
		this.pos.y = y;
		if (this.color !== undefined ) {
			this.color = color;
		}
	},

    update: function() {
	    this.pos.x -= this.speed;	
	},

	draw: function (ctx) {
		Drawer.rect(this.pos.x, this.pos.y, this.width, this.height, this.colors[this.color], this.colors[this.color]);
	},	
	
	
});
