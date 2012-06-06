define([
  'models/option'
],function(optionModel){
  var optionsCollection=Backbone.Collection.extend({
    model: optionModel,
    initialize: function(){
    },
    url: '/collection/options/'
  })
  return new optionsCollection;
});