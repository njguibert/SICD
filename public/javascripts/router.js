// Filename: router.js
define([
  'views/home/main',
  'views/devices/main',
  'views/devices/abm',
  'views/options/list',
  'views/clients/list',
  'bootstrap',
], function(mainHomeView,deviceMainView,deviceABMView,optionListView,clientListView){
    var AppRouter = Backbone.Router.extend({
      routes:{
        '': 'loadpage',
        'clientes': 'showClients',
        'clientes/new': 'newClients',
        'devices': 'showDevices',
        'devicesABM': 'showABMDevices',
        },
        loadpage:function(){ //Muestro HomePage
          mainHomeView.render();
        },
        showClients:function(){ //Muestro Clientes
          clientListView.render();
        },
        showDevices:function(){ //Muestro Devices
          deviceMainView.render();
        },
        showABMDevices:function(){
          deviceABMView.render();
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
