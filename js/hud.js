
/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

    init: function () {
        // call the constructor
        this.parent();

        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at position
        // this.addChild(new game.HUD.JacksItem(60, 22));
        this.addChild(new game.HUD.ScoreItem(me.game.viewport.width / 2, 22));
        this.addChild(new game.HUD.LivesItem(me.game.viewport.width - 80, 22));

        

        spr = new me.SpriteObject(me.game.viewport.width - 120, 22, me.loader.getImage("live"), 32, 32);
        spr.floating = true;
        spr.z = 2;
        this.addChild(spr);


        this.alwaysUpdate = true;
    },


});





game.HUD.ScoreItem = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.score = 0;

        this.floating = true;
    },

    update: function () {

        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    draw: function (context) {
        this.font.draw(context, game.data.score, this.pos.x, this.pos.y);

    }
});

game.HUD.LivesItem = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("left", 1);

        this.lives = 0;

        this.floating = true;
    },

    update: function () {

        if (this.lives !== game.data.lives) {
            this.score = game.data.lives;
            return true;
        }
        return false;
    },

    draw: function (context) {
        this.font.draw(context, "X" + game.data.lives, this.pos.x, this.pos.y);

    }
});