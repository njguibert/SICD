define([
  'libs/backbone/backbone-forms.amd',
  'models/plus',
  'models/devices',
  'collections/devices',
  'collections/pluss',
  'text!templates/devices/new.html',
  'text!templates/forms/modalfade.html',
  'views/devices/plus',
  
],function(bf,plusModel,devicesModel,devicesCollection,plusCollection,devicenewTemplate,formTemplate,PlusView){
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
    //Creo la vista del formulario de Caracteriticas
    this.plusForm= new plusNewView();
    this.plusForm.render();
    },
    saveDevice:function(){
      //Seteo los datos ingresados en el formulario en el objeto
      var errors=this.form.commit();
      //Guardo el objeto en la BD
      self=this;
      this.device.set({plus:this.plusForm.getplus()});
      //Creo la vista del formulario de Caracteriticas
      this.device.save({},{
       success:function(){
        self.render();
        }
      });
    }
  });
  //Vista del Formulario Nuevo Caracteristicas
  var plusNewView=Backbone.View.extend({
    el: '#frmplus',
    events:{
      'click #AddPlus': 'addplus',
    },    
    initialize:function(){
      this.plus=plusCollection;
      this.plus.reset();
      this.plus.bind('add',this.renderone);
      alert("initialize");
    },
    render:function(){
      self=this;
      $(this.el).append("<div id='frmpluslist'><table class='table table-striped' id='olcaracteristicas'><tr><th class='span2'>Nombre</th><th>Valor</th></tr></table></div>");
      _(self.plus.models).each(function (p){
        self.renderone(p);
      },this);
    },
    renderone:function(p){
      alert("renderone");
      var pluVista=new PlusView({model:p});
      $('#olcaracteristicas',this.el).append(pluVista.render().el);
    },
    addplus:function(){//Agrego la nueva caracteritica a la coleccion
      var p =new plusModel();
      p.set({nombre:$('#newplusNombre').val(),valor:$('#newplusValor').val()});
      this.plus.add(p);
    },
    getplus:function(){
      this.plus.unbind('add',this.renderone);
      return this.plus;
    }
  });

  return deviceNewView;
});