factory['Lifebar'] = Class.extend({

    _killed: false,

    zIndex: 4,

    size: {
        x:40,
        y:8
    },

    width: 40,
    height: 8,

    offset: {
        x: 0,
        y: 0
    },

    pos: {
        x:40,
        y:20
    },

    liferatio: 1, //[0-1]

    init: function (x, y) {

        x = this.pos.x;
		y = this.pos.y;

    },

    update: function() {

    },

    draw: function() {
        Drawer.rect(this.pos.x, this.pos.y, this.width, this.height, 'black');
        Drawer.rect(this.pos.x, this.pos.y, this.liferatio * this.size.x, this.size.y, 'C9C9C9', 'C9C9C9'); 
    },

    setRatio: function(ratio) {
        this.liferatio = ratio;
    },

    kill: function() {
        this._killed = true;
    }


});