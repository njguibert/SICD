define([
  'libs/backbone/backbone-forms.amd',
  'models/devices',
  'collections/devices',
  'text!templates/devices/template.html',
  'text!templates/devices/list.html',
  'text!templates/forms/modalfade.html',
],function(bf,devicesModel,devicesCollection,deviceTemplate,devicelistTemplate,formTemplate){
//Vista del Formulario Editar Dispositivo
  var deviceEditView=Backbone.View.extend({
    el: "#frmeditardispositivo",
    events: {
      "click #deletedevice":"deleteDevice"
    },
    initialize:function(){
      _.bindAll(this,'render');
    },
    render:function(){ //Aca va el codigo del formulario
      //Creo el formulario modal de nuevo dispositivo
      var dataForm={
        title:'Editar Dispositivo',
        _:_,
      };      
      var formcompiledTemplate = _.template(formTemplate,dataForm); //Creo un formulario modal generico
      $('#frmeditardispositivo').html(formcompiledTemplate);
      $('.modal-footer').append("<a href='#device/delete' class='btn btn-danger' id='deletedevice'> Eliminar </a>");      
      $('.modal-footer').append("<a href='#device/new' class='btn btn-primary' id='newdevice'> Guardar </a>");      
      this.form = new bf({   //Fomulario formado por los atributos schemas del objeto
                model:this.model
      }).render();
     $(".modal-body").html(this.form.el); //Agrego el objeto a fomularizar 
    },
    deleteDevice:function(){
      alert("Elimino el dispositivo:" + this.model.get("nombre"));
       this.remove();

    }
  });  
  //Vista Item dispositivo
  var DeviceView=Backbone.View.extend({
    tagName: 'tr',
    events:{
      'click td.nombre' : 'getnombre'
    },
    initialize:function(){
    },
    render:function(){
      $(this.el).html("<td class='nombre'>" + this.model.get("nombre")+ "</td>");
      return this;
    },
    getnombre:function(){
      var deviceEditForm= new deviceEditView({model:this.model});
      deviceEditForm.render();
      $('#frmeditardispositivo').modal();
    }
  });

  //Vista coleccion de dispositivos
  var deviceListView=Backbone.View.extend({
    el: "#listdevices",
    render:function(){
      var data = {
        devices: this.collection.models,
        _: _
      };
      self=this;
      _(this.collection.models).each(function (d){
        self.renderone(d);
      });      
    },
    renderone:function(d){
      //Renderizo un dispositivo
      var DeviceVista=new DeviceView({model:d});
      $('#listdevicetable',this.el).append(DeviceVista.render().el); 
    }
  });

  return deviceListView;
});