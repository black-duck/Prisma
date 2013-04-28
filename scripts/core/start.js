// Used to calculate framesInterval.
var beforeFrame = 0;
var afterFrame = 0;
var framesInterval = 0;

DELAY = 1000.0/60.0;
Logger = {};
Logger.log = console.log;
function loop() {

    beforeFrame = new Date();

    GameEngine.update();
    //PhysicsEngine.update();
    // Gameplay.update();
    GameEngine.draw();

    afterFrame = new Date();
    framesInterval = afterFrame - beforeFrame;

    window.setTimeout(loop, DELAY - framesInterval);
}

function startGame() {
	var canvas = document.getElementById('canvas');

    // Do some initialization.
    InputEngine.setup(canvas);
    GameEngine.init(canvas);
    Drawer.init(canvas);
	//Scalling
	Drawer.setScale(Math.ceil(50*canvas.width/550)/50, Math.ceil(50*canvas.width/550)/50);
	Scale.setScale(Math.floor(50*canvas.width/800)/50, Math.floor(50*canvas.width/800)/50);
    // Gameplay.init();

    // And loop.
    loop();
}
