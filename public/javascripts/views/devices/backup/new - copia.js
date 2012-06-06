define([
  'models/devices',
  'collections/devices',
  'text!templates/devices/new.html',
],function(devicesModel,devicesCollection,deviceListTemplate){
  var deviceNewView=Backbone.View.extend({
    el: $("#page"),
    events: {
      "click #save":"saveDevices"
    },    
    initialize: function(){
    	this.model= devicesModel;
    },
    saveDevices:function(){ //Guardo el Dispositivo en el servidor
      coleccion=devicesCollection
      objeto=new devicesModel({nombre:$('#nombre').val(),descripcion:$('#descripcion').val()});
      //objeto.save();
      coleccion.add(objeto);
      objeto.save({},{
        success:function(){
          alert ("id:" + objeto.get("id"));
        }

      });
       alert ("id:" + objeto.id);
      //alert ("nombre"+ objeto.get("nombre"));
      //alert devicesModel({nombre:"ssss"});
    },
    render:function(){
    	var compiledTemplate = _.template(deviceListTemplate);
    	$("#page").html(compiledTemplate);
    }
  });
  return new deviceNewView;
});