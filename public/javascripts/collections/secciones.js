define([
  'models/seccion'
],function(seccionModel){
  var seccionCollection=Backbone.Collection.extend({
    model: seccionModel,
    initialize: function(){
    },
    url: '/collection/seccion/'
  })
  return new seccionCollection;
});