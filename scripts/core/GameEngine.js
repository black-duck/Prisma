//DRAFT - to be modified area start
Player0 = {
    playing: true,
	prisma: null,
	area: { 
		x:0,
		y:0,
		w:300,
		h:600
	}
}


assets = { 
	'background': 'atlas/bg.jpg',
	'Prisma'	: 'atlas/prisma.png', 
    'Surface'   : 'atlas/red.jpg',
}



factory = {};

//DRAFT - to be modified area stop

GameEngine = { 

    correlations: {"red": "blue", "blue": "green", "green": "red"},

	ctx: null,
	canvas: null,

	Entities: [],

	init: function (canvas) {
		
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		Player0.prisma = this.spawn('Prisma');
        
        
		//DRAFT
		
		//Drawer.image('atlas/bg');
	},

	draw: function () {

		var ctx = this.ctx;
		
		//DRAFT start
		ctx.drawImage( Loader.load(assets['background']),
						0, 0, 
						this.canvas.width, this.canvas.height);
		//DRAFT end
		
		var ent = this.Entities;

		ent.sort(function (a,b) { 
			
			var az=0;
			var bz=0;

			if (a.zIndex == undefined) {
				az = 0;
			}
			else {
				az =  a.zIndex;
			}

			if (b.zIndex == undefined) {
				bz = 0;
			}
			else {
				bz = b.zIndex;
			}
			
			return az - bz; 
		});

		for ( i in ent ) {
			ent[i].draw(ctx);	
		}

	},
	//to do move ai to own class
	aiClock:0,
	
	ai: function () {
		if (this.aiClock > 47 ) {
			GenPath.step();
			var nextStep = GenPath.pull();
			this.batchSpawn(600,nextStep);
			this.aiClock = 0;
		}
		else {
			this.aiClock+=1;
		}
		
	},
	
	update: function () {
		
		this.ai();
        //this.ctx.font = "bold 22px sans-serif";
        //this.ctx.fillText("xxx", 100, 100);
        //console.log(Player0.prisma.currentcolor) 
       // console.log(Player0.prisma.nextcolor)

		//DRAFT start
		if(InputEngine.actions['go-up']) {
			
				Player0.prisma.moveUp();	
			
		}
		else if(InputEngine.actions['go-down']) {
			
				Player0.prisma.moveDown();
			
		}
		
		if(InputEngine.actions['go-left']) {
			
				Player0.prisma.moveLeft();
			
		}
		else if(InputEngine.actions['go-right']) {
			
				Player0.prisma.moveRight();
			
		}
		
		var ent = this.Entities;	

		for (var i=ent.length; i-- ; i) {	

			ent[i].update();
            if (ent[i].name == "Surface") {

            
				//TODO
				//brace your selfs, sophron angly code is coming
                /*
                console.log(Player0.prisma.pos.x);
                console.log(Player0.prisma.pos.y);
                console.log(ent[i].pos.x);
                console.log(ent[i].pos.y);
                */
                if ((Player0.prisma.pos.x < ent[i].pos.x + ent[i].width/2) && 
                    (Player0.prisma.pos.x > ent[i].pos.x - ent[i].width/2) && 
                    (Player0.prisma.pos.y < ent[i].pos.y + ent[i].height/2) && 
                    (Player0.prisma.pos.y > ent[i].pos.y - ent[i].height/2)) {
                        //console.log("i'm in");
                        if (Player0.prisma.currentcolor != ent[i].color) {
                            if (Player0.prisma.nextcolor != ent[i].color) {
                                //checkPoint();
                            }
                            else if (Player0.prisma.nextcolor == ent[i].color) {
                                console.log("i'm in");
                                Player0.prisma.currentcolor = ent[i].color;
                                Player0.prisma.nextcolor = this.correlations[ent[i].color];
                            }
                        }
                }
            }
		    
			
		}

		//Draft Garbage collector
		//TODO
		for (var i=ent.length; i-- ; i) {	
        	if ( ent[i] &&  ent[i].pos.x < -50 ) {
				ent.splice( i, 1);		
			}
		}

	},

	
	spawn: function (entityName) {
	
		var args = Array.prototype.slice.call(arguments, 1);


		var Temp = function(){}

		var inst, ent;

		Temp.prototype = factory[entityName].prototype;
		inst = new Temp;
		ent = factory[entityName].apply(inst, args); 
		
		this.Entities.push(ent);
		return ent;
	},
	//Drawer.rect(x, y, width, height, color, fillColor);
	batchSpawn: function(x,array) {
		var y=0;
		for (var i=0; i<=array.length; i++ ) {
			
			if (array[i] == 0) { 
				this.spawn ('Surface',x,y,'black'); 
			}
			else if (array[i] == 1) {
				this.spawn ('Surface',x,y,'white');
			}
		y+=49;
		}
	},

	removeEntity: function(ent) {

		ent._killed = true;
	}

}
