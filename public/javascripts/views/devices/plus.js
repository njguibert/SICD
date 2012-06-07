define([
  'models/devices',
  'collections/devices',
  'text!templates/devices/template.html',
  'text!templates/devices/list.html',
  'text!templates/forms/modalfade.html',
],function(devicesModel,devicesCollection,deviceTemplate,devicelistTemplate,formTemplate){
  //Vista de una Caracteritica
  var PlusView=Backbone.View.extend({
    tagName: 'tr',
    events:{
      'click span.quitar' : 'remove',
      'click span.modificar': 'modificar',
    },
    initialize:function(){
      _.bindAll(this,'render','unrender');
      this.model.bind('remove',this.unrender);
    },
    render:function(){
      //alert("aa");
      $(this.el).html("<td class='nombre' class='span2'><input type='text' class='span2' value='" + this.model.get("nombre")+"'/></td><td class='valor'><input type='text' value='" + this.model.get("valor")+"'/><span class='quitar'> <i class='icon-remove'></i></span><span class='modificar'> <i class='icon-refresh'></i></span></td>");
      return this;
    },
    unrender:function(){
      $(this.el).remove();
    },
    remove:function(){
      this.model.destroy();
    },
    modificar:function(){
      alert("Modifico el modelo:");
    }     
  });
  return PlusView;
});