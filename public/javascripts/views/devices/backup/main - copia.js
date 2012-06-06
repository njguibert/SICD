define([
  'models/plus',
  'models/devices',
  'collections/devices',
  'collections/pluss',
  'text!templates/devices/new.html',
  'text!templates/devices/template.html',
  'text!templates/devices/list.html',
  'text!templates/forms/modalfade.html',
  'views/devices/list',
  'libs/bootstrap/bootstrap-scrollspy',
],function(plusModel,devicesModel,devicesCollection,plusCollection,devicenewTemplate,deviceTemplate,devicelistTemplate,formTemplate,deviceListF){
  plus=plusCollection;

  //Vista del Formulario Nuevo Dispositivo
  var deviceNewView=Backbone.View.extend({
    el: "#frmnuevodispositivo",
    events: {
      "click #newdevice":"saveDevice"
    },
    initialize:function(){
      _.bindAll(this,'render','saveDevice');
      this.plusForm= new plusNewView();
      alert("creo-form");
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
    this.form = new Backbone.Form({   //Fomulario formado por los atributos schemas del objeto
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
      alert("guardo dispositivo:" + this.device.get("nombre"));
      self=this;
      this.device.set({plus:plus});
      //Creo la vista del formulario de Caracteriticas
      this.device.save({},{
       success:function(){
        self.render();
        }
      });
    }
  });

  //Vista de una Caracteritica
  var PlusView=Backbone.View.extend({
    tagName: 'li',
    events:{
      'click span.quitar' : 'remove',
    },
    initialize:function(){
      _.bindAll(this,'render','unrender');
      this.model.bind('remove',this.unrender);
    },
    render:function(){
      $(this.el).html("<span class='nombre'><input class='span1' type='text' value='" + this.model.get("nombre")+"'/><span class='valor'><input class='span1' type='text' value='" + this.model.get("valor")+"'/></span></span><span class='quitar'> <i class='icon-trash'></i></span>");
      return this;
    },
    unrender:function(){
      $(this.el).remove();
    },
    remove:function(){
      this.model.destroy();
    },        
  });
  //Vista del Formulario Nuevo Caracteristicas
  var plusNewView=Backbone.View.extend({
    el: '#frmplus',
    events:{
      'click #AddPlus': 'addplus',
    },    
    initialize:function(){
      plus.bind('add',this.renderone);
      plus.add({nombre:"Alf"});
    },
    render:function(){
      alert("entro"+ this.el);
      self=this;
      $("#frmplus").append("<input type='text' class='span2' placeholder='NombrePLU' id='newplusNombre' />");
      $(this.el).append("<input type='text' class='span2' placeholder='ValorPLU' id='newplusValor' />");
      $(this.el).append("<a href='#plus/new' id='AddPlus' class='btn btn-primary'>Agregar</a><br><br>");
      $(this.el).append("<ol id='olcaracteristicas'><li>Nombre - Valor</li></ol>");
      _(plus.models).each(function (p){
        self.renderone(p);
      },this);
    },
    renderone:function(p){
      var pluVista=new PlusView({model:p});
      $('#olcaracteristicas',this.el).append(pluVista.render().el);
    },
    addplus:function(){//Agrego la nueva caracteritica a la coleccion
      var p =new plusModel();
      p.set({nombre:$('#newplusNombre').val(),valor:$('#newplusValor').val()});
      plus.add(p);
    },
  });

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
    },
    renderone:function(){
      alert("entro uno nuevo");
    }
  });
  return new deviceMainView;
});