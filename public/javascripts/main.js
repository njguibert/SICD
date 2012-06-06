require.config({
	waitSeconds : 15,
	paths:{
      text: 'libs/require/text',
      async: 'libs/require/async',
      templates: '../templates',
      backboneforms: 'libs/backbone/backbone-forms',
      bootstrap:'libs/bootstrap/bootstrap',
      'bootstrap-modal':'libs/bootstrap/bootstrap-modal',
      //google: 'libs/google',
	}
});

require([
	'libs/jquery/jquery-min',
	'libs/underscore/underscore-min',
	'libs/backbone/backbone-min',
	'app'
], function($,_,Backbone,App) {
		App.initialize();
});