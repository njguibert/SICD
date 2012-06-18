define([
  'libs/backbone/backbone-forms.amd',
  'models/seccion',
  'text!templates/secciones/neww.html',
  'text!templates/forms/modalfade.html',
  //'libs/backbone/list',
  'stylesheets/templates/bootstrap.js',
],function(bf,seccionModel,seccionnewTemplate,formTemplate){
  //Vista del Formulario Nuevo Dispositivo
  var seccionNewView=Backbone.View.extend({
    el: "#frmnuevaseccion",
    events: {
      "click #newdevice":"saveDevice"
    },
    initialize:function(){
      _.bindAll(this,'render','saveDevice','setPadre');
      this.padre=false;
    },
    render:function(){ //Aca va el codigo del formulario
      //Creo el formulario modal de nuevo dispositivo
      var dataForm={
        title:'Nueva Seccion',
        _:_,
      };      
      var formcompiledTemplate = _.template(formTemplate,dataForm); //Creo un formulario modal generico
      $('#frmnuevaseccion').html(formcompiledTemplate);
      var formcompiledTemplateDATA =_.template(seccionnewTemplate); //Datos dentro del formulario generico
      $('.modal-body').html(formcompiledTemplateDATA);
      $('.modal-footer').append("<a href='#device/new' class='btn btn-primary' id='newdevice'> Guardar </a>");      
      //alert(this.padre);
    this.device = new seccionModel();

    this.form = new bf({   //Fomulario formado por los atributos schemas del objeto
              model:this.device
    }).render();
    $("#frmnuevoseccion").html(this.form.el); //Agrego el objeto a fomularizar 
    },
    saveDevice:function(){
      //Seteo los datos ingresados en el formulario en el objeto
      var errors=this.form.commit();
      if (this.padre!= false){
        this.device.set({'padre':this.padre});  //Si la seccion tiene padre, ya se la seteo
        alert("tiene padre");
      }      
      //Guardo el objeto en la BD
      self=this;
      this.device.save({},{
       success:function(){
        //self.render();   
        }
      });
    },
    setPadre:function(idpadre){
      this.padre=idpadre;
    },
    removebind:function(){
      alert("unbind");
      $(this.el).undelegate('#newdevice', 'click');
    }
  });
  
  return seccionNewView;
});