// Filename: router.js
define([
  'views/home/main',
  'views/devices/main',
  'views/devices/new',
  'views/options/list',
  'views/clients/list',
  'bootstrap',
], function(mainHomeView,deviceMainView,deviceNewView,optionListView,clientListView){
//], function(){
    var AppRouter = Backbone.Router.extend({
      routes:{
        '': 'loadpage',
        'clientes': 'showClients',
        'clientes/new': 'newClients',
        'devices': 'showDevices',
        'devices/new': 'newDevices',
        },
        loadpage:function(){
          //optionListView.render();
          mainHomeView.render();
          //alert("inicio");
        },
        showClients:function(){
          clientListView.render();
          //alert("muestro clientes");
        },
        newClients:function(){
          //alert("Creo el cliente");
        },
        showDevices:function(){
          deviceMainView.render();
        },
        newDevices:function(){
          deviceNewView.render();
        },
        defaultAction:function(actions){
          //mainHomeView.render();
        }
    });

    var initialize=function(){
      var app_router=new AppRouter;
      Backbone.history.start();
    };
    return {
      initialize:initialize
    };
  });
