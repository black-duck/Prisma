factory['Prisma'] = Class.extend({ 

	_killed: false,
	crashed: false,	
	
	surface: null,
    color: null,   

	zIndex: 3,	

	width: 20,
	height: 20,
	
	pos: {
		x: 150,
		y: 250
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
		
		
		this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;

        // A lot of hardcoding here it is. 
        // Hardcoding leads to anger and anger leads to hate and hate leads to the dark side.
        // Ideally, we should go through all entities that should not stick there when viewport is moving.
		
		// port size = canvas /scale
		Drawer.portPos.y = this.pos.y - (Drawer.portSize.h/2);

        Player0.lifebar.pos.y = this.pos.y - (Drawer.portSize.h/2) + 20;
		
		if (Drawer.portPos.y < 0) {
			Drawer.portPos.y = 0;
            Player0.lifebar.pos.y = 20;	
		}
		//TODO to fix
		if (Drawer.portPos.y + Drawer.portSize.h > areaHeight) {
			Drawer.portPos.y = areaHeight - Drawer.portSize.h;
            Player0.lifebar.pos.y = areaHeight - Drawer.portSize.h + 20;
		}
		
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

	_changeColor: function (newColor) {
		this.color = newColor;

	},
	//TODO maybe Utility class is the place for next fucntion
	__applyColors: function (img, topColor, bottomColor, frontColor) {
		
		var newImg = Drawer.filter(img, 
		
		function(imgData) {

			var data = imgData.data;
		
			for (var i=0; i<data.length; i+=4) {
		
				var R = imgData.data[i+0],
					G = imgData.data[i+1],
					B = imgData.data[i+2],
					A = imgData.data[i+3];

				if (R == 255 && G != 255 && B != 255) {
					var t = Colors.name2rgb(topColor); 
					data[i+0] = t.R;
					data[i+1] = t.G;
					data[i+2] = t.B;
					data[i+3] = A;
				}
				else if (R != 255 && G == 255 && B != 255) {
					var t = Colors.name2rgb(bottomColor); 
					data[i+0] = t.R;
					data[i+1] = t.G;
					data[i+2] = t.B;
					data[i+3] = A;
				}
				else if (R != 255 && G != 255 && B == 255) {
					var t = Colors.name2rgb(frontColor); 
					data[i+0] = t.R;
					data[i+1] = t.G;
					data[i+2] = t.B;
					data[i+3] = A;
				}
			}

			return imgData;

		});
		
		return newImg;
		
	},
	inside: function (other) {
		
		if (this.surface == null) { //DRAFT TODO
			this.surface = other;
			this._changeColor(other.color);
		}
		if (this.surface == other ) {
			return;
		}
		if (this.surface.pos.x < other.pos.x ) {
			//move forward
			//console.log(this.color + '>' +  other.color );
		}
		if (this.surface.pos.y > other.pos.y ) {
			//move up
			//console.log('^');		
		}
		if (this.surface.pos.y < other.pos.y ) {
			//move down
			//console.log('v');
		}
		if (GenPath._canTransition(this.color, other.color)) {
			this.surface = other;			
			this._changeColor(other.color);
		}
		//work TODO

	},
	collision: function (other) {

		if (this.color == null ) { //DRAFT TODO
			this.changeColor(other.color);
		}
		else {
			if (!GenPath._canTransition(this.color, other.color)) {
				//work TODO
				console.log('Game over');
				this.crash = true;
			}

		}

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
