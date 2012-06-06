define([
  'models/devices',
  'collections/devices',
  'text!templates/devices/template.html',
  'text!templates/devices/list.html',
  'text!templates/forms/modalfade.html',
],function(devicesModel,devicesCollection,deviceTemplate,devicelistTemplate,formTemplate){
  var device = new devicesModel();
  var formView = Backbone.View.extend({
        render: function(){
          var form = new Backbone.Form({
            model:device
          }).render();
          $(this.el).append(form.el);
          return form;
        }
  });
  var fv=new formView();
  var form=fv.render();

  var deviceListView=Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection=devicesCollection;
      devicesCollection.fetch();
    },
    render:function(){

    	var compiledTemplate = _.template(deviceTemplate);
    	$("#page").html(compiledTemplate);

      var dataForm={
        title:'Nuevo Dispositivo',
        _:_,
      };
      //var formcompiledTemplate = _.template(formTemplate,dataForm);
      $('#frmnuevodevice').prepend(form.el); //Agrego al formulario los campos del objeto


      var data = {devices: this.collection.models,_: _};

      var compiledTemplate = _.template(devicelistTemplate,data);
      $('#listdevices').html(compiledTemplate);
    }
  });
  return new deviceListView;
});