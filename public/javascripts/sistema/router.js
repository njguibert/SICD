// Filename: router.js
define([
  'views/home/main',
  'bootstrap',
], function(mainHomeView){
//], function(){
    var AppRouter = Backbone.Router.extend({
      routes:{
        '': 'loadpage',
        },
        loadpage:function(){
          mainHomeView.render();
        },
    });

    var initialize=function(){
      var app_router=new AppRouter;
      Backbone.history.start();
    };
    return {
      initialize:initialize
    };
  });
