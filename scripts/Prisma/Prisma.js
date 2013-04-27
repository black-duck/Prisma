factory['Prisma'] = Class.extend({ 

	_killed: false,

    currentcolor: "white",
    nextcolor: "red",

	width: 60,
	height: 60,
	
	pos: {
		x: 100,
		y: 100
	},
	
	speed: { 
		x:0,
		y:0
	},

    nextSurface: false,
	
	maxSpeed: 10,
	
	img: assets['Prisma'],

	init: function(x, y) {
	
		x = this.pos.x;
		y = this.pos.y;
			
	},

    update: function() {
		
		
		var areaWidth = Player0.area.w;
		var areaHeight = Player0.area.h;
		
		this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;
		
		if (this.pos.y < 0 +this.height/2) {
			
			this.pos.y = 0 +this.height/2;
			
		}
		//to do DRAFT
		if (this.pos.y > areaHeight-this.heidght/2) {
			
			this.pos.y = areaHeight-this.height/2;
			
		}
		
		if (this.pos.x < 0 +this.width/2) {
			
			this.pos.x = 0 +this.width/2;
		
		}
		
		if (this.pos.x > areaWidth -this.width/2) {
			
			this.pos.x = areaWidth -this.width/2;
		
		}
		
		
		
		this.speed.y = 0;
		this.speed.x = 0;
		
	},

	draw: function (ctx) {
		Drawer.image( this.img, this.pos.x, this.pos.y , this.width , this.height);
	},	
	
	moveUp: function () {
			this.speed.y = -this.maxSpeed;
	},
	
	moveDown:function () {
			this.speed.y = this.maxSpeed;
	},
	
	moveLeft:function () {
			this.speed.x = -this.maxSpeed;
	},
	
	moveRight:function () {
			this.speed.x = this.maxSpeed;
	},
	
	
});
