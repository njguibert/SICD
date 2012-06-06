define([
  'collections/options',
  'text!templates/options/list.html'
],function(optionsCollection,optionsListTemplate){
  var optionListView=Backbone.View.extend({
    el: "#sidebar-opciones",
    initialize: function(){
    	this.collection=optionsCollection;
      optionsCollection.fetch();
      var self = this;
      this.collection.bind("reset", function() {self.render();});    
    },

    render:function(){
    	var data = {
    		options: this.collection.models,
    		_: _
    	};
    	var compiledTemplate = _.template(optionsListTemplate,data);
    	$(this.el).html(compiledTemplate);
    }
  });
  return new optionListView;
});