define([
  'libs/backbone/backbone-forms.amd',
  'collections/generic',
  'views/secciones/new',
  'text!templates/devices/list.html',
  'text!templates/forms/modalfade.html',
],function(bf,genericCollection,seccionNewView){ 
  var NavView=Backbone.View.extend({
    events: {
      "click #frmnewsubseccion":"renderfrmnuevo"
    },      
    el: '#seccion',
    initialize:function(){
      _.bindAll(this,'render','renderlistado','respuesta','renderfrmnuevo');
      $(this.el).undelegate('#frmnewsubseccion', 'click');
      this.idpadre;
    },
    render:function(){
      //$(this.el).html("<h1>Seccion:"+this.model.get("nombre")+"</h1");
      //$(this.el).append("<a href='#frmnuevaseccion' id='frmnewsubseccion' > <i class='icon-file'></i>Nueva SubSeccion</a>");
      this.collection=genericCollection; //Coleccion Generica
      genericCollection.url='/collection/seccion/'+ this.model.get("id"); //Setea tipo generico
      genericCollection.fetch({success:this.respuesta}); //cuando retornen los resultados ejecuto la funcion       
      
    },
    renderfrmnuevo:function(){
      //Creo la vista del formulario
      var seccionForm= new seccionNewView();
      seccionForm.setPadre(this.idpadre);
      seccionForm.render();
      self=this;
      $('#frmnuevaseccion').modal();
      $('#frmnuevaseccion').on('hidden', function () {
        $('#frmnuevaseccion').unbind('hidden');
        seccionForm.removebind();
      });      
    },
    respuesta:function(){
      this.renderlistado();
      
    },
    renderlistado:function(){

      alert(JSON.stringify(genericCollection));
      self=this;

      var RegView=Backbone.View.extend({
        tagName: 'tr',
        events:{
          'click td' : 'edit', //Al hacer click creo el formulario con los datos asociados
        },
        initialize:function(){
          _.bindAll(this,'render','edit');
        },
        render:function(){
          $(this.el).append("<td>" + this.model.get('nombre')+ "</td>");
          return this;
        },
        edit:function(){
          //alert("id:"+ this.model.get("id"));
          //alert("padre:"+self.model.get("id"));
          self.idpadre=this.model.get("id");
          //self.model.set({id:idpadre});
          genericCollection.url='/collection/seccion/'+ this.model.get("id"); //Setea tipo generico
          genericCollection.fetch({success:self.respuesta}); //cuando retornen los resultados ejecuto la funcion                 
        }
      });
      $(this.el).html("<h1>Seccion:"+this.model.get("nombre")+"</h1");
      $(this.el).append("<a href='#frmnuevaseccion' id='frmnewsubseccion' > <i class='icon-file'></i>Nueva SubSeccion</a>");
      $(this.el).append("<table class='table table-bordered' id='listadotabla'><tbody></tbody></table>");
      _(genericCollection.models).each(function (d){ //Renderizo las subsecciones
      var DeviceVista=new RegView({model:d});
      $('#listadotabla tbody',self.el).append(DeviceVista.render().el); 
      });
    }
  });
  //Vista Item seccion
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
      //alert("Hiciste click en una seccion");
      $('#seccion').html("<h1>Seccion:"+this.model.get("nombre")+"</h1");
      
      var NavegadorSecciones= new NavView({model:this.model});
      NavegadorSecciones.render();
      //$('#frmeditardispositivo').modal();
    }
  });

  //Vista coleccion de secciones
  var seccionListView=Backbone.View.extend({
    el: "#listsecciones",
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
      //Renderizo una seccion
      var DeviceVista=new DeviceView({model:d});
      $('#listseccionestable',this.el).append(DeviceVista.render().el); 
    }
  });

  return seccionListView;
});