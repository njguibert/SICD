define([
  'collections/secciones',
  'text!templates/secciones/main.html',
  'views/secciones/list',
  'views/secciones/new',
  'libs/backbone/adapter/backbone.bootstrap-modal'
],function(seccionesCollection,mainTemplate,seccionesListF,seccionNewView){
  //Vista principal Seccion
  var seccionMainView=Backbone.View.extend({
    events: {
      "click #frmnewseccion":"renderfrmnuevo"
    },  
    el: $("#page"),
    initialize: function(){

    },
    renderfrmnuevo:function(){
      //Creo la vista del formulario
      self=this;
      var seccionForm= new seccionNewView({collection:self.collection});
      seccionForm.render();
      $('#frmnuevaseccion').modal();
      $('#frmnuevaseccion').on('hidden', function () {
        $('#frmnuevaseccion').unbind('hidden');
        seccionForm.removebind();
      });
    },      
    render:function(){
      this.collection=seccionesCollection;
      //seccionesCollection.bind("add", this.renderone()); 
      seccionesCollection.fetch({success:this.respuesta});
      var compiledTemplate = _.template(mainTemplate);
      $(this.el).html(compiledTemplate);
      //$(this.el).html("<input type='text' />");
    },
    respuesta:function(){ //Cuando llega la respuesta del servidor renderizo la DATA
      //Creo la vista del listado
      var deviceList= new seccionesListF({collection:seccionesCollection});
      deviceList.render();            
    },
    renderone:function(){
      alert("Renderizo uno solo");
    }
  });
  return new seccionMainView;
});