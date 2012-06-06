define([
  'models/client'
],function(clientModel){
  var clientsCollection=Backbone.Collection.extend({
    model: clientModel,
    initialize: function(){
    },
    url: '/collection/clients/'
  })
  return new clientsCollection;
});