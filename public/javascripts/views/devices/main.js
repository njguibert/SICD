define([
  'collections/devices',
  'text!templates/devices/template.html',
  'views/devices/list',
  'views/devices/new',
],function(devicesCollection,deviceTemplate,deviceListF,deviceNewView){
  //Vista principal Dispositivos
  var deviceMainView=Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection=devicesCollection;
      devicesCollection.fetch();
      self=this;
      this.collection.bind("add", function() {self.renderone();});
    },
    render:function(){
    	var compiledTemplate = _.template(deviceTemplate);
    	$("#page").html(compiledTemplate);
      //Creo la vista del formulario
      var deviceForm= new deviceNewView();
      deviceForm.render();
      //Creo la vista del listado
      var deviceList= new deviceListF({collection:this.collection});
      deviceList.render();
    }
  });
  return new deviceMainView;
});