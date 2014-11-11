 myScoreScreen = me.ScreenObject.extend({
    /*---
    
        constructor
        
        ---*/
    init: function () {
        this.parent(true);

        
		

    },

    // call when the loader is resetted
    onResetEvent: function () {
        // melonJS logo
        this.logo1 = new me.Font("Verdana", 20, "green");

         me.input.bindKey(me.input.KEY.R, "restart", true);
        me.input.bindKey(me.input.KEY.Q, "exit", true);
      
        
        // setup a callback
        // this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, this.onProgressUpdate.bind(this));

        // load progress in percent
        // this.loadPercent = 0;
    },

    // destroy object at end of loading
    onDestroyEvent: function () {
        // "nullify" all fonts
        
    },

    // make sure the screen is refreshed every frame 
    // onProgressUpdate: function (progress) {
    //     this.loadPercent = progress;
    //     this.invalidate = true;
    // },

    // make sure the screen is refreshed every frame 
    update: function () {
        if (me.input.isKeyPressed('restart')) {
            me.state.change(me.state.PLAY);
           // me.game.viewport.fadeOut(this.fade, this.duration);
        }else if (me.input.isKeyPressed('exit')){

        }

        return true;
    },

    /*---
    
        draw function
      ---*/

    draw: function (context) {

        // measure the logo size
        // var logo1_width = this.logo1.measureText(context, "Cargando...").width;
        var xpos = me.video.getWidth() /2;
        var ypos = me.video.getHeight() / 2;

        // clear surface
        me.video.clearSurface(context, "black");

        // draw the melonJS logo
        this.logo1.draw(context, 'Score : ' + me.save.score , xpos, ypos);
        this.logo1.draw(context, 'Presiona R para reiniciar o Q para ir a Menu ' , xpos-100, ypos+100);
        // xpos += logo1_width;

        // ypos += this.logo1.measureText(context, "Cargando...").height / 2;

        // // display a progressive loading bar
        // var progress = Math.floor(this.loadPercent * 300);

        // // draw the progress bar
        // context.strokeStyle = "silver";
        // context.strokeRect((me.video.getWidth()/2) - 150, ypos, 300, 6);
        // context.fillStyle = "#89b002";
        // context.fillRect((me.video.getWidth() / 2) - 148, ypos + 2, progress - 4, 2);
    }

});