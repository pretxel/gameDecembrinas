game.InstructionScreen = me.ScreenObject.extend({
    // constructor
    init: function () {
        this.parent(true);

        this.bg = null;


       
        
    },

    // reset function
    onResetEvent: function () {

        if (me.game.world.getEntityByProp("name", "HUD")[0]){
            me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
        }

        this.bg = me.loader.getImage("instrucciones_bg");

        me.input.bindKey(me.input.KEY.ENTER, "start", true);
        me.input.bindKey(me.input.KEY.X, "start", true);
        me.input.bindKey(me.input.KEY.Z, "start", true);
        me.input.bindKey(me.input.KEY.SPACE, "start", true);
        this.startText = new game.InstructionScreen.StartText(me.game.viewport.width/2, 500);
       
       this.textin();
        
    },

    textin: function(){
        var tween = new me.Tween(this.startText).to({ textScale: 0.8 }, 1000).onComplete(this.textout.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },
    textout: function(){
        var tween = new me.Tween(this.startText).to({ textScale: 0.9 }, 1000).onComplete(this.textin.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },

   


    // update function
    update: function () {
        if (me.input.isKeyPressed('start')) {
            me.state.change(me.state.PLAY);
           // me.game.viewport.fadeOut(this.fade, this.duration);
        }

       this.startText.update();
        return true;

    },

    // draw function
    draw: function (context) {
        context.drawImage(this.bg, 0, 0);
      
        this.startText.draw(context);
    },

    // destroy function
    onDestroyEvent: function () {
        me.input.bindKey(me.input.KEY.X, "attack", true);
        me.input.bindKey(me.input.KEY.Z, "throw", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

    }

});

game.InstructionScreen.StartText = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.textScale = 1;

        this.floating = true;
    },

    update: function () {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function (context) {
        this.font.draw(context, "INICIA EL JUEGO", me.video.getWidth() / 2, (me.video.getHeight() / 2) +200);

    }
});