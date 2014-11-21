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
         me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);


        if (game.flag.score){

        	// GetScore 

        	var scoreGet = localStorage.getItem("me.save.scores");
        	// scoreGet = scoreGet.substring(0, length-1);
        	var scoreLis = scoreGet.split(",");
        	var newScore = scoreGet + game.data.score;
            if (game.data.score != 0){
                localStorage.setItem("me.save.scores", newScore+",");
            }
        }else{
        	var scoreCad = game.data.score;
        	if (scoreCad != 0){
        		localStorage.setItem("me.save.scores", scoreCad+",");
        	}
        	
        }

        this.bg = me.loader.getImage("sc_bg");
        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("left", 1);

        this.font2 = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font2.alignText = "bottom";
        this.font2.set("left", 0.7);


        // this.ts1 = new me.SpriteObject(80, 50, me.loader.getImage("ts1"));
        
        //  var tween = new me.Tween(this.ts1.pos).to({ x: 195 }, 500).onComplete(null);
        // tween.easing(me.Tween.Easing.Quadratic.Out);
        // tween.start();
 

        me.input.bindKey(me.input.KEY.R, "restart", true);
        me.input.bindKey(me.input.KEY.Q, "exit", true);
      
        // this.textin();
        // setup a callback
        // this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, this.onProgressUpdate.bind(this));

        // load progress in percent
        // this.loadPercent = 0;
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
        	game.data.score = 0;
        	game.data.lives = 4;
            me.state.change(me.state.PLAY);

            if (localStorage.getItem("me.save.scores")){
                game.flag.score = true;
            }else{
                game.flag.score = false;
            }

           // me.game.viewport.fadeOut(this.fade, this.duration);
        }else if (me.input.isKeyPressed('exit')) {

        }
       
        return true;
    },

    /*---
    
        draw function
      ---*/

    draw: function (context) {

        // measure the logo size
        // var logo1_width = this.logo1.measureText(context, "Cargando...").width;
        context.drawImage(this.bg, 0, 0);
        // this.ts1.draw(context);
        var xpos = me.video.getWidth() / 2;
        var ypos = me.video.getHeight() / 2;

        // clear surface
        // me.video.clearSurface(context, "black");

        this.font2.draw(context, 'PRESIONA "R"' , xpos-130, ypos-120);
        this.font2.draw(context, 'PARA REINICIAR' , xpos-150, ypos-90);



        // draw the melonJS logo
        this.font.draw(context, 'SCORE : ' + game.data.score , xpos-160 , ypos-50);

         if (game.flag.score){
         	var yposSco = (me.video.getHeight() / 2) -40;
         	var scoreGet = localStorage.getItem("me.save.scores");
        	var scoreLis = scoreGet.split(",");
        	var maxRecord = 0;
        	scoreLis.sort(sortNumber);
        	// Only five scores

        	if (scoreLis.length > 3){
        		maxRecord = 3;
        	}else{
        		maxRecord = scoreLis.length - 1;
        	}

        	for (var i = 0; i<maxRecord; i++){
        		
        		yposSco += 25;
        		this.font2.draw(context, " " + (i+1) +".- " + scoreLis[i], xpos-90, yposSco );
        	}
         }



        
      
    }
    
});




 