factory['Prisma'] = Class.extend({ 

	_killed: false,
	
	
    currentcolor: "white",
    nextcolor: "red",

	zIndex: 3,	

	width: 20,
	height: 20,
	
	pos: {
		x: 150,
		y: 300
	},
	
	speed: { 
		x:0,
		y:0
	},

    nextSurface: false,
	
	maxSpeed: 2,
	
	img: assets['Prisma'],

	init: function(x, y) {
	
		x = this.pos.x;
		y = this.pos.y;
			
	},

    update: function() {
		
		
		var areaWidth = Player0.area.w;
		var areaHeight = Player0.area.h;
		var localHeight = this.height/2;
		var poPo=Drawer.portPos.y;
		
		this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;
		
		
		poPo = this.pos.y - areaHeight/2;
		
		if (this.pos.y < areaHeight/2) {
			poPo= 0;
		
		}
		
		//if (this.pos.y > areaHeight
		
		if (this.pos.y < 0 +localHeight) {
			
			this.pos.y = 0 +localHeight;
			
		}
		
		if (this.pos.y > areaHeight - localHeight) {
			
			this.pos.y = areaHeight - localHeight;
			
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
			this.speed.x = -this.maxSpeed/2;
	},
	
	moveRight:function () {
			this.speed.x = this.maxSpeed/3;
	},
	
	
});
