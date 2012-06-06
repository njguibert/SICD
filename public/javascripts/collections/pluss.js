define([
  'models/plus'
],function(plusModel){
  var plusCollection=Backbone.Collection.extend({
    model: plusModel,
    initialize: function(){
    },
    url: '/collection/plus/'
  })
  return new plusCollection;
});