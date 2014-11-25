game.square = me.GUI_Object.extend(
{
   init:function (x, y)
   {
      var settings = {}
      settings.image = me.loader.getImage("uva");
      settings.spritewidth = 32;
      settings.spriteheight = 32;
      // super constructor
      this.parent(x, y, settings);
      // define the object z order
      this.z = 100;
   },

   // output something in the console
   // when the object is clicked
   onClick:function (event)
   {
      console.log("clicked!");
      // don't propagate the event
      return false;
   }
});
