define([
  'models/devicesgenerico'
],function(devicesgenericoModel){
  var devicesgenericoCollection=Backbone.Collection.extend({
    model: devicesgenericoModel,
    initialize: function(){
    },
    url: '/collection/generic/generic'
  })
  return new devicesgenericoCollection;
});