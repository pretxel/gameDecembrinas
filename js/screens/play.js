game.PlayScreen = me.ScreenObject.extend({
    /** 
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.levelDirector.loadLevel("map1");

        // add our HUD to the game world        
        me.game.add(new game.HUD.Container());

        // background music
        me.audio.playTrack("musica_de_fondo", 0.3);


        // spr = new me.SpriteObject(me.game.viewport.width - 420, 22, me.loader.getImage("uva"), 32, 32);
        // spr.floating = true;
        // spr.z = 2;
        // this.addChild(spr);


      

       


    },


    /** 
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        //me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
        // me.input.releasePointerEvent("mousemove", me.game.viewport);
    }
});