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

	ang: 0,

    nextSurface: false,
	
	maxSpeed: 2,
	
	img: null,
	imgSrc: assets['Prisma'],
	
	life: 100,
	maxLife: 100,

	go: {
		'up':   0,
		'down': 0,
		'front':0	
	},

	init: function(x, y) {
	
		x = this.pos.x;
		y = this.pos.y;
		this.img = Loader.load( this.imgSrc);
			
	},

    update: function() {
		
		var areaWidth = Player0.area.w;
		var areaHeight = Player0.area.h;
		var localHeight = this.height/2;
		
		
		this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;

		
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
	rotate: function (clockwise) {
		
		var tmp;
		
		if (clockwise) {
			
			this.ang += 2*1.04719755;
			
			tmp = this.go['down'];
			this.go['down'] = this.go['front'];
			this.go['front'] = this.go['up'];
			this.go['up'] = tmp;
		}
		else {
			this.ang -= 2*1.04719755;
			tmp = this.go['up'];
			this.go['up'] = this.go['front'];
			this.go['front'] = this.go['down'];
			this.go['down'] = tmp;
			
		}
		return this.ang;
		
	},

	draw: function (ctx) {
 	
    
	    Drawer.rawImage( this.img, this.pos.x, this.pos.y, this.ang, this.width, this.height);

	},	

	_changeColor: function (newColor) {
		
		this.color = newColor;
		
		var friends = Gameplay.getFriends(this.color);
		var i=0;
		for ( var c in this.go ) {			
			this.go[c] = friends[i];

			if ( i < friends.length-1) i++;
		}

		var img = Loader.load(this.imgSrc);
		this.img = this.__applyColors(img,	 Gameplay.toColor(this.go['up']),
											Gameplay.toColor(this.go['down']),
											Gameplay.toColor(this.go['front']) );

	},
	//TODO maybe Utility class is the place for next fucntion
	__applyColors: function (img, topColor, bottomColor, frontColor) {
		
		topColor = Color(topColor);
		bottomColor = Color(bottomColor);
		frontColor = Color(frontColor);

		var newImg = Drawer.filter(img, 
		
		function(imgData) {

			var data = imgData.data;
		
			for (var i=0; i<data.length; i+=4) {
		
				var R = imgData.data[i+0],
					G = imgData.data[i+1],
					B = imgData.data[i+2],
					A = imgData.data[i+3];

				var t;

				if (R >= 250 && G <= 25 && B <= 25) {
					t = frontColor; 
					data[i+0] = t.getRed() * 255;
					data[i+1] = t.getGreen() * 255;
					data[i+2] = t.getBlue() * 255;
					data[i+3] = A;
				}
				else if (R <= 25 && G >= 250 && B <= 25) {
					
					t = topColor
					data[i+0] = t.getRed() * 255;
					data[i+1] = t.getGreen() * 255;
					data[i+2] = t.getBlue() * 255;
					data[i+3] = A;
				}
				else if (R <= 25 && G <= 25 && B >= 250) {

					t = bottomColor; 
					data[i+0] = t.getRed() * 255;
					data[i+1] = t.getGreen() * 255;
					data[i+2] = t.getBlue() * 255;
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
		if (this.color = other.color) {
			this.surface = other;
			return;
		}
		if (this.surface.pos.x < other.pos.x ) {
			//move forward
			if (this.surface.color == this.go['front']) {
				
				this._changeColor(other.color);
				this.life += 2;
	
				if (this.maxLife < this.life) {
					this.life = this.maxLife;
				}
			}
			return;
		}
		if (this.surface.pos.y > other.pos.y ) {
			//move up
			if (this.surface.color == this.go['up']) {
				
				this._changeColor(other.color);
				this.life += 2;
				
				if (this.maxLife < this.life) {
					this.life = this.maxLife;
				}
			}
			return;
		}
		if (this.surface.pos.y < other.pos.y ) {
			//move down
			if (this.surface.color == this.go['down']) {
				
				this._changeColor(other.color);
				this.life += 2;
				
				if (this.maxLife < this.life) {
					this.life = this.maxLife;
				}
			}
			return;

		}

		if (GenPath._canTransition(this.color, other.color)) {
			this.surface = other;			
			this._changeColor(other.color);
			this.life -= 2;
			if (this.life < 0 ) {
				this.life = 0 
				this.crashed = true;
			}
		}
		else {
				this.crashed = true;
		}
		//work TODO

	},
	collision: function (other) {

		if (this.color == null ) { //DRAFT TODO
			this._changeColor(other.color);
		}
		else {
			if (!GenPath._canTransition(this.color, other.color)) {
				this.life -= 2;
				if (this.life < 0 ) {
					this.life = 0;
					this.crashed = true;
				}
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
