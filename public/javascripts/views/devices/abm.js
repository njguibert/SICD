define([
  'libs/backbone/backbone-forms.amd',
  'collections/devices',
  'collections/devicesgenerico',
  'text!templates/devices/abm.html',
  'text!templates/forms/modalfade.html',
  'libs/backbone/adapter/backbone.bootstrap-modal',
  'stylesheets/templates/bootstrap.js',
],function(bf,devicesCollection,devicesgenericoCollection,deviceTemplate,formTemplate){

  //Vista principal ABM Devices
  var deviceMainView=Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection=devicesCollection;
      devicesCollection.fetch();
      self=this;
    },
    render:function(){
    	var compiledTemplate = _.template(deviceTemplate);
    	$("#page").html(compiledTemplate);
      //Creo la vista del listado
      var deviceList= new deviceListView({collection:this.collection});
      deviceList.render();
    }
  });
  //Vista coleccion de dispositivos
  var deviceListView=Backbone.View.extend({
    el: "#ABMlistdevices",
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
  //Vista Item dispositivo
  var DeviceView=Backbone.View.extend({
    tagName: 'tr',
    events:{
      'click td.nombre' : 'new', //Al hacer click creo el formulario con los datos asociados
    },
    initialize:function(){
    },
    render:function(){
      $(this.el).html("<td class='nombre'>" + this.model.get("nombre")+ "</td>");
      return this;
    },
    new:function(){
      var abmVista=new abmView({model:this.model});
    }
  });
  //Vista ABM
  var abmView=Backbone.View.extend({
    el: '#ABM',
    events:{
      'click #savedevice' : 'guardar',
      'click #deletedevice' : 'eliminar',
      'click #frmnew':'renderfrmnuevo'
    },
    renderfrmnuevo:function(){
      this.renderAlta();
    },   
    initialize:function(){
      _.bindAll(this,'render','renderAlta','respuesta');
      $(this.el).undelegate('#savedevice', 'click');
      $(this.el).undelegate('#deletedevice', 'click');
      this.collection=devicesgenericoCollection; //Coleccion Generica
      devicesgenericoCollection.url='/collection/generic/'+ this.model.get("nombre"); //Setea tipo generico
      devicesgenericoCollection.fetch({success:this.render}); //cuando retornen los resultados ejecuto la funcion       
    },
    eliminar:function(){
      alert("elimino el dispositivo:"+ this.dispositivo.get("id"));
      this.dispositivo.destroy();
    },
    respuesta:function(){
      this.render();
    },
    render:function(){
      this.renderListado();
    },
    renderAlta:function(){
      var mapeo = new Array(); //Contiene todas las caracterisiticas de un dispositivo
      _(this.model.get("caracteristicas")).each(function (nombre){
        mapeo[nombre]='Text';//A cada caracteristica lo relaciono con un Campo de Texto
      });
      var atributos={url:'/device/'+this.model.get("nombre"),schema:mapeo}; //El esquema del formulario sera el Array mapeo
      var Dispositivo=Backbone.Model.extend(atributos);
      this.dispositivo = new Dispositivo();
      this.form = new bf({model:this.dispositivo}).render();//Fomulario formado por los atributos schemas del objeto
      //Creo el formulario modal de nuevo dispositivo
      var dataForm={
        title:'Alta de ' + this.model.get("nombre"),
        _:_,
      };      
      var formcompiledTemplate = _.template(formTemplate,dataForm); //Creo un formulario modal generico
      $('#formulario').html(formcompiledTemplate);
      $('.modal-body').html(this.form.el);//Datos dentro del formulario generico,agrego el objeto a fomularizar 
      $('.modal-footer').append("<a href='#device/new' class='btn btn-primary' id='savedevice'> Guardar </a>");
       $('#formulario').modal();
    },
    renderEdit:function(model){
      var mapeo = new Array(); //Contiene todas las caracterisiticas de un dispositivo
      _(model.attributes).each(function (c,nombre){
        if(nombre!='id'){
        mapeo[nombre]='Text';//A cada caracteristica lo relaciono con un Campo de Texto
        }
      });
      var atributos={urlRoot:'/device/'+this.model.get("nombre")+'/',schema:mapeo}; //El esquema del formulario sera el Array mapeo
      var Dispositivo=Backbone.Model.extend(atributos);
      this.dispositivo = new Dispositivo(model.attributes);      
      this.form = new bf({model:this.dispositivo}).render();//Fomulario formado por los atributos schemas del objeto
      //Creo el formulario modal de nuevo dispositivo
      var dataForm={
        title:'Modificacion de '+ this.model.get("nombre"),
        _:_,
      };      
      var formcompiledTemplate = _.template(formTemplate,dataForm); //Creo un formulario modal generico
      $('#formulario').html(formcompiledTemplate);
      $('.modal-body').html(this.form.el);//Datos dentro del formulario generico,agrego el objeto a fomularizar 
      $('.modal-footer').append("<a href='#device/delete' class='btn btn-danger' id='deletedevice'> Eliminar </a>");  
      $('.modal-footer').append("<a href='#device/new' class='btn btn-primary' id='savedevice'> Guardar </a>");
      $('#formulario').modal();      
    },
    renderListado:function(){
      self=this;
      //Vista Item ABM list
      var RegView=Backbone.View.extend({
        tagName: 'tr',
        events:{
          'click td' : 'edit', //Al hacer click creo el formulario con los datos asociados
        },
        initialize:function(){
        },
        render:function(){
          selff=this;
          _.each(selff.model.attributes,function (c,d){
            if (d!='id'){
            $(selff.el).append("<td>" + selff.model.get(d)+ "</td>");
            }
          });
          return this;
        },
        edit:function(){
          self.renderEdit(this.model);
        }
      });      
      $('#listado').html("<table class='table table-bordered' id='listadotabla'><thead><tr></tr></thead><tbody></tbody></table>");
      _(this.model.get("caracteristicas")).each(function (d){ //Renderizo los titulos de la tabla, son el nombre de cada caracteristica
      $('#listadotabla thead tr').append("<th>"+d+"</th>");
      });
      
      if(typeof(devicesgenericoCollection.at(0).get("estado")) == "undefined"){ //Si tiene registros ese devices se muestran
      _.each(devicesgenericoCollection.models,function (d){
        //Renderizo un registro
        var DeviceVista=new RegView({model:d});
        $('#listadotabla tbody',this.el).append(DeviceVista.render().el); 
      });
      }

    },
    guardar:function(){
      self=this;
      var errors=this.form.commit();//Seteo los datos ingresados desde el formulario al objeto
      this.dispositivo.save({},{ //Guardo el objeto en la BD
       success:function(){
        $('#formulario').modal('hide');
        self.collection.fetch({success:self.render});
        alert("Registro guardado!!!");
        }
      });
    }
  });
  
  return new deviceMainView;
});