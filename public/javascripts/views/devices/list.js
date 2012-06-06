define([
  'models/devices',
  'collections/devices',
  'text!templates/devices/template.html',
  'text!templates/devices/list.html',
  'text!templates/forms/modalfade.html',
],function(devicesModel,devicesCollection,deviceTemplate,devicelistTemplate,formTemplate){
  //Vista coleccion de dispositivos
  var deviceListView=Backbone.View.extend({
    el: "#listdevices",
    render:function(){
      var data = {
        devices: this.collection.models,
        _: _
      };      
      var compiledlistTemplate= _.template(devicelistTemplate,data);
      $("#listdevices").html(compiledlistTemplate);
    }
  });
  return deviceListView;
});