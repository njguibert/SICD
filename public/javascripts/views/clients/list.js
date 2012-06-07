define([
  'collections/clients',
  'models/client',
  'text!templates/clients/template.html',
  'text!templates/clients/list.html',
  'text!templates/forms/modalfade.html',
  'views/map/map',
  'libs/backbone/backbone-forms.amd',
  'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyDAPt2sOB0JtlQgTO6crlJiIklSrpS150Q&sensor=false',
],function(clientsCollection,clientModel,clientsTemplate,clientsListTemplate,formTemplate,mapView,bf){
      var cliente = new clientModel();
      var formView = Backbone.View.extend({
        render: function(){
          var form = new bf({
            model:cliente
          }).render();
          $(this.el).append(form.el);
          return form;
        }
      });
  var fv=new formView();
  var form=fv.render();
  var clientListView=Backbone.View.extend({
    el: "#page",
    initialize: function(){
    	this.collection=clientsCollection;
      clientsCollection.fetch();
      var self = this;
      //this.collection.bind("reset", function() {self.render();});    
    },
    events: {
            "click #agregar": "doSave",
    },
    doSave: function(){
      alert("Guardo cliente");
        form.commit(); //Actualizo el modelo con los datos que se ingresaron en el formulario
        cliente.set({latitud:this.mapa.getcoordenadas().lat(),longitud:this.mapa.getcoordenadas().lng()});
        //alert(JSON.stringify(cliente));
        cliente.save(null,{success:function(data){
          if (data.get("estado")){
            alert("Cliente Guardado.");
          }else{
            alert("Error al Guardar Cliente.");
          }
        }});
        cliente = new clientModel();
        //$('#frmnuevocliente').modal('toggle');
        //$('.modal-body').empty();
       // fv=new formView();
       // form=fv.render();        
        //$('.modal-body').append(form.el);
        //$('#frmnuevocliente').modal('hide');
      //});
    },
    render:function(){

      var data = {
        clients: this.collection.models,
        _: _
      };
      var compiledTemplate = _.template(clientsTemplate,data);
      $(this.el).html(compiledTemplate);
      $(this.el).hide();
      $(this.el).show('slow',function(){});
      var dataForm={
        title:'Nuevo Cliente',
        _:_,
      };
      var formcompiledTemplate = _.template(formTemplate,dataForm);
      $('#frmnuevocliente').html(formcompiledTemplate);
      $('.modal-body').html(form.el); //Agrego al formulario los campos del objeto
      $('.modal-body').append("<h3> Localizacion Geografica</h3><div id='map_canvas'></div>");

      var data = {
        clients: this.collection.models,
        _: _
      };
      var compiledTemplate = _.template(clientsListTemplate,data);
      $('#listclientes').html(compiledTemplate);
      this.mapa = mapView; //Mapa formulario nuevo cliente
      this.mapa.render("map_canvas");

      var mapa_clients=mapView;//Mapa listado clientes
      mapa_clients.render("map_canvasclientes");
      }
  });
  return new clientListView;
});