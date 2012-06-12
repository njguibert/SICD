define([
  'collections/devices',
  'text!templates/devices/template.html',
  'views/devices/list',
  'views/devices/new',
  'libs/backbone/adapter/backbone.bootstrap-modal'
],function(devicesCollection,deviceTemplate,deviceListF,deviceNewView){
  //Vista principal Dispositivos
  var deviceMainView=Backbone.View.extend({
    events: {
      "click #frmnuevo":"renderfrmnuevo"
    },
    el: $("#page"),
    initialize: function(){

    },
    renderfrmnuevo:function(){
      //Creo la vista del formulario
      var deviceForm= new deviceNewView();
      deviceForm.render();
      $('#frmnuevodispositivo').modal();
      $('#frmnuevodispositivo').on('hidden', function () {
        $('#frmnuevodispositivo').unbind('hidden');
        deviceForm.removebind();
      });
    },
    render:function(){
      this.collection=devicesCollection;
      devicesCollection.fetch();
      self=this;
      this.collection.bind("add", function() {self.renderone();});      
    	var compiledTemplate = _.template(deviceTemplate);
    	$("#page").html(compiledTemplate);
      //Creo la vista del listado
      var deviceList= new deviceListF({collection:this.collection});
      deviceList.render();
    }
  });
  return new deviceMainView;
});