define([
  'models/devices'
],function(devicesModel){
  var devicesCollection=Backbone.Collection.extend({
    model: devicesModel,
    initialize: function(){
    },
    url: '/collection/devices/'
  })
  return new devicesCollection;
});