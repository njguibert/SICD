define([
  'libs/backbone/backbone-forms.amd',
  'models/devices',
  'collections/devices',
  'text!templates/devices/new.html',
  'text!templates/forms/modalfade.html',
  'libs/backbone/list',
  'stylesheets/templates/bootstrap.js',
],function(bf,devicesModel,devicesCollection,devicenewTemplate,formTemplate){
  //Vista del Formulario Nuevo Dispositivo
  var deviceNewView=Backbone.View.extend({
    el: "#frmnuevodispositivo",
    events: {
      "click #newdevice":"saveDevice"
    },
    initialize:function(){
      _.bindAll(this,'render','saveDevice');
    },
    render:function(){ //Aca va el codigo del formulario
      //Creo el formulario modal de nuevo dispositivo
      var dataForm={
        title:'Nuevo Dispositivo',
        _:_,
      };      
      var formcompiledTemplate = _.template(formTemplate,dataForm); //Creo un formulario modal generico
      $('#frmnuevodispositivo').html(formcompiledTemplate);
      var formcompiledTemplateDATA =_.template(devicenewTemplate); //Datos dentro del formulario generico
      $('.modal-body').html(formcompiledTemplateDATA);
      $('.modal-footer').append("<a href='#device/new' class='btn btn-primary' id='newdevice'> Guardar </a>");      
    this.device = new devicesModel();
    this.form = new bf({   //Fomulario formado por los atributos schemas del objeto
              model:this.device
    }).render();
    $("#frmnuevodevice").html(this.form.el); //Agrego el objeto a fomularizar 
    },
    saveDevice:function(){
      //Seteo los datos ingresados en el formulario en el objeto
      var errors=this.form.commit();
      //Guardo el objeto en la BD
      self=this;
      this.device.save({},{
       success:function(){
        self.render();
        }
      });
    },
    removebind:function(){
      $(this.el).undelegate('#newdevice', 'click');
    }
  });
  
  return deviceNewView;
});