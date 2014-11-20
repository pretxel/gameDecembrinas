var game = {

    flag: {
        flagScore : false
    },

	 data: {
        id: 1,
        score: 0,
        lives: 4
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", 1000, 480, true)) {
            alert("Tu Navegador no soporta HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        me.audio.init("mp3,oga");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.set(me.state.LOADING, new myLoadingScreen());
        me.state.change(me.state.LOADING);

        
    },

    // Run on game resources loaded.
    "loaded" : function () {
        // me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        me.state.transition("fade", "#FFF", 250);

        // add our player entity in the entity pool
        me.entityPool.add("hero", game.PlayerEntity);

        // Collectibles
        me.entityPool.add("SweetEntity", game.SweetEntity);
        // me.entityPool.add("JackEntity", game.JackEntity);
        // me.entityPool.add("BlockEntity", game.BlockEntity);
        // me.entityPool.add("ProjectileEntity", game.ProjectileEntity);


        // Enemies
        me.entityPool.add("WalkingEnemy", game.WalkingEnemy);
        // me.entityPool.add("FlyingEnemy", game.FlyingEnemy);


        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        // me.input.bindKey(me.input.KEY.X, "attack", true);
        // me.input.bindKey(me.input.KEY.Z, "throw", true);

        me.input.bindKey(me.input.KEY.L, "levelskip", true); //function () { me.levelDirector.loadLevel("map2"); }.bind(this), true);

        me.debug.renderHitBox = true;

        // Start the game.
        me.state.change(me.state.PLAY);


        if (localStorage.getItem("me.save.scores")){
           // game.datosMar = JSON.stringify(eval("(" + localStorage.getItem("me.save.scores") + ")"));
           //  game.datosMar = JSON.parse(localStorage.getItem("me.save.scores")); 

           //  console.log("YA EXISTE");
           //  console.log(game.datosMar);

           // var newId =  (game.datosMar.id) + 1;
           // game.data.id = newId;
           // localStorage.setItem("me.save.scores"+newId, JSON.stringify(game.data) );
           game.flag.score = true;
        }else{
            // localStorage.setItem("me.save.scores", JSON.stringify(game.data) );
             // me.save.add(game.data);
             // me.save.score = data;
             game.flag.score = false;
        }

        // me.save.add(game.data);
        // me.state.set(me.state.SCORE, new myScoreScreen());
        // me.state.change(me.state.SCORE);
    }

}


me.LevelEntity = me.ObjectEntity.extend(
    /** @scope me.LevelEntity.prototype */
    {
        /** @ignore */
        init: function (x, y, settings) {
            this.parent(x, y, settings);

            this.nextlevel = settings.to;

            this.fade = settings.fade;
            this.duration = settings.duration;
            this.fading = false;

            // a temp variable
            this.gotolevel = settings.to;
        },

        /**
         * @ignore
         */
        onFadeComplete: function () {

            me.save.score = game.data.score;
            if (this.gotolevel == "FIN"){
                console.log("Termino el Juego");
                me.audio.stopTrack();
                me.state.set(me.state.SCORE, new myScoreScreen());
                me.state.change(me.state.SCORE);
            }else{
                 game.data.score += 50;
                 me.levelDirector.loadLevel(this.gotolevel);
                 me.game.viewport.fadeOut(this.fade, this.duration);
            }
           
            
        },

        /**
         * go to the specified level
         * @name goTo
         * @memberOf me.LevelEntity
         * @function
         * @param {String} [level=this.nextlevel] name of the level to load
         * @protected
         */
        goTo: function (level) {
            this.gotolevel = level || this.nextlevel;
            // load a level
            //console.log("going to : ", to);
            if (this.fade && this.duration) {
                if (!this.fading) {
                    this.fading = true;
                    me.game.viewport.fadeIn(this.fade, this.duration,
                            this.onFadeComplete.bind(this));
                }
            } else {
                me.levelDirector.loadLevel(this.gotolevel);
            }
        },

        /** @ignore */
        onCollision: function (res,obj) {
            if (obj instanceof game.PlayerEntity) {
                this.goTo();
            }
        }
    });