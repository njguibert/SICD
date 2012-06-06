// Filename: views/map/map.js
define([
	
], function(){
	function initialize(){

	}
    var Map = Backbone.View.extend({
  	initialize:function(){
  	},
  	render:function(el){
  		  var latlng = new google.maps.LatLng(-32.319887, -58.07107);
		  var myOptions = {
		        zoom: 15,
		        center: latlng,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  var SingleMarker=null; //Token que indica si se creo un marker

		  var map = new google.maps.Map(document.getElementById(el),myOptions);	

		  google.maps.event.addListener(map, 'click', function(event) {
		  	if (SingleMarker!=null) SingleMarker.setMap(null); //Solamente se va marcar el ultimo marker
		    crearpunto(event.latLng);
		  });	
	      var marcador = new google.maps.Marker({
	          position: latlng, 
	          map: map,
	          title:"Cumple de pedro!"
	      });      
	      that=this;
	      marcador.setMap(null);		  
		    function crearpunto(coordenadas){
			    var marker = new google.maps.Marker({
					  position: coordenadas, 
					  map: map
			    });
			    SingleMarker=marker;
				//$('[name="latitud"]').val(coordenadas.lat());
				//$('[name="longitud"]').val(coordenadas.lng());
				that.coordenadas=coordenadas;
			}	
  	},
  	getcoordenadas:function(){
  		return this.coordenadas;
  	},
  })

  return new Map;
});
