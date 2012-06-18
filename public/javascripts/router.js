// Filename: router.js
define([
  'views/home/main',
  'views/devices/main',
  'views/devices/abm',
  'views/options/list',
  'views/clients/list',
  'views/secciones/main',
  'bootstrap',
], function(mainHomeView,deviceMainView,deviceABMView,optionListView,clientListView,seccionMainView){
    var AppRouter = Backbone.Router.extend({
      routes:{
        '': 'loadpage',
        'clientes': 'showClients',
        'devices': 'showDevices',
        'devicesABM': 'showABMDevices',
        'secciones': 'showSecciones',
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
        showSecciones:function(){
          seccionMainView.render();
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
