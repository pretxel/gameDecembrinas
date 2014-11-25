game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);

        this.bg = null;
        // me.input.registerPointerEvent('mousedown', this, this.onMouseDown.bind(this));



    },

    // reset function
    onResetEvent: function() {
        this.bg = me.loader.getImage("inicio_bg");

         
        

        me.input.bindKey(me.input.KEY.ENTER, "start", true);
        me.input.bindKey(me.input.KEY.X, "start", true);
        me.input.bindKey(me.input.KEY.Z, "start", true);
        me.input.bindKey(me.input.KEY.SPACE, "start", true);
        this.startText = new game.TitleScreen.StartText(me.game.viewport.width / 2, 500);
        this.buttonStart = new game.TitleScreen.ButtonStart(me.game.viewport.width / 2, 500);

        this.textin();

        me.input.registerPointerEvent("mousemove", this.buttonStart, function(event) {
            // publish a "mousemove" message
            me.event.publish("mousemove", [event]);
            // don't propagate this event furthermore
            return false;
        });

       

        // var myButton = me.GUI_Object.extend({
        //     init: function(x, y) {
        //         settings = {}
        //         settings.image = me.loader.getImage("uva");
        //         settings.spritewidth = 32;
        //         settings.spriteheight = 32;
        //         // parent constructor
        //         this.parent(x, y, settings);
        //     },

        //     // output something in the console
        //     // when the object is clicked
        //     onClick: function(event) {
        //         console.log("clicked!");
        //         // don't propagate the event
        //         return false;
        //     }
        // });


        // me.game.add(new game.square());


    },

    textin: function() {
        var tween = new me.Tween(this.startText).to({
            textScale: 0.8
        }, 1000).onComplete(this.textout.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },
    textout: function() {
        var tween = new me.Tween(this.startText).to({
            textScale: 0.9
        }, 1000).onComplete(this.textin.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },




    // update function
    update: function() {
        if (me.input.isKeyPressed('start')) {




            if (game.flag.instruction) {
                me.state.change(me.state.PLAY);
            } else {
                game.flag.instruction = true;
                localStorage.setItem("me.save.instruction", true);
                me.state.change(me.state.SETTINGS);
            }
            // me.game.viewport.fadeOut(this.fade, this.duration);
        }

        this.startText.update();
        return true;

    },

    // draw function
    draw: function(context) {
        context.drawImage(this.bg, 0, 0);

        this.startText.draw(context);
        // this.buttonStart.draw(context);

        // new game.square(10, 10).draw(context);




        // me.game.world.addChild(new myButton(10,10));
    },

    // destroy function
    onDestroyEvent: function() {
        me.input.bindKey(me.input.KEY.X, "attack", true);
        me.input.bindKey(me.input.KEY.Z, "throw", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        // me.input.releasePointerEvent("mousemove", me.game.viewport);

    }

});

game.TitleScreen.StartText = me.Renderable.extend({
    init: function(x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", {
            x: 32,
            y: 32
        });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.textScale = 1;

        this.floating = true;
    },

    update: function() {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function(context) {
        if (game.flag.instruction) {
            this.font.draw(context, "PRESIONA 'ENTER' PARA JUGAR", me.video.getWidth() / 2, (me.video.getHeight() / 2) + 200);
        } else {
            this.font.draw(context, "PRESIONA 'ENTER' ", me.video.getWidth() / 2, (me.video.getHeight() / 2) + 170);
            this.font.draw(context, "PARA VER INSTRUCCIONES", me.video.getWidth() / 2, (me.video.getHeight() / 2) + 200);
        }


    }
});


game.TitleScreen.ButtonStart = me.GUI_Object.extend({
    init: function(x, y) {
        var settings = {}
        settings.image = me.loader.getImage("uva");
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        this.x = 100;
        this.y = 100;
        this.parent(100, 100, settings);
        // super constructor
        // this._super(me.GUI_Object, "init", [x, y, settings]);
        // define the object z order
        this.z = 100;
    },

    // output something in the console
    // when the object is clicked
    onClick: function(event) {
        console.log("clicked!");
        // don't propagate the event
        return false;
    }

});