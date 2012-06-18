define([
  'models/genericmodel'
],function(genericModel){
  var genericCollection=Backbone.Collection.extend({
    model: genericModel,
    initialize: function(){
    },
    url: '/collection/generic/generic'
  })
  return new genericCollection;
});